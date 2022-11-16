import React from "react";
import { Icon } from "shared/UI/icon/icon";

export const MainLayoutHeader = () => {
  return (
    <header className="flex h-24 bg-blue-700 shadow-header">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-full">
          <div className="flex grow w-2/5 justify-between items-center">
            <Icon className={"h-[14px] w-[31px] cursor-pointer hover:opacity-80"} name={"menu"} section={"menu"} />
            <div className="flex-col justify-center text-center text-white font-medium">
              <p className="cursor-pointer hover:opacity-80">8 911 920 55 87</p>
              <p className="cursor-pointer hover:opacity-80">manager@spectrrum-tbc.ru</p>
            </div>
            <div className="text-white font-medium">
              <span className="mr-2 cursor-pointer hover:opacity-80 text-yellow-200">РУС</span>
              <span className="cursor-pointer hover:opacity-80">ENG</span>
            </div>
          </div>
          <div className="h-full z-10 mx-[130px]">
            <Icon className={"w-[344px] h-[159px] z-10"} name={"logo"} section={"logo"} />
          </div>
          <div className="flex grow w-2/5 justify-around items-center">
            <Icon className={"h-[31px] w-[31px] stroke-white cursor-pointer hover:opacity-80"} name={"search"}
                  section={"search"} />
            <Icon className={"h-[31px] w-[31px] cursor-pointer hover:opacity-80"} name={"profile"}
                  section={"profile"} />
            <Icon className={"h-[31px] w-[31px] cursor-pointer hover:opacity-80"} name={"cart"} section={"cart"} />
          </div>
        </div>
      </div>
    </header>
  );
};
