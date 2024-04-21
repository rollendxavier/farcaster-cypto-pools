import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const TrendingPools = () => {
  const [pools, setPools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY; // Your CoinGecko API key from environment variable

  useEffect(() => {
    const getPools = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://pro-api.coingecko.com/api/v3/onchain/search/pools', {
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
    <div>
      <Helmet>
        <title>Trending Crypto Pools</title>
        <title>Trending Crypto Pools</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="http://raw.githubusercontent.com/rollendxavier/farcaster-cypto-pools/main/app.jpg" /> {/* Replace with your image URL */}
        <meta property="fc:frame:button:1" content="Button 1" />
        <meta property="fc:frame:button:2" content="Button 2" />
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
    </div>
  );
};

export default TrendingPools;
