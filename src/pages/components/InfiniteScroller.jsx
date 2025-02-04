import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScroller = ({ newsData = [] }) => {
  const staticNews = ["News 1", "News 2", "News 3", "News 4", "News 5", "News 6"];
  const initialNews = newsData.length > 0 ? newsData.slice(0, 6) : staticNews;

  const [news, setNews] = useState(initialNews);
  const loaderRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (newsData.length > 0) {
      setNews(newsData.slice(0, 6));
      setHasMore(true);
    }
  }, [newsData]);

  const loadMoreNews = useCallback(() => {
    if (!Array.isArray(newsData)) return;

    setTimeout(() => {
      setNews((prevNews) => {
        const nextItems = newsData.slice(prevNews.length, prevNews.length + 3);
        if (nextItems.length === 0) {
          setHasMore(false);
          return prevNews;
        }
        return [...prevNews, ...nextItems];
      });
    }, 1000);
  }, [newsData]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreNews();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loadMoreNews, hasMore]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-auto p-4">
      <h2 className="text-2xl font-bold text-center mt-4 text-[#E1DFEC] DMSans">Activty</h2>

     
      <div className="flex flex-col w-full max-w-[90vw] lg:max-w-[70vw] h-[70vh] md:h-[60vh] p-4 border border-gray-700 rounded-lg bg-[rgb(16,14,33)] shadow-lg">
        <div className="flex-grow overflow-y-auto scrollbar-hide space-y-4 p-2 bg-[rgb(16,14,33)]">
          {news.length > 0 ? (
            news.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-gray-900 rounded-lg shadow-md text-center text-lg font-semibold text-white 
                h-[20%] sm:h-[25%] md:h-[30%] lg:h-[32%]" 
              >
                {item}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No news available</p>
          )}
          {hasMore && (
            <div ref={loaderRef} className="text-center text-gray-400 py-4">
              Loading more news...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroller;

