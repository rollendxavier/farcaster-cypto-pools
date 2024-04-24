import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const TrendingPools = () => {
  const [pools, setPools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_COINGECKO_API_PRO_KEY; // Your CoinGecko API key from environment variable

  useEffect(() => {
    const getPools = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/pools', {
          headers: { 'x-cg-pro-api-key': apiKey },
          params: { query: 'weth', network: 'eth', include: 'dex', page: 1 }
        });
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
        setPools(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    getPools();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('Pools:', pools);

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>React App</title>
        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content="Trending Crypto Pools" />
        <meta property="og:description" content="Check out the latest trends in crypto pools." />
        <meta property="og:image" content="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Additional tags as needed */}
      </Helmet>
      <h1>Trending Crypto Pools</h1>
      {pools.map((pool, index) => (
        <div key={pool.id}>
          <h2>{index + 1}. Pool ID: {pool.id}</h2>
          <p>Pool Name: {pool.attributes.name}</p>
          <p>Base Token Price (USD): ${pool.attributes.base_token_price_usd}</p>
          <p>Quote Token Price (USD): ${pool.attributes.quote_token_price_usd}</p>
          <p>Base Token Price (Quote Token): {pool.attributes.base_token_price_quote_token}</p>
          <p>Quote Token Price (Base Token): {pool.attributes.quote_token_price_base_token}</p>
          <p>Total Liquidity: ${pool.attributes.reserve_in_usd}</p>
          <p>Price Change Percentage in the last 5 minutes: {pool.attributes.price_change_percentage.m5}%</p>
          <p>Price Change Percentage in the last 1 hour: {pool.attributes.price_change_percentage.h1}%</p>
          <p>Price Change Percentage in the last 6 hours: {pool.attributes.price_change_percentage.h6}%</p>
          <p>Price Change Percentage in the last 24 hours: {pool.attributes.price_change_percentage.h24}%</p>
        </div>
      ))}
    </>
  );
};

export default TrendingPools;
