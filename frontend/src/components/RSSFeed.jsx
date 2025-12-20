import React, { useEffect, useState, useRef } from 'react';
import DOMPurify from 'dompurify';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
    Box,
    Button,
    Alert
} from '@mui/material';

// ✅ Raw feed URLs
const RAW_FEEDS = {
    jcg: 'https://www.javacodegeeks.com/feed',
    cd: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
    ct: 'https://cointelegraph.com/rss',
    cb: 'https://blog.coinbase.com/feed',
};

// ✅ rss2json endpoint builder
function buildRss2JsonUrl(feedUrl) {
    return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
}

export default function RSSFeed({ name }) {
    const [items, setItems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5); // ✅ Infinite scroll batch size
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadMoreRef = useRef(null);

    // ✅ Fetch feed using rss2json only (no XML parsing)
    const loadFeed = async () => {
        setError(null);
        setLoading(true);

        try {
            const feedUrl = RAW_FEEDS[name];
            const apiUrl = buildRss2JsonUrl(feedUrl);

            const res = await fetch(apiUrl);
            const json = await res.json();

            if (!json.items) {
                throw new Error("rss2json returned no items");
            }

            setItems(json.items);
        } catch (err) {
            console.error("RSS error:", err);
            setError("Failed to load feed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeed();
    }, [name]);

    // ✅ Infinite scroll observer
    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setVisibleCount(prev => prev + 5);
                }
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, []);

    // ✅ Extract thumbnail from rss2json structure
    const getThumbnail = item => {
        return (
            item.thumbnail ||
            item.enclosure?.link ||
            null
        );
    };

    if (loading) return <CircularProgress />;

    if (error) {
        return (
            <Box>
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                <Button variant="contained" onClick={loadFeed}>Retry</Button>
            </Box>
        );
    }

    return (
        <Box>
            {items.slice(0, visibleCount).map((item, index) => {
                const image = getThumbnail(item);

                return (
                    <Card key={index} sx={{ mb: 2, pointerEvents: "auto" }}>

                        {/* ✅ Responsive, clickable thumbnail */}
                        {image && (
                            <Box
                                component="a"
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: "block",
                                    width: "100%",
                                    pointerEvents: "auto", // ✅ Allow clicks
                                    textDecoration: "none",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={image}
                                    alt={item.title}
                                    sx={{
                                        width: "100%",
                                        height: { xs: 140, sm: 180, md: 220 }, // ✅ Responsive sizes
                                        objectFit: "cover", // ✅ Prevent distortion
                                        cursor: "pointer",
                                    }}
                                />
                            </Box>
                        )}

                        {/* ✅ Disable CardContent click interception */}
                        <CardContent sx={{ pointerEvents: "none" }}>

                            {/* ✅ Clickable title */}
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ pointerEvents: "auto" }}
                            >
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        fontWeight: 600,
                                    }}
                                >
                                    {item.title}
                                </a>
                            </Typography>

                            {/* ✅ Clickable links inside description */}
                            <Box
                                sx={{ mt: 1, pointerEvents: "auto" }}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(item.description),
                                }}
                            />

                            {/* ✅ Publication date */}
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ pointerEvents: "auto" }}
                            >
                                {item.pubDate}
                            </Typography>
                        </CardContent>
                    </Card>

                );
            })}

            {/* ✅ Infinite scroll trigger */}
            <div ref={loadMoreRef} style={{ height: "40px" }} />
        </Box>
    );
}
