import React from "react";
import { DistributorRow } from "shared/UI/distributor-row";
import { Icon } from "shared/UI/icon/icon";

export const DistributorInfo = () => {
  return (
    <div className="flex flex-col w-full shadow-btn rounded-1xs px-8 py-10">
      <div className='flex justify-between mb-5'>
        <div className='border border-blue-700 h-15 center px-7 rounded-xs'>
          <span className='font-medium text-2xs'>XpertHookah</span>
        </div>
        <button className='h-15 w-15 border border-blue-700 rounded-xs center'>
          <Icon className={'w-[24px] h-[24px]'} name={'pencil'} section={'pencil'} />
        </button>
      </div>
      <ul>
        <DistributorRow textLeft={"Юридическое название:"} textRight={"Магазин товаров для паровых коктейлей"} />
        <DistributorRow textLeft={"Юридическое название:"} textRight={"Магазин товаров для паровых коктейлей"} />
        <DistributorRow textLeft={"Юридическое название:"} textRight={"Магазин товаров для паровых коктейлей"} />
        <DistributorRow textLeft={"Юридическое название:"} textRight={"Магазин товаров для паровых коктейлей"} />
        <DistributorRow textLeft={"Юридическое название:"} textRight={"Магазин товаров для паровых коктейлей"} />
      </ul>
    </div>
  );
};
