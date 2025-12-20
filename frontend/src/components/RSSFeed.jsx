// ------------------------------------------------------------
// RSSFeed.jsx
// - Connects to Lambda
// - LocalStorage caching
// - Skeleton loaders
// - Category-specific styling
// - Favorites (star)
// - Error reporting via FeedStatusContext
// - Respects GlobalRefreshContext
// ------------------------------------------------------------

import React, {
  useEffect,
  useState,
  useRef,
  useContext
} from "react";
import DOMPurify from "dompurify";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Button,
  Alert,
  Skeleton,
  IconButton
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { FeedStatusContext } from "../context/FeedStatusContext";
import { GlobalRefreshContext } from "../context/GlobalRefreshContext";
import { toggleFavorite, isFavorite } from "../utils/favorites";

// Map UI names → Lambda ?source=
const FEED_SOURCES = {
  // Debug/original
  jcg: "jcg",
  cd: "cd",
  ct: "ct",
  cb: "cb",

  // IoT
  iot_world: "iot_world",
  stacey_iot: "stacey_iot",
  iot_business: "iot_business",

  // Cloud Security
  dark_reading: "dark_reading",
  krebs: "krebs",
  security_week: "security_week",

  // Full Stack
  smashing: "smashing",
  devto: "devto",
  css_tricks: "css_tricks",

  // Java
  infoq_java: "infoq_java",
  baeldung: "baeldung",

  // Spring
  spring_blog: "spring_blog",
  spring_guides: "spring_guides",
  baeldung_spring: "baeldung_spring",

  // AWS
  aws_news: "aws_news",
  aws_arch: "aws_arch",
  aws_security: "aws_security",

  // React
  react_status: "react_status",
  logrocket_react: "logrocket_react",
  smashing_react: "smashing_react",

  // Sports
  espn: "espn",
  cbs_sports: "cbs_sports",
  bleacher: "bleacher",

  // Finance
  marketwatch: "marketwatch",
  ft: "ft",
  investopedia: "investopedia",

  // Stocks
  yahoo_finance: "yahoo_finance",
  seeking_alpha: "seeking_alpha",
  marketwatch_stocks: "marketwatch_stocks",

  // Crypto
  decrypt: "decrypt",

  // Politics
  federalist: "federalist",
  dailywire: "dailywire",
  epoch: "epoch",

  // World
  reuters_world: "reuters_world",
  bbc_world: "bbc_world",
  ap_world: "ap_world"
};

const LAMBDA_URL =
  "https://ksq5y8o3cf.execute-api.us-east-1.amazonaws.com/default/CoinbaseRSSProxy";

const CACHE_TTL_MS = 3 * 60 * 1000;

function buildCacheKey(source) {
  return `rss_cache_${source}`;
}

function loadFromCache(source) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(buildCacheKey(source));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.timestamp || !Array.isArray(parsed.items)) return null;
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
    return parsed.items;
  } catch {
    return null;
  }
}

function saveToCache(source, items) {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      timestamp: Date.now(),
      items
    };
    window.localStorage.setItem(
      buildCacheKey(source),
      JSON.stringify(payload)
    );
  } catch {
    // ignore
  }
}

const CATEGORY_STYLES = {
  IoT: { borderLeft: "4px solid #00796B" },
  CloudSecurity: { borderLeft: "4px solid #D32F2F" },
  FullStack: { borderLeft: "4px solid #1976D2" },
  Java: { borderLeft: "4px solid #F57C00" },
  Spring: { borderLeft: "4px solid #388E3C" },
  AWS: { borderLeft: "4px solid #FFB300" },
  React: { borderLeft: "4px solid #61dafb" },
  Sports: { borderLeft: "4px solid #7B1FA2" },
  Finance: { borderLeft: "4px solid #455A64" },
  Stocks: { borderLeft: "4px solid #2E7D32" },
  Crypto: { borderLeft: "4px solid #00838F" },
  USPolitics: { borderLeft: "4px solid #C62828" },
  WorldNews: { borderLeft: "4px solid #1565C0" },
  Favorites: { borderLeft: "4px solid #FF4081" },
  Debug: { borderLeft: "4px solid #9E9E9E" }
};

export default function RSSFeed({ name, categoryLabel, feedLabel }) {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite(name));

  const loadMoreRef = useRef(null);

  const { updateStatus } = useContext(FeedStatusContext);
  const { refreshVersion } = useContext(GlobalRefreshContext);

  const source = FEED_SOURCES[name];

  const style =
    (categoryLabel && CATEGORY_STYLES[categoryLabel]) || {};

  const getThumbnail = item => item.image || null;

  const loadFeed = async () => {
    if (!source) {
      setError(`Invalid feed source: ${name}`);
      updateStatus(name, "error");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setErrorDetails(null);
    setFromCache(false);

    const cached = loadFromCache(source);
    if (cached && cached.length > 0) {
      setItems(cached);
      setFromCache(true);
      setLoading(false);
      updateStatus(name, "ok");
      return;
    }

    try {
      const url = `${LAMBDA_URL}?source=${encodeURIComponent(source)}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok || json.error) {
        setError(json.error || "Failed to load feed");
        setErrorDetails(json.details || null);
        setItems(json.items || []);
        updateStatus(name, "error");
      } else {
        if (!Array.isArray(json.items)) {
          throw new Error("Invalid feed structure: items is not an array");
        }
        setItems(json.items);
        saveToCache(source, json.items);
        updateStatus(name, "ok");
      }
    } catch (err) {
      setError("Unexpected error loading feed");
      setErrorDetails(err.message);
      setItems([]);
      updateStatus(name, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setVisibleCount(5);
    loadFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, refreshVersion]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + 5);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, []);

  const handleFavorite = e => {
    e.preventDefault();
    const updated = toggleFavorite(name);
    setFavorite(updated.includes(name));
  };

  const renderSkeletons = () => {
    const count = 3;
    return (
      <Box sx={{ mt: 2 }}>
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} sx={{ mb: 2, ...style }}>
            <Skeleton variant="rectangular" height={180} />
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="40%" />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  if (loading) {
    return renderSkeletons();
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {feedLabel || name}
          </Typography>
          {categoryLabel && (
            <Typography variant="subtitle2" color="text.secondary">
              Category: {categoryLabel}
            </Typography>
          )}
        </Box>
        <Alert severity="error" sx={{ mb: 1 }}>
          {error}
        </Alert>

        {errorDetails && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, whiteSpace: "pre-wrap" }}
          >
            {errorDetails}
          </Typography>
        )}

        <Button variant="contained" onClick={loadFeed}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {fromCache && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 1 }}
        >
          Loaded from local cache
        </Typography>
      )}

      {items.slice(0, visibleCount).map((item, index) => {
        const image = getThumbnail(item);
        const cleanedHtml = DOMPurify.sanitize(
          item.content_html || item.summary || ""
        );

        return (
          <Card
            key={index}
            component="a"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mb: 2,
              textDecoration: "none",
              color: "inherit",
              display: "block",
              "&:hover": { boxShadow: 4 },
              ...style
            }}
          >
            {image && (
              <CardMedia
                component="img"
                image={image}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 320,
                  objectFit: "contain",
                  backgroundColor: "#0000000a"
                }}
              />
            )}

            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
                  {item.title}
                </Typography>

                <IconButton
                  size="small"
                  onClick={handleFavorite}
                  sx={{ ml: 1 }}
                >
                  {favorite ? (
                    <StarIcon color="warning" fontSize="small" />
                  ) : (
                    <StarBorderIcon fontSize="small" />
                  )}
                </IconButton>
              </Box>

              {cleanedHtml && (
                <Box
                  sx={{
                    mt: 1,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    "& p": { mb: 1.0, lineHeight: 1.5 },
                    "& ul, & ol": { pl: 3 },
                    "& img": {
                      maxWidth: "100%",
                      height: "auto"
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: cleanedHtml }}
                />
              )}

              {item.date_published && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  {item.date_published}
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      })}

      <div ref={loadMoreRef} style={{ height: 40 }} />

      {visibleCount < items.length && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setVisibleCount(prev => prev + 5)}
          >
            Load More
          </Button>
        </Box>
      )}

      {items.length === 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          No items available for this feed.
        </Typography>
      )}
    </Box>
  );
}
