import React, { useState } from 'react';
import { Button } from '@mui/material';

//We use the allOrigins API to let us make cross-domain requests to the given feed.
const allOriginsUrl = 'https://api.allorigins.win';

// Java Code Geeks: Offers tutorials, news, and insights on Java programming and related technologies1.
const javaCodeGeeksUrl = 'https://feeds.feedburner.com/JavaCodeGeeks';

const coinDeskUrl = 'https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml';

const coinTelegraphUrl = 'https://cointelegraph.com/rss';

const coinbaseBlogUrl = 'https://rss.app/feeds/BjtvcKYmGEzEhve4.xml';

const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(javaCodeGeeksUrl)}`;

export default function RSSFeed(props) {
  const [items, setItems] = useState([]);
  const feedTitle = ['Java Code Geeks', 'Bitcoin.com News']
  
  //We use the allOrigins API to let us make cross-domain requests to the given feed.
  //https://allorigins.win/

  const getRss = async (e) => {

    if (props.name === "jcg") {
      const res = await fetch(`${allOriginsUrl}/get?url=${javaCodeGeeksUrl}`);
      const { contents } = await res.json();
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");
      const items = feed.querySelectorAll("item");
      const feedItems = [...items].map((el) => ({
        link: el.querySelector("link").innerHTML,
        title: el.querySelector("title").innerHTML,
        // author: el.querySelector("author").innerHTML
      }));
      setItems(feedItems);
    }

    if (props.name === "cd") {
      const res = await fetch(`${allOriginsUrl}/get?url=${coinDeskUrl}`);
      const { contents } = await res.json();
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");
      const items = feed.querySelectorAll("item");
      const feedItems = [...items].map((el) => ({
        link: el.querySelector("link").innerHTML,
        title: el.querySelector("title").innerHTML,
        // author: el.querySelector("author").innerHTML
      }));
      setItems(feedItems);
    }

    if (props.name === "ct") {
      const res = await fetch(`${allOriginsUrl}/get?url=${coinTelegraphUrl}`);
      const { contents } = await res.json();
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");
      const items = feed.querySelectorAll("item");
      const feedItems = [...items].map((el) => ({
        link: el.querySelector("link").innerHTML,
        title: el.querySelector("title").innerHTML,
        // author: el.querySelector("author").innerHTML
      }));
      setItems(feedItems);
    }

    if (props.name === "cb") {
      const res = await fetch(`${allOriginsUrl}/get?url=${coinbaseBlogUrl}`);
      const { contents } = await res.json();
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");
      const items = feed.querySelectorAll("item");
      const feedItems = [...items].map((el) => ({
        link: el.querySelector("link").innerHTML,
        title: el.querySelector("title").innerHTML,
        // author: el.querySelector("author").innerHTML
      }));
      setItems(feedItems);
    }
    
  };

  return (
    <div>
      <Button variant='contained' onClick={getRss}>
        Load
      </Button>
      {/* <form onSubmit={getRss}>
        <div>
          <label> rss url</label>
          <br />
          <input onChange={(e) => setRssUrl(e.target.value)} value={rssUrl} />
        </div>
        <input type="submit" />
      </form> */}

      {items.map((item) => {
        return (
          <div>
            <h1>{item.title}</h1>
            <p>{item.author}</p>
            <a href={item.link}>{item.link}</a>
          </div>
        );
      })}
    </div>
  );
};
