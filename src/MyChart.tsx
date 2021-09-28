import React, { PureComponent } from "react";
import axios from "axios";
import { ButtonGroup, Button, Typography } from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {
  pushData,
  getFormattedTime,
  getFormattedDate,
  toTitleCase,
} from "./util";
import "./App.css";
import { MyTabs } from "./MyTabs";

type TimeSeries = {
  data: {
    timestamp: number;
    avgHighPrice: number;
    avgLowPrice: number;
    highPriceVolume: number;
    lowPriceVolume: number;
  }[];
};
type Data = {
  timestamp: string;
  avgHighPrice: number;
  avgLowPrice: number;
  date: string;
};

type State = {
  data: Data[];
};
const transformData = (rawDataWrapper: TimeSeries) => {
  let data: Data;
  const rawData = rawDataWrapper.data;
  for (let i = 0; i < rawData.length; i += 12) {
    let time = getFormattedTime(rawData[i].timestamp);
  }
};
export function ItemChart({ item, time_interval, setTimeValue }) {
  if (!time_interval) {
    time_interval = "5m";
  }
  const [state, setState] = React.useState<State>({
    data: [] as Data[],
  });
  React.useEffect(() => {
    let data: Data[] = new Array();
    const getData = async () => {
      let x = await axios.get<TimeSeries>(
        `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${time_interval}&id=${item.id}`
      );
      const response = x.data;
      data = pushData(response);

      setState({ data: data });
    };
    getData();
  }, [item, time_interval]);
  const setMonth = () => {
    setTimeValue("6h");
  };
  const setWeek = () => {
    setTimeValue("1h");
  };
  const setDay = () => {
    setTimeValue("5m");
  };

  if (item) {
    const chart = (
      <div className="ChartBox">
        <div className="container">
          <Typography
            color="textSecondary"
            variant="h4"
            id="item_title"
          >{`${item.name}`}</Typography>
          <div id="button_tray">
            <MyTabs setMonth={setMonth} setWeek={setWeek} setDay={setDay} />
          </div>
        </div>
        <LineChart
          className="LineChart"
          width={1400}
          height={500}
          data={state.data}
          margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
        >
          <Line type="monotone" dataKey="avgHighPrice" stroke="#8884d8" />
          <Line type="monotone" dataKey="avgLowPrice" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey={`${time_interval == "5m" ? "timestamp" : "date"}`} />

          <YAxis
            domain={[
              (dataMin) => Math.floor(dataMin * 0.9),
              (dataMax) => Math.floor(dataMax * 1.1),
            ]}
            tickFormatter={(tick) => {
              return tick.toLocaleString();
            }}
          />
          <Tooltip
            formatter={(value) => new Intl.NumberFormat("en").format(value)}
          />
        </LineChart>
      </div>
    );
    return chart;
  } else {
    return <div />;
  }
}
