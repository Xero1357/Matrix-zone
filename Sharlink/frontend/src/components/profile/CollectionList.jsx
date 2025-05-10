import React from 'react';
import CollectionCard from './CollectionCard';

const CollectionList = ({ collections }) => {
  if (collections.length === 0) {
    return <p className="text-center text-muted">No collections found.</p>;
  }

  return (
    <div className="row">
      {collections.map((col) => (
        <CollectionCard
          key={col.id}
          title={col.title}
          coverImage={col.coverImage}
          numberOfLinks={col.numberOfLinks}
          description={col.description}
          url={col.url}
        />
      ))}
    </div>
  );
};

export default CollectionList;
  