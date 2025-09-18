import React, { useEffect, useState, useCallback } from 'react';
import Card from './Card';

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Secure API key reference
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  const getData = useCallback(async () => {
    if (!API_KEY || API_KEY === "demo-key") {
      setError("News API is currently not available. Please try again later.");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news data');
      }
      
      const jsonData = await response.json();
      setNewsdata(jsonData.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [search, API_KEY]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getData();
  };

  const userInput = (event) => {
    setSearch(event.target.value);
    // Trigger search immediately when category is selected
    setTimeout(() => getData(), 100);
  };

  return (
    <div className="news-app">
      <nav className="news-nav">
        <div className="nav-brand">
           <h1>Trendy News</h1>
        </div>
        
        <form className='search-bar' onSubmit={handleSearch}>
           <input 
             type='text' 
             placeholder='Search News' 
             value={search} 
             onChange={handleInput}
           />
           <button type="submit">Search</button>
        </form>
      </nav>
      
      <div className="app-header">
        <p className='head'>Stay Updated With TrendyNews</p>
      </div>
      
      <div className='category-buttons'>
        <button onClick={() => userInput({target: {value: "sports"}})}>Sports</button>
        <button onClick={() => userInput({target: {value: "politics"}})}>Politics</button>
        <button onClick={() => userInput({target: {value: "entertainment"}})}>Entertainment</button>
        <button onClick={() => userInput({target: {value: "health"}})}>Health</button>
        <button onClick={() => userInput({target: {value: "fitness"}})}>Fitness</button>
      </div>
    
      {loading && <div className="loading">Loading news...</div>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="news-container">
        {newsData ? <Card data={newsData}/> : null}
      </div>
    </div>
  );
};

export default Newsapp;