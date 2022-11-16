import React from 'react';
import dynamic from 'next/dynamic'
import {keyframes, styled} from "@stitches/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {Icon} from "shared/UI/icon/icon";
import { EventsList } from "widgets/events-list/EventsList";
// import {EventsList} from "widgets/events-list/EventsList";
// import {DistributorsList} from "widgets/distributors-list/DistributorsList";

// import {Chart} from "widgets/chart/Chart";
const Chart = dynamic(() =>
    import('widgets/chart/Chart').then((mod) => mod.Chart), {
  loading: () => <h2>Loading...</h2>
    }
)

// const slideDown = keyframes({
//   from: {width: 0, height: 0},
//   to: {width: 'var(--radix-accordion-content-width)', height: 'var(--radix-accordion-content-height)'},
// });

const slideUp = keyframes({
  from: {width: 'var(--radix-accordion-content-width)', height: 'var(--radix-accordion-content-height)'},
  to: {width: 0, height: 0},
});

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: 15,

  // '&[data-state="open"]': {
  //   animation: `${slideDown} .5s ease-out`,
  // },
  '&[data-state="closed"]': {
    animation: `${slideUp} .5s ease-out`,
  },
});

const StyledChevron = styled(Icon, {
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': {transform: 'rotate(180deg)'},
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  '[data-state=closed] &': {
    borderRadius: '10px',
  },
  '[data-state=open] &': {
    borderRadius: '10px 10px 0 0',
    borderBottom: '1px solid #D6D6D6',
    justifyContent: "space-between",
    padding: '0 20px'
  }
})

const StyledLabel = styled("h2", {
  '[data-state=open] &': {
    display: 'block'
  }
})

export const DetailsMenu = () => {
  return (
      <AccordionPrimitive.Root className='transition-all' collapsible type={'single'}>
        <AccordionPrimitive.Item className=' justify-end bg-white rounded-[10px]' value={'hello'}>
          <StyledTrigger
              className='bg-white h-[50px] min-w-[50px] w-full rounded-[10px] flex justify-center  items-center'>
            <StyledLabel
                className='whitespace-nowrap hidden flex items-center h-full p-[2px] font-medium text-black text-[24px]'>
              Мероприятия
            </StyledLabel>
            <StyledChevron className={'h-[24px] w-[24px]'} name={'chevron'} section={'chevron'}/>
          </StyledTrigger>
          <StyledContent className='relative'>
            <EventsList/>
            {/*<DistributorsList />*/}
            {/*<Chart />*/}
          </StyledContent>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
  );
};
