import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScroller = ({ newsData = [] }) => {
  const staticNews = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus, libero sed interdum congue, velit libero vestibulum metus, at semper lectus purus et mauris. Sed commodo velit vitae congue luctus. Cras vestibulum tellus in porta rhoncus. Mauris tempor, lorem at auctor pellentesque, felis neque ullamcorper velit, ac semper sapien urna vel mi. Sed laoreet, purus ut tincidunt venenatis, turpis erat varius massa, vitae cursus quam nibh at ipsum. Ut feugiat eget sem vulputate consectetur. Integer semper risus augue, rutrum laoreet nisi ultrices eu. Vivamus sed sagittis turpis, sit amet porta nulla. Etiam ac accumsan lacus, ut tristique dui. Donec at ante id nunc suscipit varius.",
    "Nefdsfdsfsd",
    "News 3",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus, libero  ",
    "News 5",
    "News 6"
  ];
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
      <h2 className="text-4xl font-bold text-center mb-[1%] text-[#E1DFEC] DMSans">Activity</h2>

      <div className="flex flex-col w-full max-w-[90vw] lg:max-w-[70vw] h-[70vh] md:h-[60vh] p-4 border border-[#110E22] rounded-lg bg-[rgb(16,14,33)] shadow-lg DMSans ">
        <div className="flex-grow overflow-y-auto scrollbar-hide space-y-4 p-[1%] bg-[#110E22]">
          {news.length > 0 ? (
            news.map((item, index) => (
              <div
                key={index}
                className="p-[2%] bg-[#15112b] rounded-lg shadow-md text-center text-md md:text-lg font-semibold text-[#E1DFEC] min-h-[50px] w-full"
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