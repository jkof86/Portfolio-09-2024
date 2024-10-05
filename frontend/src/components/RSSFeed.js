import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { parseString } from 'xml2js';
import { Box, Button } from '@mui/material';

//We use the allOrigins API to let us make cross-domain requests to the given feed.
const allOriginsUrl = 'https://api.allorigins.win';

// Java Code Geeks: Offers tutorials, news, and insights on Java programming and related technologies1.
const javaCodeGeeksUrl = 'https://feeds.feedburner.com/JavaCodeGeeks';

// Baeldung: Focuses on Java, Spring, and related technologies with in-depth tutorials and articles1.
const baeldungUrl = 'https://www.baeldung.com/feed';

// React Native Blog: Stay updated with the latest news and events in the React Native community2.
const reactNativeBlogUrl = 'https://reactnative.dev/blog/atom.xml';

// ReactScript: Provides the latest free ReactJS and React Native components, widgets, modules, and tools2.
const reactScriptUrl = 'https://feeds.feedburner.com/ReactjsComponents';


export default function RSSFeed() {
  const [items, setItems] = useState([]);
  const title = ['Java Code Geeks', 'Baeldung', 'React Native Blog', 'ReactScript']

  // useEffect(() => {
  //   const fetchRSS = async () => {

  //     try {
  //       const response = await axios.get(`${allOriginsUrl}/get?url=${reactScriptUrl}`);
  //       parseString(response.data, (err, result) => {
  //         if (!err) {
  //           setItems(result.rss.channel[0].item);
  //         }
  //       });
  //     } catch (error) {
  //       console.error('Error fetching the RSS feed:', error);
  //     }
  //   };

  //   fetchRSS();
  // }, []);

  //We use the allOrigins API to let us make cross-domain requests to the given feed.
  //https://allorigins.win/

  const getRss = async (e) => {
    e.preventDefault();
    // const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    // if (!urlRegex.test(`${allOriginsUrl}/get?url=${reactScriptUrl}`)) {
    //   return;
    // }

    const res = await fetch(`${allOriginsUrl}/get?url=${reactScriptUrl}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      // author: el.querySelector("author").innerHTML
    }));
    setItems(feedItems);
  };

  return (
    <div>
      <Button variant='contained' onClick={getRss}>
        Load Rss Feed
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
// <div>
//   <h1>{title[0]} Feed</h1>
//   <Box border={'2px solid black'} borderRadius={'25px'}>
//   <ul>
//     {items.map((item, index) => (
//       <li key={index}>
//         <a href={item.link[0]}>{item.title[0]}</a>
//       </li>
//     ))}
//   </ul>
//   </Box>
// </div>
