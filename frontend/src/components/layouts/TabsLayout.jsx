// ------------------------------------------------------------
// TabsLayout.jsx
// - Category tabs
// - Feed tabs
// - Error badges
// - Search
// - Compare mode (two feeds side by side)
// - Global refresh
// - Category-specific MarketChart
// ------------------------------------------------------------

import React, {
  useState,
  useContext,
  useMemo
} from "react";
import {
  Box,
  Tabs,
  Tab,
  Badge,
  TextField,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import RSSFeed from "../RSSFeed";
import MarketChart from "../MarketChart";
import { FeedStatusContext } from "../../context/FeedStatusContext";
import { GlobalRefreshContext } from "../../context/GlobalRefreshContext";
import { CATEGORY_CHARTS } from "../data/feedCategories";

export default function TabsLayout({ categories }) {
  const [catIndex, setCatIndex] = useState(0);
  const [feedIndex, setFeedIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [compareMode, setCompareMode] = useState(false);

  const { status } = useContext(FeedStatusContext);
  const { triggerRefresh, refreshAll } = useContext(GlobalRefreshContext);

  const categoryKeys = Object.keys(categories);
  const currentCategory = categoryKeys[catIndex];

  const rawFeeds = categories[currentCategory] || [];

  const feeds = useMemo(() => {
    if (!search.trim()) return rawFeeds;
    const term = search.toLowerCase();
    return rawFeeds.filter(
      f =>
        f.label.toLowerCase().includes(term) ||
        f.name.toLowerCase().includes(term)
    );
  }, [rawFeeds, search]);

  const safeFeedIndex =
    feeds.length === 0 ? 0 : Math.min(feedIndex, feeds.length - 1);

  const handleCatChange = (_, v) => {
    setCatIndex(v);
    setFeedIndex(0);
    setSearch("");
  };

  const handleFeedChange = (_, v) => {
    setFeedIndex(v);
  };

  const handleCompareToggle = (_, value) => {
    setCompareMode(Boolean(value));
  };

  const handleRefresh = () => {
    triggerRefresh();  // visible feeds
    refreshAll();      // all feeds health + latency
  };

  const chartSymbol = CATEGORY_CHARTS[currentCategory];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Top row: category tabs + global controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          gap: 1
        }}
      >
        <Tabs
          value={catIndex}
          onChange={handleCatChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Category Tabs"
          sx={{ flexGrow: 1 }}
        >
          {categoryKeys.map(cat => (
            <Tab key={cat} label={cat} />
          ))}
        </Tabs>

        <Tooltip title="Global refresh (all feeds)">
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Compare mode: show two feeds side by side">
          <ToggleButtonGroup
            value={compareMode ? "compare" : ""}
            exclusive
            onChange={handleCompareToggle}
            size="small"
          >
            <ToggleButton value="compare">
              <CompareArrowsIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Tooltip>
      </Box>

      {/* Search + feed tabs */}
      <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          size="small"
          label="Search feeds"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ maxWidth: 260 }}
        />

        <Tabs
          value={safeFeedIndex}
          onChange={handleFeedChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Feed Tabs"
          sx={{ flexGrow: 1, borderBottom: 1, borderColor: "divider" }}
        >
          {feeds.map(feed => (
            <Tab
              key={`${currentCategory}_${feed.name}`}
              label={
                <Badge
                  color="error"
                  variant="dot"
                  invisible={status[feed.name] !== "error"}
                >
                  {feed.label}
                </Badge>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Chart + feeds */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        <Box sx={{ flex: 2 }}>
          {feeds.length === 0 ? (
            <Box sx={{ mt: 2 }}>No feeds match this search.</Box>
          ) : compareMode && feeds.length >= 2 ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <RSSFeed
                  name={feeds[safeFeedIndex].name}
                  categoryLabel={currentCategory}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <RSSFeed
                  name={
                    feeds[(safeFeedIndex + 1) % feeds.length].name
                  }
                  categoryLabel={currentCategory}
                />
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              {feeds[safeFeedIndex] && (

                <RSSFeed
                  name={feeds[safeFeedIndex].name}
                  feedLabel={feeds[safeFeedIndex].label}
                  categoryLabel={currentCategory}
                />
              )}
            </Box>
          )}
        </Box>

        {/* Category-specific chart */}
        <Box sx={{ flex: 1, minWidth: 260 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {currentCategory} Market Snapshot
          </Typography>
          <MarketChart symbol={chartSymbol} />
        </Box>
      </Box>
    </Box>
  );
}
