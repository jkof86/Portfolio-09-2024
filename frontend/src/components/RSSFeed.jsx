import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress
} from "@mui/material";

import { GlobalRefreshContext } from "../context/GlobalRefreshContext";
import FeedCard from "./FeedCard";

const LAMBDA_URL =
  "https://jy4i499sj1.execute-api.us-east-1.amazonaws.com/default/RSSProxyAggregator";

// function stripCdata(str) {
//   if (!str) return str;
//   return str
//     .replace(`/^<!\[CDATA\[/, "")
//     .replace(/\]\]>$/, ""`);
//   }

function stripCdata(str) {
  if (!str) return str;
  return str
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .trim();
}


export default function RSSFeed({ name, feedLabel }) {
  const { refreshVersion } = useContext(GlobalRefreshContext);
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const url = `${LAMBDA_URL}?source=${name}`;

        const res = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
            "Accept":
              "application/rss+xml, application/xml, text/xml, text/html;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Referer: url
          }
        });

        const json = await res.json();

        if (!res.ok || json.status !== "ok") {
          setItems([]);
          setError(json.error || "Failed to load feed");
          return;
        }

        const cleaned = json.items.map((item, index) => (
          <FeedCard key={index} item={item} source={name} />
        ))


        setItems(cleaned);
      } catch {
        setItems([]);
      }
    }

    load();
  }, [name, refreshVersion]);

  if (items === null) {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        {feedLabel || name}
      </Typography>

      {items.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No items available.
        </Typography>
      )}

      {items.map((item, idx) => (
        <Card key={idx} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {item.title}
            </Typography>

            {item.content_html && (
              <Box
                sx={{
                  mt: 1,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  "& p": { mb: 1.0, lineHeight: 1.5 },
                  "& img": { maxWidth: "100%", height: "auto" }
                }}
                dangerouslySetInnerHTML={{ __html: item.content_html }}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
