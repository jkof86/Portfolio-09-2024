// ------------------------------------------------------------
// Home.jsx
// - Login validation
// - Banner + Navbar
// - Ticker bar
// - Layout toggle (Tabs vs Sidebar)
// - FeedStatusProvider + GlobalRefreshProvider
// - Category layouts + charts
// - Feed health dashboard
// ------------------------------------------------------------

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Toolbar,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import banner from "../images/bg/ksBanner08.jpeg";
import Navbar from "./navigation/Navbar";

import TabsLayout from "./layouts/TabsLayout";
import TickerBar from "./layouts/TickerBar";
import FeedHealthDashboard from "./FeedHealthDashboard";

import { FeedStatusProvider } from "../context/FeedStatusContext";
import { GlobalRefreshProvider } from "../context/GlobalRefreshContext";
import { feedCategories } from "../data/feedCategories";

// -----------------------------------------

export default function Home() {

  const categories = feedCategories;
  const [currentCategory, setCurrentCategory] = useState(
    Object.keys(categories)[0] || ""
  );
  const feeds = categories[currentCategory] || [];
  const safeFeedIndex = 0;

  // ---------------------------------------------------

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      console.log("User NOT logged in → redirecting to /login");
      navigate("/login");
    } else {
      console.log("User IS logged in");
    }
  }, [navigate]);

  return (
    <FeedStatusProvider>
      <GlobalRefreshProvider>
        <center>

          <Toolbar
            sx={{
              justifyContent: "center",
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "white",
              borderRadius: "25px",
              border: "1px solid black",
              boxShadow: "0px 0px 8px 5px white",
              height: "300px",
              width: "800px",
              mt: 2
            }}
          />

          <Navbar />
          <TickerBar />

          <Box
            padding={0}
            sx={{
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "25px",
              border: "1px solid black",
              boxShadow: "0px 0px 2px 2px white",
              padding: "10px",
              margin: "20px",
              width: "75vw"
            }}>

            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  RSS Feeds
                </Typography>

                <Card
                  sx={{
                    border: "2px solid black",
                    maxWidth: "100%",
                    borderRadius: "25px",
                    margin: "10px",
                    padding: "10px",
                    textAlign: "center"
                  }}
                >
                  <CardActionArea>
                    <CardMedia>
                      <CardContent>

                        {/* Category Selector */}
                        <Box sx={{ mb: 2 }}>
                          <ToggleButtonGroup
                            value={currentCategory}
                            exclusive
                            onChange={(e, val) => val && setCurrentCategory(val)}
                            size="small"
                          >
                            {Object.keys(categories).map((cat) => (
                              <ToggleButton key={cat} value={cat}>
                                {cat}
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup>
                        </Box>

                        {/* Tabs Layout Only */}
                        <TabsLayout
                          feeds={feeds}
                          safeFeedIndex={safeFeedIndex}
                          currentCategory={currentCategory}
                        />
                      </CardContent>
                      <CardActions />
                    </CardMedia>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <FeedHealthDashboard />
              </Grid>
            </Grid>
          </Box>
        </center>
      </GlobalRefreshProvider>
    </FeedStatusProvider >
  );
}
