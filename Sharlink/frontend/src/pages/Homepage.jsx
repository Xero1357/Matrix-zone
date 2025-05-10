import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/common/SearchBar';
import TopCollections from '../components/collection/TopCollections';
import TopLinks from '../components/collection/TopLinks';

const Homepage = () => {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get('http://localhost:2100/api/collections');
        setCollections(res.data);
        setFilteredCollections(res.data);
      } catch (error) {
        console.error('Failed to fetch collections:', error);
      }
    };

    fetchCollections();
  }, []);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      setFilteredCollections(collections);
      return;
    }

    const filtered = collections.filter((collection) => {
      const matchesCollectionTitle = collection.title
        .toLowerCase()
        .includes(lowerQuery);

      const matchesLinkTitle = collection.linkIds?.some((link) =>
        link?.title?.toLowerCase().includes(lowerQuery)
      );

      return matchesCollectionTitle || matchesLinkTitle;
    });

    setFilteredCollections(filtered);
  };

  return (
    <div className='container mt-4'>
      <h1 className='text-center mb-4'>Welcome to SharLinks</h1>

      <SearchBar onSearch={handleSearch} />
      <TopCollections collections={filteredCollections} />
      <TopLinks />
    </div>
  );
};

export default Homepage;
