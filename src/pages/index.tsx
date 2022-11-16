import React from 'react';
import dynamic from 'next/dynamic'
import {NextPageWithLayout} from "pages/_app";
import {MainLayout} from "shared/UI/main-layout/MainLayout";
// import {RussianMap} from "widgets/russian-map/RussianMap";
import {InteractiveMenu} from "widgets/interactive-menu/InteractiveMenu";

const FilterInfo = dynamic(() =>
    import('widgets/filter-info/FilterInfo').then((mod) => mod.FilterInfo)
)

const RussianMap = dynamic(() =>
    import('widgets/russian-map/RussianMap').then((mod) => mod.RussianMap)
)

const MainPage: NextPageWithLayout = () => {
  return (
      <div className='flex-col pt-32 pb-16 bg-blue-500'>
        <h1 className='text-[55px] mb-12 text-white text-center font-semibold uppercase'>Карта представителей</h1>
        <div className='container mx-auto h-[50px]'>
          <div className='flex justify-between relative'>
            <InteractiveMenu />
            <div className='flex-col text-white absolute right-0'>
              <h2 className='text-3xl mb-7 font-medium'>Уровни продаж в регионах:</h2>
              <ul>
                <li className='flex items-center'>
                  <div className='h-4 w-4 mr-2.5 rounded-full bg-sells-high' />
                  <span>Высокий уровень продаж</span>
                </li>
                <li className='flex items-center'>
                  <div className='h-4 w-4 mr-2.5 rounded-full bg-sells-middle' />
                  <span>Средний уровень продаж</span>
                </li>
                <li className='flex items-center'>
                  <div className='h-4 w-4 mr-2.5 rounded-full bg-sells-low' />
                  <span>Низкий уровень продаж</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <RussianMap
            className='
            max-h-[900px]
            fill-sells-low
            stroke-white
            stroke-1
            mb-16
            hover:[&>path]:opacity-90
            hover:[&>path]:cursor-pointer
            [&>[id=RU-KYA]]:fill-sells-high'
        />
        <div className='container mx-auto'>
          <FilterInfo />
        </div>
      </div>
  );
};

MainPage.getLayout = (page) => {
  return (
      <MainLayout>
        {page}
      </MainLayout>
  )
}

export default MainPage
