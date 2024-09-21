import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';


export default function RSSFeed() {
    const [items, setItems] = useState([]);
    const title = ['Java Code Geeks', 'Baeldung', 'React Native Blog', 'ReactScript']

    useEffect(() => {
      const fetchRSS = async () => {
        try {
          const response = await axios.get('https://feeds.feedburner.com/JavaCodeGeeks');
          parseString(response.data, (err, result) => {
            if (!err) {
              setItems(result.rss.channel[0].item);
            }
          });
        } catch (error) {
          console.error('Error fetching the RSS feed:', error);
        }
      };
  
      fetchRSS();
    }, []);
  
    return (
      <div>
        <h1>{title[1]} Feed</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.link[0]}>{item.title[0]}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };