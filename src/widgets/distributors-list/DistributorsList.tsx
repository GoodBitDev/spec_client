import React from 'react';
import {ScrollArea} from "shared/UI/scroll-area/ScrollArea";
import {Icon} from "shared/UI/icon/icon";

export const DistributorsList = () => {
  return (
      <ScrollArea>
        <ul className='pl-[20px] pr-[25px] py-[10px] w-[266px]'>
          {[...Array(20)].map((el, index) => (
              <DistributorItem key={index}/>
          ))}
        </ul>
      </ScrollArea>
  );
};

export const DistributorItem = () => {
  return (
      <li className='border-b border-b-grey-500 py-[10px] w-full flex justify-between items-center pr-[10px]'>
        <div>
          <h3 className='font-medium text-black text-xl'>HOOKOFF</h3>
          <span className='underline text-base text-blue-700 cursor-pointer hover:opacity-75'>Москва МО</span>
        </div>
        <Icon className={'w-[24px] h-[24px]'} name={'distrib'} section={'distrib'} />
      </li>
  )
}
