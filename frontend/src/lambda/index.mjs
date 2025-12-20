// ------------------------------------------------------------
// index.mjs
// AWS Lambda: RSS proxy with:
// - Multiple categories & feeds
// - In-memory caching
// - Per-feed overrides (strategy, TTL, maxItems)
// - Debug mode (optional raw XML logging)
// - Simple HTML-based thumbnail extraction
// ------------------------------------------------------------

import { parseStringPromise } from "xml2js";

// ------------------------------------------------------------
// ✅ FEED URL MAP
// Keys must match the "source" values used in the frontend.
// ------------------------------------------------------------
const FEEDS = {
  // Debug / original feeds
  jcg: "https://www.javacodegeeks.com/feed",
  cd: "https://www.coindesk.com/arc/outboundfeeds/rss/",
  ct: "https://cointelegraph.com/rss",
  cb: [
    "https://blog.coinbase.com/feed",
    "https://blog.coinbase.com/rss",
    "https://www.coinbase.com/blog?format=rss"
  ],

  // IoT
  iot_world: "https://www.iotworldtoday.com/feed",
  stacey_iot: "https://staceyoniot.com/feed",
  iot_business: "https://iotbusinessnews.com/feed",

  // Cloud Security
  dark_reading: "https://www.darkreading.com/rss.xml",
  krebs: "https://krebsonsecurity.com/feed/",
  security_week: "https://feeds.feedburner.com/securityweek",

  // Full Stack Development
  smashing: "https://www.smashingmagazine.com/feed/",
  devto: "https://dev.to/feed",
  css_tricks: "https://css-tricks.com/feed/",

  // Java
  infoq_java: "https://feeds.feedburner.com/infoq/java",
  baeldung: "https://www.baeldung.com/feed",

  // Spring
  spring_blog: "https://spring.io/blog.atom",
  spring_guides: "https://spring.io/blog/category/guides.atom",
  baeldung_spring: "https://www.baeldung.com/spring-tutorials-rss",

  // AWS
  aws_news: "https://aws.amazon.com/blogs/aws/feed/",
  aws_arch: "https://aws.amazon.com/blogs/architecture/feed/",
  aws_security: "https://aws.amazon.com/blogs/security/feed/",

  // React
  react_status: "https://react.statuscode.com/feed",
  logrocket_react: "https://blog.logrocket.com/tag/react/feed/",
  smashing_react: "https://www.smashingmagazine.com/tag/react/feed/",

  // Sports
  espn: "https://www.espn.com/espn/rss/news",
  cbs_sports: "https://www.cbssports.com/rss/headlines/",
  bleacher: "https://bleacherreport.com/articles/feed",

  // Finance
  marketwatch: "https://www.marketwatch.com/rss/topstories",
  ft: "https://www.ft.com/rss/home/us",
  investopedia: "https://www.investopedia.com/feedbuilder/feed/getfeed?feedName=news",

  // Stocks
  yahoo_finance: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC&region=US&lang=en-US",
  seeking_alpha: "https://seekingalpha.com/market_currents.xml",
  marketwatch_stocks: "https://www.marketwatch.com/rss/markets",

  // Crypto
  decrypt: "https://decrypt.co/feed",

  // US Politics (conservative/alt)
  federalist: "https://thefederalist.com/feed/",
  dailywire: "https://www.dailywire.com/feeds/rss.xml",
  epoch: "https://www.theepochtimes.com/feed",

  // World News
  reuters_world: "http://feeds.reuters.com/Reuters/worldNews",
  bbc_world: "http://feeds.bbci.co.uk/news/world/rss.xml",
  ap_world: "https://rsshub.app/apnews/topics/world-news"
};

// ------------------------------------------------------------
// ✅ PER-FEED OVERRIDES
// - strategy: "cdata" | "media" | "combined"
// - ttlMs: cache TTL in ms
// - maxItems: limit number of items returned
// - debug: enable extra logging for that feed
// ------------------------------------------------------------
const FEED_OVERRIDES = {
  jcg: { strategy: "combined", ttlMs: 5 * 60 * 1000, maxItems: 30, debug: true },
  cd: { strategy: "combined", ttlMs: 2 * 60 * 1000, maxItems: 40 },
  ct: { strategy: "cdata", ttlMs: 2 * 60 * 1000 },
  cb: { strategy: "combined", ttlMs: 10 * 60 * 1000, maxItems: 20 },

  // Use combined for most tech feeds
  baeldung: { strategy: "combined", ttlMs: 5 * 60 * 1000 },
  spring_blog: { strategy: "combined", ttlMs: 5 * 60 * 1000 },
  aws_news: { strategy: "combined", ttlMs: 5 * 60 * 1000 },

  // News feeds can have shorter TTL
  reuters_world: { strategy: "combined", ttlMs: 60 * 1000 },
  bbc_world: { strategy: "combined", ttlMs: 60 * 1000 },
  ap_world: { strategy: "combined", ttlMs: 60 * 1000 }
};

// ------------------------------------------------------------
// ✅ IN-MEMORY CACHE
// { [sourceKey]: { timestamp, items } }
// ------------------------------------------------------------
const cache = {};

// ------------------------------------------------------------
// ✅ Utils: now()
// ------------------------------------------------------------
const now = () => Date.now();

// ------------------------------------------------------------
// ✅ Extract first <img src="..."> from HTML (robust)
// ------------------------------------------------------------
function extractImageFromHtml(html = "") {
  const match = html.match(/<img[^>]*src=['"]([^'"]+)['"][^>]*>/is);
  return match ? match[1] : null;
}

