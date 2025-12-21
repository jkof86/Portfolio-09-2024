// RSSFeed.jsx
// Fetches a single RSS feed, handles loading/error states,
// and renders articles using the FeedCard component.

import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { GlobalRefreshContext } from "../context/GlobalRefreshContext";
import FeedCard from "./FeedCard";

const RSSFeed = ({ name, feedLabel, categoryLabel }) => {
  const { refreshVersion } = useContext(GlobalRefreshContext);

  const [items, setItems] = useState([]);
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

        // Upstream HTTP errors (403, 404, 500, etc.)
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

        // Success
        setItems(data.items);
      } catch (err) {
        setErrorMsg("Network error: " + err.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [name, refreshVersion]);

  return (
    <Box sx={{ px: 2, py: 1 }}>
      {/* Feed Header */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {feedLabel}
        {categoryLabel ? ` — ${categoryLabel}` : ""}
      </Typography>

      {/* Spinner */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={32} />
        </Box>
      )}

      {/* Error Message */}
      {!loading && errorMsg && (
        <Typography color="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
          {errorMsg}
        </Typography>
      )}

      {/* Feed Items */}
      {!loading &&
        !errorMsg &&
        items.map((item, index) => (
          <FeedCard
            key={index}
            item={item}
            source={name}
            category={categoryLabel}
          />
        ))}
    </Box>
  );
};

export default RSSFeed;
