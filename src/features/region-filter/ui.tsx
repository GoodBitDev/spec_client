import React, { Fragment, useState } from "react";
import { Select, SelectButton, SelectOption, SelectOptions } from "shared/UI/select";
import { Icon } from "shared/UI/icon/icon";
import { Transition } from "@headlessui/react";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

export const RegionFilter = () => {
  const [selected, setSelected] = useState<typeof people[0] | "">("");

  return (
    <Select value={selected} onChange={setSelected}>
      <div className="h-13 w-fit min-w-[334px] relative shadow-btn rounded-xs px-3.5 flex items-center mb-8">
        <SelectButton className="w-full flex justify-between items-center outline-none">
          <span className="block truncate text-start">{selected ? selected.name : "Регион"}</span>
          <Icon className={"h-[15px] w-[15px] rotate-90 inline"} name={"chevron"} section={"chevron"} />
        </SelectButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <SelectOptions
            className="absolute top-8 max-h-60 w-fit z-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {people.map((person, personIdx) => (
              <SelectOption
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        </span>
                    ) : null}
                  </>
                )}
              </SelectOption>
            ))}
          </SelectOptions>
        </Transition>
      </div>
    </Select>
  );
};
