import React, { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';

import type { IScrollContainer } from './infinity-scroll-container.interface';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface InfinityScrollContainerProps extends IScrollContainer {
  fetchMoreData: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const InfinityScrollContainer: React.FC<InfinityScrollContainerProps> = ({
  children,
  fetchMoreData,
  hasMore,
  isLoading
}) => {
  const [items, setItems] = useState<ReactNode[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (children) {
      setItems(React.Children.toArray(children));
    }
  }, [children]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log("Intersecting: fetching more data...");
            fetchMoreData();
          }
        },
        { 
          root: document.querySelector("#mainWrapper"),
          rootMargin: "20px", // Ajusta este margen para detectar antes
          threshold: 0.2 // Cambia este valor para ajustar la sensibilidad
        }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchMoreData]
  );

  return (
    <Box sx={{ paddingTop: 0 }}>
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <div key={index} ref={lastElementRef}>
              {item}
            </div>
          );
        } else {
          return <div key={index}>{item}</div>;
        }
      })}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default InfinityScrollContainer;
