import React from 'react';
import {Icon} from "shared/UI/icon/icon";
import {DetailsMenu} from "widgets/details-menu/DetailsMenu";
import {Filter} from "shared/UI/filter/Filter";


export const InteractiveMenu = () => {
  return (
      <div className='relative'>
        <div className='absolute flex'>
          <DetailsMenu/>
          <div
              className='flex justify-center items-center bg-white h-[50px] w-[50px] rounded-[10px] ml-7 cursor-pointer'>
            <Icon className={'h-[24px] w-[24px] stroke-black'} name={'search'} section={'search'}/>
          </div>
          <Filter className='ml-7' />
          <div className='flex justify-center items-center bg-white h-[50px] w-[50px] rounded-[10px] ml-7 cursor-pointer'>
            <Icon className={'h-[24px] w-[24px]'} name={'calendar'} section={'calendar'}/>
          </div>
        </div>
      </div>
  );
};
