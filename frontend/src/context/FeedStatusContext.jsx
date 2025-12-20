// ------------------------------------------------------------
// FeedStatusContext.jsx
// Tracks per-feed status: "ok" or "error".
// Used for error badges in tabs/sidebar and health dashboard.
// ------------------------------------------------------------

import React, { createContext, useState } from "react";

export const FeedStatusContext = createContext({
  status: {},
  updateStatus: () => {}
});

export function FeedStatusProvider({ children }) {
  const [status, setStatus] = useState({});

  const updateStatus = (feedName, state) => {
    setStatus(prev => ({ ...prev, [feedName]: state }));
  };

  return (
    <FeedStatusContext.Provider value={{ status, updateStatus }}>
      {children}
    </FeedStatusContext.Provider>
  );
}
