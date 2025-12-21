import React, {
  createContext,
  useState,
  useCallback,
  useContext
} from "react";
import { FeedStatusContext } from "./FeedStatusContext";
import { feedCategories } from "../data/feedCategories";

export const GlobalRefreshContext = createContext({
  refreshVersion: 0,
  triggerRefresh: () => { },
  refreshAll: () => { },
  lastUpdated: null
});

const loadFeed = useCallback(async (feedName) => {
  updateStatus(feedName, "loading");

  try {
    const url = `${LAMBDA_URL}?source=${feedName}`;
    const res = await fetch(url);
    const json = await res.json();

    const ok = res.ok && json.status === "ok";
    updateStatus(feedName, ok ? "ok" : "error");
  } catch (err) {
    updateStatus(feedName, "error");
  }
}, [updateStatus]);


const LAMBDA_URL =
  "https://jy4i499sj1.execute-api.us-east-1.amazonaws.com/default/RSSProxyAggregator";

const allFeedNames = Object.values(feedCategories)
  .flat()
  .map(f => f.name);

export function GlobalRefreshProvider({ children }) {
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  const { status, updateStatus } = useContext(FeedStatusContext);

  const triggerRefresh = useCallback(() => {
    setRefreshVersion(v => v + 1);
  }, []);

  const refreshAll = useCallback(async () => {
    try {
      // Mark all feeds as loading immediately
      allFeedNames.forEach(feed => updateStatus(feed, "loading"));

      // Load feeds one-by-one so UI updates instantly
      for (const feed of allFeedNames) {
        await loadFeed(feed);
      }

      setLastUpdated(Date.now());
    } catch (err) {
      console.error("Global refresh error:", err);
    }
  }, [loadFeed, updateStatus]);

  return (
    <GlobalRefreshContext.Provider
      value={{
        refreshVersion,
        triggerRefresh,
        refreshAll,
        loadFeed,
        lastUpdated
      }}
    >
      {children}
    </GlobalRefreshContext.Provider>
  );
}
