import { useEffect, useRef } from "react";
import "../styles/List.css";

// eslint-disable-next-line react/prop-types
export default function List({ data = [], loadNextResults }) {
  const lastItemRef = useRef();
  const listContainerRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (cards) => {
        const [card] = cards;
        if (card.isIntersecting) {
          console.log("loadNextResults");
          loadNextResults();
          observer.unobserve(card.target);
        }
      },
      { threshold: 1, root: listContainerRef.current },
    );
    observerRef.current = observer;
    return () => {
      console.log("disconnect", observer.takeRecords());
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadNextResults]);

  useEffect(() => {
    const observer = observerRef.current;
    if (observer && lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const listElements = data.map((item, id) => {
    return id === data.length - 1 ? (
      <div ref={lastItemRef} className="list-item">
        {item}
      </div>
    ) : (
      <div className="list-item">{item}</div>
    );
  });

  return (
    <div ref={listContainerRef} className="list-container">
      {listElements}
    </div>
  );
}
