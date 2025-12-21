// RSSFeed.jsx
// Fetches a single feed from the Lambda, manages loading/error state,
// caps initial articles to 5, supports "Load More", and notifies the
// dashboard when the feed finishes loading via onFeedLoaded().
// Integrates with GlobalRefreshContext so both global and per-feed
// refresh work seamlessly.

import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { GlobalRefreshContext } from "../context/GlobalRefreshContext";
import FeedCard from "./FeedCard";

const RSSFeed = ({ name, feedLabel, categoryLabel, onFeedLoaded }) => {
  const { refreshVersion } = useContext(GlobalRefreshContext);

  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // ✅ cap to 5 initially
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchFeed = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        const url = `https://jy4i499sj1.execute-api.us-east-1.amazonaws.com/default/RSSProxyAggregator?source=${name}`;

        const res = await fetch(url);
        const data = await res.json();

        // Upstream HTTP errors (403, 404, etc.)
        if (!res.ok) {
          setErrorMsg(
            `Feed error (${res.status}): ${data.statusText || data.error || "Unknown error"}`
          );
          setItems([]);
          return;
        }

        // Lambda-level errors
        if (data.status !== "ok") {
          setErrorMsg(data.error || "Feed returned an error.");
          setItems([]);
          return;
        }

        // Empty feeds
        if (!data.items || data.items.length === 0) {
          setErrorMsg("No articles found.");
          setItems([]);
          return;
        }

        // ✅ Successful load
        setItems(data.items);
        setVisibleCount(5); // reset cap on each reload

        // ✅ Notify dashboard that this feed finished loading
        if (onFeedLoaded) {
          onFeedLoaded(name);
        }
      } catch (err) {
        setErrorMsg("Network error: " + err.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [name, refreshVersion, onFeedLoaded]);

  return (
    <Box sx={{ px: 2, py: 1 }}>
      {/* Feed header */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {feedLabel}
        {categoryLabel ? ` — ${categoryLabel}` : ""}
      </Typography>

      {/* Loading spinner */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={32} />
        </Box>
      )}

      {/* Error state */}
      {!loading && errorMsg && (
        <Typography color="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
          {errorMsg}
        </Typography>
      )}

      {/* Feed items (capped to visibleCount) */}
      {!loading &&
        !errorMsg &&
        items.slice(0, visibleCount).map((item, index) => (
          <FeedCard
            key={index}
            item={item}
            source={name}
            category={categoryLabel}
          />
        ))}

      {/* ✅ Load More button */}
      {!loading && !errorMsg && visibleCount < items.length && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setVisibleCount((prev) => prev + 5)}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RSSFeed;
