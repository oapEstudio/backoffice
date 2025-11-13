import { useEffect, useState } from 'react';
import { DynamicPage } from '../../shared/components/dynamic-page/DynamicPage';
import type { ISectionPage } from '../new_page/components/section-page/SectionPage';
import { loadDynamicPageFromStorage } from '../../shared/storage/dp-load';

export const PreviewPage = () => {
  const [initPageProps, setInitPageProps] = useState<ISectionPage[]>([]);
  const [hasMenu, setHasMenu] = useState<boolean>(false);

 useEffect(() => {
  
  (async () => {
    const s = await loadDynamicPageFromStorage();
    
    setHasMenu(s.hasMenu);
    setInitPageProps(s.sections);

  })();

}, []);

  return <DynamicPage isMenu={hasMenu} isEdit={false} sections={initPageProps} />;
};
