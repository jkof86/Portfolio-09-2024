// ------------------------------------------------------------
// MarketChart.jsx (Updated for Lambda /market proxy)
// ------------------------------------------------------------

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Box, Typography, CircularProgress } from "@mui/material";

const LAMBDA_URL =
  "https://jy4i499sj1.execute-api.us-east-1.amazonaws.com/default/RSSProxyAggregator";

// Detect crypto symbols (BTC-USD, ETH-USD, etc.)
function isCryptoSymbol(symbol) {
  return symbol.includes("-USD") || symbol.includes("-usd");
}

// Map BTC-USD → bitcoin for CoinGecko
function toCoinGeckoId(symbol) {
  const lower = symbol.toLowerCase();
  if (lower.startsWith("btc")) return "bitcoin";
  if (lower.startsWith("eth")) return "ethereum";
  if (lower.startsWith("sol")) return "solana";
  return lower.replace("-usd", "");
}

async function fetchCryptoHistory(symbol) {
  const id = toCoinGeckoId(symbol);
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!json.prices) return [];

    return json.prices.map(([t, p]) => ({
      time: new Date(t).toLocaleTimeString(),
      value: p
    }));
  } catch {
    return [];
  }
}

async function fetchStockHistory(symbol) {
  const url = `${LAMBDA_URL}?mode=market&symbol=${encodeURIComponent(symbol)}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!res.ok || json.status !== "ok") return [];

    return json.data;
  } catch {
    return [];
  }
}

export default function MarketChart({ symbol }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!symbol) {
      setData([]);
      return;
    }

    async function load() {
      try {
        let series = [];

        if (isCryptoSymbol(symbol)) {
          series = await fetchCryptoHistory(symbol);
        } else {
          series = await fetchStockHistory(symbol);
        }

        setData(series);
      } catch {
        setData([]);
      }
    }

    load();
  }, [symbol]);

  if (!symbol) return null;

  if (data === null) {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No market data available for {symbol}.
        </Typography>
      </Box>
    );
  }

  const latest = data[data.length - 1];
  const first = data[0];
  const change = first.value
    ? (((latest.value - first.value) / first.value) * 100).toFixed(2)
    : null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 600 }}>
        {symbol} Market Snapshot
      </Typography>

      {change && (
        <Typography
          variant="body2"
          sx={{ mb: 1 }}
          color={change >= 0 ? "success.main" : "error.main"}
        >
          1d Change: {change}% | Latest: {latest.value.toFixed(2)}
        </Typography>
      )}

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1976d2"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
