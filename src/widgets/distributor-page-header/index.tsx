import React, { FC } from "react";

const buttonList = [
  {
    title: "XpertHookah",
  },
  {
    title: "HOOKOFF",
  },
];

export const DistributorPageHeader: FC = () => {
  return (
    <div className="flex justify-between">
      <ul className="flex">
        {buttonList.map((el, index) => (
          <li key={index} className="mr-14 last:mr-0">
            <button className="btn h-15">
              {el.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="cursor-pointer hover:opacity-80 mb-20">
        <p className="text-2xs font-medium text-blue-700">Москва и МО</p>
      </div>
    </div>
  );
};

