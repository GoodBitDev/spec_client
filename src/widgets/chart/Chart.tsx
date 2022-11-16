import React from "react";
import { Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Янв. - Фев.",
    uv: 4000,
    buy: 130000,
    sell: 150000,
  },
  {
    name: "Март - Апр.",
    uv: 3000,
    buy: 100000,
    sell: 110000,
  },
  {
    name: "Май - Июнь",
    uv: 2000,
    buy: 95000,
    sell: 105000,
  },
  {
    name: "Июль - Авг.",
    uv: 2780,
    buy: 130000,
    sell: 150000,
  },
  {
    name: "Сен. - Окт.",
    uv: 1890,
    buy: 132000,
    sell: 147000,
  },
  {
    name: "Нояб. -Дек.",
    uv: 2390,
    buy: 180000,
    sell: 193200,
  },
];

interface Props {
  width?: number;
  minHeight?:number;
}

export const Chart = ({ width, minHeight }: Props) => {
  return (
    <div>
      <div>

      </div>
      <ResponsiveContainer width={width ?? 600} minHeight={minHeight ?? 500} height={"100%"}>
        <LineChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }} data={data}>
          <Line name="Продажи" type={"linear"} dot={false} dataKey={"sell"} strokeWidth={2} stroke="#2E86BE" />
          <Line name="Закупки" type={"linear"} dot={false} dataKey={"buy"} strokeWidth={2} stroke="#FCBC1B" />
          <XAxis dataKey="name" tickCount={6} interval={0} padding={{ left: 40, right: 40 }} stroke={"#000000"} style={{
            fontSize: "10px",
            color: "#000000",
          }} />
          <YAxis
            stroke={"#000000"}
            // padding={{bottom: 20}}
            // type="number"
            // domain={[0, 'dataMax']}
            unit={" ₽"}
            width={100}
            // height={500}
            tickCount={40}
            interval={1}
            // ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 160000, 170000, 200000]}
          >
            <Label className=" -translate-y-2 text-xl" value="Сумма ,₽" position={"top"} offset={0} />
          </YAxis>
          <Legend verticalAlign={"top"} align={"right"} stroke={"#000000"} iconSize={8} iconType={"circle"} />
          {/*<Legend verticalAlign={"bottom"} align={"center"} stroke={"#000000"} iconSize={8} iconType={"circle"} />*/}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


