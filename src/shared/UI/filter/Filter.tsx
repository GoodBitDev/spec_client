import React, {FC, useState} from 'react';
import clsx from "clsx";
import {Icon} from "shared/UI/icon/icon";
import {Separator} from "shared/UI/separator";

interface FilterProps {
  className?: string;
}

export const Filter: FC<FilterProps> = ({className}) => {
  const [filter, setFilter] = useState('');

  return (
      <div
          className={clsx('flex items-center shadow shadow-icons bg-white h-[50px] min-w-[50px] rounded-[10px] cursor-pointer', filter && 'px-[13px]', className)}>
        <div className='h-full w-full flex justify-center items-center ' onClick={() => setFilter("Hello ")}>
          <Icon className={'h-[24px] w-[24px]'} name={'filter'} section={'filter'}/>
        </div>
        {filter && (
            <div className='flex transition-all'>
              <Separator decorative orientation={'vertical'} className='h-[24px] w-[1px] bg-black mx-[10px]'/>
              <span className='mr-[20px]'>{filter}</span>
              <div onClick={() => setFilter('')}>
                <Icon className={'w-[24px] h-[24px]'} name={'close'} section={'close'}/>
              </div>
            </div>
        )}
      </div>
  );
};
