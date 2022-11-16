import React from "react";
import { Modal } from "shared/UI/modal/Modal";
import { useStore } from "effector-react";
import { $isCompareModalOpen, onCloseCompareModal } from "widgets/compare-modal/store";
import { Filter } from "shared/UI/filter/Filter";
import { Icon } from "shared/UI/icon/icon";
import { Autocomplete } from "shared/UI/autocomplete";
import { DateInput } from "shared/UI/date-input";

export const CompareModal = () => {
  const isOpen = useStore($isCompareModalOpen);

  return (
    <Modal isOpen={isOpen} onClose={onCloseCompareModal}>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between mb-7'>
          <h3 className='text-2xl whitespace-nowrap'>Сравнение дистрибьютеров:</h3>
          <div className='flex'>
            <Filter className='mr-7' />
            <div
              className='center h-[50px] min-w-[50px] rounded-[10px] cursor-pointer shadow shadow-icons'
              onClick={() => onCloseCompareModal()}
            >
              <Icon className={'h-[24px] w-[24px]'} name={'close'} section={'close'}/>
            </div>
          </div>
        </div>
        <div className='h-13 flex shadow-btn rounded-xs py-1 mb-7'>
          <Autocomplete />
          <div className='w-[1px] min-h-full bg-blue-scroll mx-1' />
          <Autocomplete />
        </div>
        <div className='flex justify-between items-center mb-11'>
          <div className='h-13 flex shadow-btn rounded-xs py-1'>
            <DateInput />
            <div className='w-[1px] min-h-full bg-blue-scroll mx-1' />
            <DateInput />
          </div>
          <button className='h-13 border border-blue-700 rounded-xs px-7 text-blue-700'>
            Сравнить
          </button>
        </div>
        <div className='grid grid-cols-2'>
          <div className='border-r border-r-blue-scroll grid grid-rows-2 gap-x-5'>
            <p className='flex items-center text-lg'>Сумма продаж: <span className='text-2.5xl ml-4'>200 000 ₽</span></p>
            <p className='flex items-center text-lg'>Сумма продаж: <span className='text-2.5xl ml-4'>200 000 ₽</span></p>
          </div>
          <div className='grid grid-rows-2 gap-y-5 pl-7'>
            <p className='flex items-center text-lg'>Сумма продаж: <span className='text-2.5xl ml-4'>200 000 ₽</span></p>
            <p className='flex items-center text-lg'>Сумма продаж: <span className='text-2.5xl ml-4'>200 000 ₽</span></p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
