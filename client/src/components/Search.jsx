import React, { useState } from 'react';
import { useArticle } from './ArticleContext';

const Search = () => {
  const [searchString, setSearchString] = useState('');
  const { articles, originalArticles, setArticles } = useArticle();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchString(value);

    // Reset to original articles if search string is cleared
    if (value === '') {
      setArticles(originalArticles);
    }
  };

  const search = () => {
    if (searchString === '') {
      // If search is empty, show all original articles
      setArticles(originalArticles);
    } else {
      // Filter the articles based on the search string
      const filteredArticles = originalArticles.filter((article) =>
        article.title.toLowerCase().includes(searchString.toLowerCase())
      );
      setArticles(filteredArticles);
    }
  };

  return (
    <div className="grid grid-cols-6">
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={searchString}
        onChange={handleChange}
        required
        className="w-full col-span-4 px-4 border border-gray-600 focus:outline-none"
      />
      <button
        onClick={search}
        className="w-full col-span-2 px-4 bg-slate-900 text-white text-lg font-semibold transition duration-300"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
