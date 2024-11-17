import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ArticleContext = createContext(undefined);

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [originalArticles, setOriginalArticles] = useState([]); // Store original articles
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/news")
      .then((res) => {
        setArticles(res.data.articles);
        setOriginalArticles(res.data.articles); // Save original articles
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  return (
    <ArticleContext.Provider
      value={{ articles, setArticles, originalArticles, loading }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within ArticleProvider");
  }
  return context;
};
