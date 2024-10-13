import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { BarChart, Bar } from "recharts";

export const Chart = ({data}) => {
  return (
    <div className="flex flex-col md:flex-row md:w-1/2justify-between w-full h-[530px] p-2">
      <ResponsiveContainer className="md:w-1/2 h-full">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 60,
          }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#42a5f5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#42a5f5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name">
            <Label value="Priority Levels" offset={-30} position="insideBottom" fill="#333" fontSize={22} />
          </XAxis>
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#42a5f5"
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer className="md:w-1/2 h-full mt-4 md:mt-0">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Priority Levels" offset={-30} position="insideBottom" fill="#333" fontSize={22} />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#42a5f5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
