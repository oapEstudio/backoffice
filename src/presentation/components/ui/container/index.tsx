import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from '../header/header.component';
import type { IContainer } from './container.interface';
import InfinityScrollContainer from '../infinity-scroll-container';
import Box from '@mui/material/Box';
import { scrollService } from '../../../utils/ScrollService';

const Container: React.FC<IContainer> = ({ title, description, children, header, infinityScroll = false, fetchMoreData, hasMore = false, isLoading = false, }) => {

  useEffect(() => {  
    scrollService.scrollToTop("auto"); 
  }, []);
  return (
    <HelmetProvider>
      <Box>
        {header && <Header title={title} animationData={header.animationData} actionComponent={header.actionComponent} />}
        <Box>
          <Helmet>
            <title>{title || 'Default Title'}</title>
            <meta name="description" content={description} />
          </Helmet>
          {infinityScroll && fetchMoreData ? (
            <InfinityScrollContainer fetchMoreData={fetchMoreData} hasMore={hasMore} isLoading={isLoading}>{children}</InfinityScrollContainer>
          ) : (
            children
          )}
        </Box>
      </Box>
    </HelmetProvider>
  );
};

export default Container;