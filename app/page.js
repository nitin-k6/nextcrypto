"use client"
import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie'; 
import CoinList from '@/components/CoinList';
import SearchBar from '@/components/SearchBar/page';
import Layout from './layout';

export default function Home() {
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [requestQueue, setRequestQueue] = useState([]); // Queue to hold pending requests
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);

      const cachedData = Cookie.get('cachedData'); // Get cached data from cookies.
      if (cachedData) {
        setFilteredCoins(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        addToQueue(); // Adding a request to the queue.
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const addToQueue = () => {
    setRequestQueue([...requestQueue, true]); // Adding a request to the queue.
  };

  useEffect(() => {
    const fetchQueue = async () => {
      if (requestQueue.length === 0) return;
      try {
        const apiKey = 'CG-p1Ddpkeo4zaK47XGimyXXMpJ';
        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&api_key=${apiKey}`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setFilteredCoins(data);
        Cookie.set('cachedData', JSON.stringify(data), { expires: 1 }); // Cache data in cookies
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
        setRequestQueue(prevQueue => prevQueue.slice(1)); // Remove the processed request from the queue
      }
    };

    fetchQueue();
  }, [requestQueue]);

  const handleChange = e => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };

  const allCoins = Array.isArray(filteredCoins)
    ? filteredCoins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <Layout>
      <div className='coin_app'>
        <SearchBar type='text' placeholder='Search' onChange={handleChange} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CoinList filteredCoins={allCoins} />
        )}
      </div>
    </Layout>
  );
}
