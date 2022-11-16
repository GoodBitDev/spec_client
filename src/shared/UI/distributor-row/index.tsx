import React, { FC } from "react";
import { Separator } from "shared/UI/separator";
import clsx from "clsx";

interface DistributorRowProps {
  textLeft: string;
  textRight: string;
  classNameLeftText?: string;
  classNameRightText?: string;
}

export const DistributorRow: FC<DistributorRowProps> = (
  {
    classNameRightText,
    classNameLeftText,
    textRight,
    textLeft,
  }) => {
  return (
    <li className="flex w-full h-full rounded-xs border border-blue-700 py-2.5 px-7 mb-5 last:mb-0">
      <p className={clsx("flex items-center w-full text-start font-light text-lg", classNameLeftText)}>{textLeft}</p>
      <Separator className="w-[1px] bg-blue-scroll mx-7" decorative orientation={"vertical"} />
      <p className={clsx("w-full text-start text-xl", classNameRightText)}>{textRight}</p>
    </li>
  );
};
