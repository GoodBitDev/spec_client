import React, { forwardRef } from "react";
import { Icon } from "shared/UI/icon/icon";

interface Props {
  className?: string;
}

type Ref = HTMLInputElement;

export const DateInput = forwardRef<Ref, Props>(function DateInput(props, ref) {
  return (
    <label className='flex relative' htmlFor='date'>
      <input
        id='date'
        className='outline-none font-light text-lg px-7 bg-transparent z-10 [&::-webkit-calendar-picker-indicator]:bg-none [&::-webkit-calendar-picker-indicator]:appearance-none'
        type={'date'}
        ref={ref}
      />
      <Icon className={'w-[24px] h-[24px] rotate-90 absolute right-7 top-1/2 -translate-y-1/2'} name={'chevron'} section={'chevron'} />
    </label>
  )
})