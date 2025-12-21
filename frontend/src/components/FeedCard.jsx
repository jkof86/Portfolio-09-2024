import React from "react";
import { Box, Typography, Chip } from "@mui/material";

const FeedCard = ({ item, source }) => {
  const {
    title,
    url,
    summary,
    content_html,
    date_published,
    image
  } = item;

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 1,
        "&:hover": { boxShadow: 3, transition: "0.2s" }
      }}
    >
      {/* Title */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {title}
        </a>
      </Typography>

      {/* Metadata row */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
        {source && (
          <Chip
            label={source.toUpperCase()}
            size="small"
            sx={{
              fontSize: "0.65rem",
              fontWeight: 600,
              opacity: 0.8
            }}
          />
        )}

        {date_published && (
          <Typography
            variant="caption"
            sx={{ opacity: 0.7, fontSize: "0.7rem" }}
          >
            {date_published}
          </Typography>
        )}
      </Box>

      {/* Image */}
      {image && (
        <Box sx={{ my: 1 }}>
          <img
            src={image}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 6,
              display: "block"
            }}
          />
        </Box>
      )}

      {/* Summary / HTML content */}
      <Typography
        variant="body2"
        sx={{
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          lineHeight: 1.5,
          "& p": { mb: 1 },
          "& img": { maxWidth: "100%", borderRadius: 4 }
        }}
        dangerouslySetInnerHTML={{
          __html: content_html || summary || ""
        }}
      />
    </Box>
  );
};

export default FeedCard;
