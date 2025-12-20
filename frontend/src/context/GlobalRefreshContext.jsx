import React, {
  createContext,
  useState,
  useCallback,
  useContext
} from "react";
import { FeedStatusContext } from "./FeedStatusContext";

export const GlobalRefreshContext = createContext({
  refreshVersion: 0,
  triggerRefresh: () => {},
  health: {},
  latency: {},
  lastUpdated: null,
  refreshAll: () => {}
});

const LAMBDA_URL =
  "https://jy4i499sj1.execute-api.us-east-1.amazonaws.com/default/RSSProxyAggregator";

export function GlobalRefreshProvider({ children }) {
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [health, setHealth] = useState({});
  const [latency, setLatency] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  const { updateStatus } = useContext(FeedStatusContext);

  const triggerRefresh = useCallback(() => {
    setRefreshVersion(v => v + 1);
  }, []);

  const refreshAll = useCallback(async () => {
    try {
      const url = `${LAMBDA_URL}?mode=health`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
        console.error("Health refresh failed:", json);
        return;
      }

      setHealth(json.health || {});
      setLatency(json.latency || {});
      setLastUpdated(json.timestamp || Date.now());

      // push into FeedStatusContext
      const map = json.health || {};
      Object.entries(map).forEach(([feedName, state]) => {
        // state is "ok" or error string; map to ok/error
        const status = state === "ok" ? "ok" : "error";
        updateStatus(feedName, status);
      });
    } catch (e) {
      console.error("Global health refresh error:", e);
    }
  }, [updateStatus]);

  return (
    <GlobalRefreshContext.Provider
      value={{
        refreshVersion,
        triggerRefresh,
        health,
        latency,
        lastUpdated,
        refreshAll
      }}
    >
      {children}
    </GlobalRefreshContext.Provider>
  );
}
