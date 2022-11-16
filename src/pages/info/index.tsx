import React from "react";
import { DistributorPageHeader } from "widgets/distributor-page-header";
import { DistributorInfo } from "widgets/distributor-info";
import { Filter } from "shared/UI/filter/Filter";
import { Icon } from "shared/UI/icon/icon";
import dynamic from "next/dynamic";
import { onOpenCompareModal } from "widgets/compare-modal/store";
import { PdfIcon } from "../../../public/icons/pdf";
import { DocsIcon } from "../../../public/icons/docsIcon";
import { RegionFilter } from "features/region-filter/ui";

const Chart = dynamic(() =>
  import('widgets/chart/Chart').then((mod) => mod.Chart)
)
const CompareModal = dynamic(() =>
  import('widgets/compare-modal').then((mod) => mod.CompareModal)
)

const buttonList = [
  {
    title: "Неделя",
  },
  {
    title: "Месяц",
  },
  {
    title: "Год",
  },
];


const InfoPage = () => {
  return (
    <>
      <div className="container mx-auto bg-white pt-28 pb-40">
        <DistributorPageHeader />
        <div className="flex justify-between w-full">
          <section className="max-w-[640px] w-full mr-8">
            <h1 className="mb-20 font-medium text-3xs">Информация о дистрибьюторе</h1>
            <div>
              <RegionFilter />
            </div>
            <DistributorInfo />
          </section>
          <section className="max-w-[746px] w-full">
            <div className="flex items-center justify-between mb-20">
              <h1 className=" font-medium text-3xs">Статистика</h1>
              <div className='flex items-center'>
                <span className='text-xl font-normal mr-4'>Скачать:</span>
                <button className="h-13 w-13 center shadow-btn rounded-xs mr-4">
                  <PdfIcon />
                </button>
                <button className="h-13 w-13 center shadow-btn rounded-xs">
                  <DocsIcon />
                </button>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <ul className="flex">
                {buttonList.map((el, index) => (
                  <li key={index} className="mr-14">
                    <button className="btn h-13">
                      {el.title}
                    </button>
                  </li>
                ))}
              </ul>
              <Filter />
            </div>
            <Chart width={700} minHeight={600} />
            <button onClick={() => onOpenCompareModal()}>OPEN MODAL</button>
          </section>
        </div>
      </div>
      <CompareModal />
    </>
  );
};

export default InfoPage;
