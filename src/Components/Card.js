import React from 'react';
import './Card.css';

const Card = ({ data }) => {
  if (!data) {
    return (
      <div className="card-container">
        <div className="loading-cards">Loading news...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="card-container">
        <div className="no-articles">No news articles found. Try a different search term.</div>
      </div>
    );
  }

  const openArticle = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className='card-container'>
      {data.map((article, index) => {
        if (!article.title) return null;
        
        return (
          <div className='card' key={index}>
            <div className="card-image">
              <img 
                src={article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={article.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                }}
              />
            </div>
            <div className='card-content'>
              <h3 
                className='card-title' 
                onClick={() => openArticle(article.url)}
                title="Click to read full article"
              >
                {article.title}
              </h3>
              <p className="card-description">
                {article.description 
                  ? (article.description.length > 120 
                      ? `${article.description.substring(0, 120)}...` 
                      : article.description)
                  : 'No description available.'}
              </p>
              <div className="card-footer">
                <button 
                  className="read-more-btn"
                  onClick={() => openArticle(article.url)}
                >
                  Read More
                </button>
                {article.publishedAt && (
                  <span className="publish-date">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              {article.source?.name && (
                <div className="source-name">
                  Source: {article.source.name}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Card;