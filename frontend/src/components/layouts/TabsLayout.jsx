// ------------------------------------------------------------
// TabsLayout.jsx — Restored Version (Per‑Feed Refresh + Global Refresh)
// ------------------------------------------------------------
import React, { useState, useContext } from "react";
import { Box, Tabs, Tab, Button, Typography } from "@mui/material";
import RSSFeed from "../RSSFeed";
import MarketChart from "../MarketChart";
import { GlobalRefreshContext } from "../../context/GlobalRefreshContext";
import { FeedStatusContext } from "../../context/FeedStatusContext";

export default function TabsLayout({ feeds, safeFeedIndex, currentCategory }) {
  const [tabIndex, setTabIndex] = useState(safeFeedIndex || 0);

  const { triggerRefresh, refreshAll } = useContext(GlobalRefreshContext);
  const { status } = useContext(FeedStatusContext);

  const safeIndex = Math.min(tabIndex, feeds.length - 1);
  const activeFeed = feeds[safeIndex];

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  const handleFeedRefresh = () => {
    triggerRefresh();
  };


  const handleGlobalRefresh = () => {
    refreshAll(); // refresh ALL feeds + health
  };

  return (
    <Box>
      {/* Tabs Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          gap: 2
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ flexGrow: 1 }}
        >
          {feeds.map((feed, idx) => {
            const feedState = status[feed.name];
            const isError = feedState && feedState !== "ok";

            return (
              <Tab
                key={feed.name}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {feed.label}
                    {isError && (
                      <Typography
                        component="span"
                        sx={{
                          color: "error.main",
                          fontWeight: 700,
                          fontSize: "0.9rem"
                        }}
                      >
                        !
                      </Typography>
                    )}
                  </Box>
                }
                value={idx}
              />
            );
          })}
        </Tabs>

        {/* Per‑Feed Refresh */}
        <Button variant="outlined" onClick={handleFeedRefresh}>
          Refresh Feed
        </Button>

        {/* Global Refresh */}
        <Button variant="contained" onClick={handleGlobalRefresh}>
          Global Refresh
        </Button>
      </Box>

      
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Left column: Feed */}
        <Box sx={{ flex: 3 }}>
          <RSSFeed
            name={activeFeed.name}
            feedLabel={activeFeed.label}
            categoryLabel={currentCategory}
          />
        </Box>

        {/* Right column: Chart */}
        <Box sx={{ flex: 2 }}>
          {activeFeed?.symbol && (
            <MarketChart symbol={activeFeed.symbol} />
          )}
        </Box>
      </Box>

      {/* Market Chart (if applicable) */}
      {/* {activeFeed?.symbol && (
        <Box sx={{ mb: 3 }}>
          <MarketChart symbol={activeFeed.symbol} />
        </Box>
      )} */}

      {/* Feed Content */}
      {/* {activeFeed ? (
        <RSSFeed
          name={activeFeed.name}
          feedLabel={activeFeed.label}
          categoryLabel={currentCategory}
        />
      ) : (
        <Typography color="text.secondary">
          No available articles.
        </Typography>
      )} */}
    </Box>
  );
}
