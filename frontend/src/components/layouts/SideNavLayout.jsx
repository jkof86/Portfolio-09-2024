// ------------------------------------------------------------
// SideNavLayout.jsx
// - Left sidebar listing all feeds
// - Category as secondary text
// - Error badges
// - Search
// - Category-specific chart based on selected feed's category
// ------------------------------------------------------------

import React, {
  useState,
  useContext,
  useMemo
} from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Badge,
  TextField,
  Typography
} from "@mui/material";

import RSSFeed from "../RSSFeed";
import MarketChart from "../MarketChart";
import { FeedStatusContext } from "../../context/FeedStatusContext";
import { CATEGORY_CHARTS } from "../data/feedCategories";
import { GlobalRefreshContext } from "../../context/GlobalRefreshContext";

export default function SideNavLayout({ categories }) {
  const { status } = useContext(FeedStatusContext);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [search, setSearch] = useState("");
  const { triggerRefresh, refreshAll } = useContext(GlobalRefreshContext);


  const allFeeds = useMemo(
    () =>
      Object.entries(categories).flatMap(([cat, feeds]) =>
        feeds.map(f => ({ ...f, category: cat }))
      ),
    [categories]
  );

  const filteredFeeds = useMemo(() => {
    if (!search.trim()) return allFeeds;
    const term = search.toLowerCase();
    return allFeeds.filter(
      f =>
        f.label.toLowerCase().includes(term) ||
        f.name.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term)
    );
  }, [allFeeds, search]);

  const chartSymbol = selectedFeed
    ? CATEGORY_CHARTS[selectedFeed.category]
    : null;

  const handleRefresh = () => {
    triggerRefresh();  // visible feeds
    refreshAll();      // all feeds health + latency
  };

  return (
    <Box sx={{ display: "flex", height: "100%", alignItems: "stretch" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box sx={{ p: 1 }}>
          <TextField
            fullWidth
            size="small"
            label="Search feeds"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Box>

        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          {filteredFeeds.map(feed => (
            <ListItemButton
              key={`${feed.category}_${feed.name}`}
              selected={selectedFeed?.name === feed.name}
              onClick={() => setSelectedFeed(feed)}
            >
              <Badge
                color="error"
                variant="dot"
                invisible={status[feed.name] !== "error"}
                sx={{ mr: 1 }}
              />
              <ListItemText
                primary={feed.label}
                secondary={feed.category}
              />
            </ListItemButton>
          ))}

          {filteredFeeds.length === 0 && (
            <Box sx={{ p: 2, fontSize: 14 }}>
              No feeds match this search.
            </Box>
          )}
        </List>
      </Box>

      {/* Content + chart */}
      <Box sx={{ flexGrow: 1, p: 2, display: "flex", gap: 2 }}>
        <Box sx={{ flex: 2 }}>
          {selectedFeed ? (
            <RSSFeed
              name={selectedFeed.name}
              feedLabel={selectedFeed.label}
              categoryLabel={selectedFeed.category}
            />
          ) : (
            <Box sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}>
              Select a feed from the left to begin.
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 260 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {selectedFeed
              ? `${selectedFeed.category} Market Snapshot`
              : "Market Snapshot"}
          </Typography>
          <MarketChart symbol={chartSymbol} />
        </Box>
      </Box>
    </Box>
  );
}
