import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Bgcolor() {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    // Fetch background colors from API
    axios.get('https://mediumblue-jellyfish-250677.hostingersite.com/api/bodycolors')
      .then(response => {
        const colors = response.data;
        if (colors.length > 0) {
          const recentColor = colors[colors.length - 1].background_colors; // Get the most recent color
          setBgColor(recentColor);
          document.body.style.backgroundColor = recentColor; // Apply the background color to the body
        }
      })
      .catch(error => {
        console.error('Error fetching the background color:', error);
      });

    // Clean up: remove background color when component is unmounted
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <>
      
    </>
  );
}
