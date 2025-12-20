// ------------------------------------------------------------
// feedCategories.js
// Base category → feed mapping and helper to add Favorites.
// ------------------------------------------------------------

import { getFavorites } from "../../utils/favorites";

export const BASE_FEED_CATEGORIES = {
  IoT: [
    { label: "IoT World Today", name: "iot_world" },
    { label: "Stacey on IoT", name: "stacey_iot" },
    { label: "IoT Business News", name: "iot_business" }
  ],
  CloudSecurity: [
    { label: "Dark Reading", name: "dark_reading" },
    { label: "Krebs on Security", name: "krebs" },
    { label: "Security Week", name: "security_week" }
  ],
  FullStack: [
    { label: "Smashing Magazine", name: "smashing" },
    { label: "Dev.to", name: "devto" },
    { label: "CSS-Tricks", name: "css_tricks" }
  ],
  Java: [
    { label: "Java Code Geeks", name: "jcg" },
    { label: "InfoQ Java", name: "infoq_java" },
    { label: "Baeldung", name: "baeldung" }
  ],
  Spring: [
    { label: "Spring Blog", name: "spring_blog" },
    { label: "Spring Guides", name: "spring_guides" },
    { label: "Baeldung Spring", name: "baeldung_spring" }
  ],
  AWS: [
    { label: "AWS News Blog", name: "aws_news" },
    { label: "AWS Architecture", name: "aws_arch" },
    { label: "AWS Security", name: "aws_security" }
  ],
  React: [
    { label: "React Status", name: "react_status" },
    { label: "LogRocket React", name: "logrocket_react" },
    { label: "Smashing React", name: "smashing_react" }
  ],
  Sports: [
    { label: "ESPN", name: "espn" },
    { label: "CBS Sports", name: "cbs_sports" },
    { label: "Bleacher Report", name: "bleacher" }
  ],
  Finance: [
    { label: "MarketWatch", name: "marketwatch" },
    { label: "Financial Times", name: "ft" },
    { label: "Investopedia", name: "investopedia" }
  ],
  Stocks: [
    { label: "Yahoo Finance", name: "yahoo_finance" },
    { label: "Seeking Alpha", name: "seeking_alpha" },
    { label: "MarketWatch Stocks", name: "marketwatch_stocks" }
  ],
  Crypto: [
    { label: "CoinDesk", name: "cd" },
    { label: "Cointelegraph", name: "ct" },
    { label: "Decrypt", name: "decrypt" }
  ],
  USPolitics: [
    { label: "The Federalist", name: "federalist" },
    { label: "Daily Wire", name: "dailywire" },
    { label: "Epoch Times", name: "epoch" }
  ],
  WorldNews: [
    { label: "Reuters World", name: "reuters_world" },
    { label: "BBC World", name: "bbc_world" },
    { label: "AP World", name: "ap_world" }
  ],
  Debug: [
    { label: "Java Code Geeks", name: "jcg" },
    { label: "CoinDesk", name: "cd" },
    { label: "Cointelegraph", name: "ct" },
    { label: "Coinbase", name: "cb" }
  ]
};

// ------------------------------------------------------------
// Category → chart symbol mapping (your approved mapping)
// ------------------------------------------------------------
export const CATEGORY_CHARTS = {
  IoT: "QQQ",
  CloudSecurity: "HACK",
  FullStack: "QQQ",
  Java: "QQQ",
  Spring: "QQQ",
  AWS: "AMZN",
  React: "QQQ",
  Sports: null,
  Finance: "SPY",
  Stocks: "SPY",
  Crypto: "BTC-USD",
  USPolitics: "SPY",
  WorldNews: "ACWI",
  Favorites: null,
  Debug: null
};

// ------------------------------------------------------------
// Build categories with Favorites category injected
// ------------------------------------------------------------
export function buildFeedCategoriesWithFavorites() {
  const favorites = getFavorites();
  const favoriteFeeds = [];

  Object.entries(BASE_FEED_CATEGORIES).forEach(([cat, feeds]) => {
    feeds.forEach(f => {
      if (favorites.includes(f.name)) {
        favoriteFeeds.push({ ...f, category: cat });
      }
    });
  });

  return {
    Favorites: favoriteFeeds,
    ...BASE_FEED_CATEGORIES
  };
}