// ------------------------------------------------------------
// ✅ Remove ALL <img> tags from HTML
// ------------------------------------------------------------
function stripImages(html = "") {
  return html.replace(/<img[^>]*>/gis, "");
}

// ------------------------------------------------------------
// ✅ Extract <media:content> and <media:group><media:content>
// ------------------------------------------------------------
function extractMediaContent(item) {
  const direct = item["media:content"];
  if (direct) {
    const first = Array.isArray(direct) ? direct[0] : direct;
    return first?.$?.url || first?.url || null;
  }

  const group = item["media:group"]?.["media:content"];
  if (group) {
    const first = Array.isArray(group) ? group[0] : group;
    return first?.$?.url || first?.url || null;
  }

  return null;
}

// ------------------------------------------------------------
// ✅ Extract <enclosure url="...">
// ------------------------------------------------------------
function extractEnclosure(item) {
  const enc = item.enclosure;
  if (!enc) return null;
  const first = Array.isArray(enc) ? enc[0] : enc;
  return first?.url || first?.$?.url || null;
}

// ------------------------------------------------------------
// ✅ Fetch feed XML with:
// - Browser-like User-Agent
// - HTML detection
// - Multiple fallback URLs if array
// ------------------------------------------------------------
async function fetchFeedXml(feedConfig, debugLabel = "") {
  const urls = Array.isArray(feedConfig) ? feedConfig : [feedConfig];

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml, */*;q=0.1"
  };

  let lastError = null;

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers });

      if (!res.ok) {
        lastError = new Error(
          `Upstream returned ${res.status} ${res.statusText} for ${url}`
        );
        continue;
      }

      const xml = await res.text();
      const trimmed = xml.trim();

      if (trimmed.startsWith("<!DOCTYPE html") || trimmed.startsWith("<html")) {
        lastError = new Error(
          `Upstream returned HTML instead of XML for ${url} (likely blocked)`
        );
        continue;
      }

      if (debugLabel) {
        console.log(`[DEBUG:XML:${debugLabel}] length=${xml.length}`);
      }

      return xml;
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error("Unable to fetch feed from any URL");
}

// ------------------------------------------------------------
// ✅ Normalize a single feed item
// - Uses strategy + overrides
// ------------------------------------------------------------
function normalizeItem(item, strategy) {
  const rawHtml =
    item["content:encoded"] ||
    item.description ||
    item.summary?._ ||
    item.content?._ ||
    "";

  let image = null;

  if (strategy === "cdata") {
    image = extractImageFromHtml(rawHtml);
  } else if (strategy === "media") {
    image = extractMediaContent(item) || extractEnclosure(item);
  } else {
    // combined
    image =
      extractImageFromHtml(rawHtml) ||
      extractMediaContent(item) ||
      extractEnclosure(item) ||
      null;
  }

  const cleanedHtml = stripImages(rawHtml);

  return {
    title: item.title?._ || item.title || "",
    url: item.link?.href || item.link || item.id || "",
    date_published: item.pubDate || item.published || "",
    summary: cleanedHtml,
    content_html: cleanedHtml,
    image
  };
}

// ------------------------------------------------------------
// ✅ MAIN HANDLER
// ------------------------------------------------------------
export const handler = async (event) => {
  try {
    const qs = event.queryStringParameters || {};
    const source = qs.source;
    const debugQuery = qs.debug === "true";

    const feedConfig = FEEDS[source];

    if (!feedConfig) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Invalid source", items: [] })
      };
    }

    const override = FEED_OVERRIDES[source] || {};
    const strategy = override.strategy || "combined";
    const ttlMs = override.ttlMs || 5 * 60 * 1000;
    const maxItems = override.maxItems || 50;
    const debug = debugQuery || override.debug;

    // ✅ In-memory cache check
    const cached = cache[source];
    if (cached && now() - cached.timestamp < ttlMs) {
      if (debug) {
        console.log(`[DEBUG:CACHE:HIT] source=${source}`);
      }
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: cached.items,
          cached: true,
          cacheAgeMs: now() - cached.timestamp
        })
      };
    }

    if (debug) {
      console.log(`[DEBUG:CACHE:MISS] source=${source}`);
    }

    // ✅ Fetch XML
    const xml = await fetchFeedXml(feedConfig, debug ? source : "");

    // ✅ Parse XML
    let parsed;
    try {
      parsed = await parseStringPromise(xml, { explicitArray: false });
    } catch (err) {
      throw new Error("Malformed XML (unencoded < or invalid CDATA)");
    }

    const channel = parsed.rss?.channel || parsed.feed;
    if (!channel) {
      throw new Error("Feed structure invalid or unsupported");
    }

    const rawItems = channel.item || channel.entry || [];
    const itemsArray = Array.isArray(rawItems) ? rawItems : [rawItems];

    let items = itemsArray.map((item) => normalizeItem(item, strategy));

    if (items.length > maxItems) {
      items = items.slice(0, maxItems);
    }

    // ✅ Update cache
    cache[source] = {
      timestamp: now(),
      items
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items,
        cached: false,
        cacheAgeMs: 0
      })
    };
  } catch (err) {
    console.error("[ERROR:LAMBDA]", err);

    return {
      statusCode: 502,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        error: "Error processing feed",
        details: err.message,
        items: []
      })
    };
  }
};
