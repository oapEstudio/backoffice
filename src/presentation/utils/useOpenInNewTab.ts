import { useHref } from 'react-router-dom';

export function useOpenInNewTab(path: string) {
  const href = useHref(path);
  return () => window.open(href, '_blank', 'noopener,noreferrer');
}