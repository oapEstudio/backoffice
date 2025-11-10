import { useEffect, useState } from 'react';
import { DynamicPage } from '../../shared/components/dynamic-page/DynamicPage';
import type { ISectionPage } from '../new_page/components/section-page/SectionPage';
import { loadDynamicPageFromStorage } from '../../shared/storage/dp-load';

export const PreviewPage = () => {
  const [initPageProps, setInitPageProps] = useState<ISectionPage[]>([]);

 useEffect(() => {
  
  (async () => {
    const s = await loadDynamicPageFromStorage();
    
    setInitPageProps(s);

  })();

}, []);

  return <DynamicPage isMenu={true} isEdit={false} sections={initPageProps} />;
};
