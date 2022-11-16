import React, {FC, ReactNode} from 'react';
import {styled} from "@stitches/react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

const SCROLLBAR_SIZE = 15;

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  // width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  position: 'relative',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: '15px 0',
  marginBottom: 7,
  marginRight: 10,
  border: '1px solid rgba(192, 192, 192, 0.2)',
  borderRadius: '10px',
  transition: 'background 160ms ease-out',
  // '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
  '&::before': {
    content: 'url(icons/chevron-scrollbar.svg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '-3px',
    left: '50%',
    transform: 'translateX(-47%)',
    width: "100%",
    // height: 15,
    borderRadius: '50%'
  },
  '&::after': {
    content: 'url(icons/chevron-scrollbar.svg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '-3px',
    left: '50%',
    transform: 'translateX(-47%) rotate(180deg)',
    width: "100%",
    // height: 15,
    borderRadius: '50%'
  },
});


//TODO ШИРИНА В ЗАВИСИМОСТИ ОТ КОНТЕНТА
const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
  // width: 403,
  // width: 311,
  height: 386,
  borderRadius: 4,
  overflow: 'hidden',
  // boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

export const Scroll = StyledScrollArea;
export const ScrollAreaViewport = StyledViewport;
export const ScrollAreaThumb = StyledThumb;
export const ScrollAreaScrollbar = StyledScrollbar;

interface ScrollAreaProps {
  children: ReactNode;
}

export const ScrollArea: FC<ScrollAreaProps> = ({children}) => {
  return (
      <Scroll type={'auto'} className='absolute w-full'>
        <ScrollAreaViewport>
          {children}
        </ScrollAreaViewport>
        <ScrollAreaScrollbar>
          <ScrollAreaThumb className='bg-blue-scroll' />
        </ScrollAreaScrollbar>
      </Scroll>
  );
};
