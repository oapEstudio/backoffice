import { useEffect } from 'react';

type Opts = {

  targetRef: React.RefObject<HTMLElement | null>;

  behavior?: ScrollBehavior; 

  offset?: number;
};


function getScrollParent(el: HTMLElement | null): HTMLElement | Window {
  let node: HTMLElement | null = el?.parentElement ?? null;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    const scrollable = (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight;
    if (scrollable) return node;
    node = node.parentElement;
  }
  return window;
}

export function useScrollToTopOnStep(step: number, opts: Opts) {
  useEffect(() => {
    const target = opts.targetRef.current;
    if (!target) return;

    const behavior = opts.behavior ?? 'smooth';
    const offset = opts.offset ?? 0;

    const raf = requestAnimationFrame(() => {
 
      target.scrollIntoView({ behavior, block: 'start', inline: 'nearest' });

      const scroller = getScrollParent(target);


      setTimeout(() => {
        if (scroller instanceof Window) {
      
          if (offset) window.scrollBy({ top: -offset, left: 0, behavior: 'auto' });
        } else {
         
          scroller.scrollTo({
            top: scroller.scrollTop - offset,
            left: scroller.scrollLeft,
            behavior: 'auto',
          });
        }
      }, 0);
    });

    return () => cancelAnimationFrame(raf);
  }, [step, opts.targetRef, opts.behavior, opts.offset]);
}
