import React, { useState } from 'react';
import './QuoteSearch.css';

const API_URL = "https://dummyjson.com/quotes/random";

const QuoteSearch = () => {
  const [quote, setQuote] = useState(null);

  const fetchRandomQuote = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  return (
    <div className="quote-search-container">
      <h2>Random Quote Generator</h2>
      <div className="searchbar">
        <button onClick={fetchRandomQuote}>Get Random Quote</button>
      </div>
      <ul className="quote-list">
        {quote ? (
          <li>
            <p>"{quote.quote}"</p>
            <p>- {quote.author}</p>
          </li>
        ) : (
          <p>Click the button to generate a quote!</p>
        )}
      </ul>
    </div>
  );
};

export default QuoteSearch;
