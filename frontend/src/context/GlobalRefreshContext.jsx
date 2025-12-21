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
  triggerRefresh: () => {},
  refreshAll: () => {},
  lastUpdated: null
});

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
      Object.keys(status).forEach(feed => updateStatus(feed, "loading"));

      await Promise.all(
        allFeedNames.map(async (feed) => {
          const url = `${LAMBDA_URL}?source=${feed}`;
          const res = await fetch(url);
          const json = await res.json();

          const ok = res.ok && json.status === "ok";
          updateStatus(feed, ok ? "ok" : "error");
        })
      );

      setLastUpdated(Date.now());
    } catch (err) {
      console.error("Global refresh error:", err);
    }
  }, [status, updateStatus]);

  return (
    <GlobalRefreshContext.Provider
      value={{
        refreshVersion,
        triggerRefresh,
        refreshAll,
        lastUpdated
      }}
    >
      {children}
    </GlobalRefreshContext.Provider>
  );
}
