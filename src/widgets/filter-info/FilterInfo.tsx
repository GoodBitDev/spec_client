import React from 'react';
import {Filter} from "shared/UI/filter/Filter";

const mockData = [
  {
    title: 'Янв. - Фев.',
    events: ['Мероприятий нет']
  },
  {
    title: 'Март - Апр.',
    events: ['Дегустация']
  },
  {
    title: 'Май - Июнь',
    events: ['Мастер класс']
  },
  {
    title: 'Июль - Авг.',
    events: ['Акции', 'Мастер класс']
  },
  {
    title: 'Сен. - Окт.',
    events: ['Дегустация', 'Акции']
  },
  {
    title: 'Нояб. -Дек.',
    events: ['Мероприятий нет']
  },
]

export const FilterInfo = () => {
  return (
      <div className='flex flex-col items-start bg-white w-full min-h-[225px]  rounded-[20px] p-5'>
        <div className='mb-9'>
          <Filter />
        </div>
        <ul className='flex w-full'>
          {mockData.map((el, index) => (
              <div key={index} className='flex flex-col w-full items-center border-r border-r-black last:border-r-0'>
                <span className='mb-5 text-base'>{el.title}</span>
                {el.events.map((event, index) => (
                    <p key={index} className='text-xl mb-2.5 last:mb-0'>{event}</p>
                ))}
              </div>
          ))}
        </ul>
      </div>
  );
};
