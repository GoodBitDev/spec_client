import React from 'react';
import {EventsFilter} from "features/events-filter/ui";
import {ScrollArea} from "shared/UI/scroll-area/ScrollArea";

export const EventsList = () => {
  return (
      <ScrollArea>
        <ul className='pl-[20px] pr-[40px] py-[10px] w-[343px]'>
          <div className='mb-[22px]'>
            <EventsFilter/>
          </div>
          {[...Array(20)].map((el, index) => (
              <EventItem key={index}/>
          ))}
        </ul>
      </ScrollArea>
  );
};

export const EventItem = () => {
  return (
      <li className='w-full py-2.5 border-t border-t-grey-500 flex justify-between'>
        <div className='flex flex-col justify-between'>
          <h3 className='font-medium text-black text-xl'>HOOKOFF</h3>
          <span className='underline text-base text-blue-700 cursor-pointer hover:opacity-75'>Москва МО</span>
        </div>
        <div className='flex-col justify-between'>
          <span className='underline text-xs text-black'>Акция запланирована</span>
          <div className='text-end'>
            <data className='underline text-base text-black'>24.09.22</data>
          </div>
        </div>
      </li>
  )
}
