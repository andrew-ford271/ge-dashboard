import React, { PureComponent } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getFormattedTime } from './util';
export function MyChart({ value }) {
  const [state, setState] = React.useState({
    label: 'Series 1',
    data: [] as any[],
  });
  React.useEffect(() => {
    let data = new Array();
    const getData = async () => {
      const time_interval = "6h";
      let response = await axios.get(
        `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${time_interval}&id=${value}`
      );
      response = response.data;
      for (let i = 0; i < response.data.length; i += 12) {
        let time = getFormattedTime(response.data[i].timestamp);
        console.log(time);
        data.push({
          timestamp: time,
          avgHighPrice: response.data[i].avgHighPrice,
          avgLowPrice: response.data[i].avgLowPrice,
        });
      }

      setState((prevState) => ({ ...prevState, data: data }));
    };
    getData();
  }, [value]);

  if (value) {
    const reg_line = (
      <div>
        <LineChart
          width={600}
          height={300}
          data={state.data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="avgHighPrice" stroke="#8884d8" />
          <Line type="monotone" dataKey="avgLowPrice" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="timestamp" />
          <YAxis
            domain={[
              (dataMin) => 0 - Math.floor(dataMax + dataMax * 0.1),
              (dataMax) => Math.floor(dataMax + dataMax * 0.1),
            ]}
          />
          <Tooltip />
        </LineChart>
      </div>
    );
    return reg_line;
  } else {
    return <div></div>;
  }
}
