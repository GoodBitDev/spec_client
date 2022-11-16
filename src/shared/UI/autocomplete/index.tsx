import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Icon } from "shared/UI/icon/icon";

const data = [
  { id: 1, name: "XpertHookah" },
  { id: 2, name: "HOOKOF" },
];

export const Autocomplete = () => {
  const [selected, setSelected] = useState(data[0]);
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? data
      : data.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, "")),
      );

  return (
    <div className='relative flex'>
      <Combobox  value={selected} onChange={setSelected}>
        <div
          className="relative w-full px-7 cursor-default flex overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="font-light text-lg outline-none"
            displayValue={(item: {id: number; name: string}) => item.name}
            // displayValue={(item) => item.name}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button>
            <Icon className={"w-[24px] h-[24px] rotate-90"} name={"chevron"} section={"chevron"} />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options
            className="absolute mt-1 max-h-60 w-fit -bottom-24 z-20 left-0 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {filteredItems.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredItems.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-blue-700" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.name}
                        </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
};
