import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { ISlide } from '../../../../domain/entities/ISlide';
import { CustomBox } from '../../ui/box/CustomBox';

import { CustomStack } from '../../ui/stack/Stack';
import { ContainerSlideTitle } from './components/ContainerSlideTitle';
import { ArrowsSlide } from './components/ArrowsSlide';



interface ICarouselProps{
  slides: ISlide[];
  height?: number;               
  fullBleed?: boolean;           
  arrowsAtEdges?: boolean;       
}

const PLUS_HEIGHT_RESPONSIVE = 100;

export const Carousel: React.FC<ICarouselProps> = ({
  slides,
  height = 480,
  fullBleed = true,
  arrowsAtEdges = true
}) => { 
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const items = useMemo(() => slides?.filter((s) => s.isActive) ?? [], [slides]);

  useEffect(() => {
    stop();
    if (items.length > 1) {
      timer.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % items.length);
      }, 6000);
    }
    return stop;
    function stop() {
      if (timer.current) window.clearInterval(timer.current);
      timer.current = null;
    }
  }, [items.length]);

  if (!items.length) return null;
  const s = items[index];

  const goPrev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goNext = () => setIndex((i) => (i + 1) % items.length);

  return (
    <CustomBox
       sx={{
      ...(fullBleed
        ? { width: '100vw', ml: 'calc(50% - 50vw)', mr: 'calc(50% - 50vw)' }
        : { width: '100%' }),
      position: 'relative',
      height: { xs: height + PLUS_HEIGHT_RESPONSIVE, md: height }, 
      overflow: 'hidden',
    }}
    >
      {/* Fondo de imagen del slide actual */}
      <CustomBox
          sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: '100%', md: '50%' }, 
          backgroundImage: `url(${s.imageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'auto 100%',     
          zIndex: 0,
        }}
      />

      {/* Contraste */}
      <CustomBox
       sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: { xs: '100%', md: '50%' },
        background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.45) 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      />

    <ContainerSlideTitle height={height} title={s.title} subtitle={s.subtitle} button={s.cta} />
    
      {items.length > 1 && (
       <ArrowsSlide goPrev={goPrev} goNext={goNext} arrowsAtEdges={arrowsAtEdges} />
      )}

    
      {items.length > 1 && (
        <CustomStack
          direction="row"
          sx={{
            gap: 1,
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        >
          {items.map((_, i) => (
            <CustomBox
                          key={i}
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: i === index ? 'primary.main' : 'rgba(255,255,255,0.8)',
                            border: i === index ? '1px solid #fff' : '1px solid rgba(0,0,0,0.25)',
                          }}
                        />
          ))}
        </CustomStack>
      )}
    </CustomBox>
  );
}
