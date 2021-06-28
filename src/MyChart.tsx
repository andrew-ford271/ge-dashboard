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
      let response = await axios.get(
        `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${value}`
      );
      response = response.data;
      console.log(response.data);
      for (let i = 0; i < response.data.length; i += 12) {
        let time = getFormattedTime(response.data[i].timestamp);
        console.log(time);
        data.push({
          timestamp: time,
          avgHighPrice: response.data[i].avgHighPrice,
        });
      }
      //data = data.filter(([_, y]) => y != null);
      // console.log(data);
      setState((prevState) => ({ ...prevState, data: data }));
    };
    getData();
  }, [value]);

  if (value) {
    console.log(state);
    const reg_line = (
      <div>
        <LineChart
          width={600}
          height={300}
          data={state.data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="avgHighPrice" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="timestamp" />
          <YAxis dataKey="avgHighPrice" />
          <Tooltip />
        </LineChart>
      </div>
    );
    const simple_line = (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={state.data}>
          <Line
            type="monotone"
            dataKey="avgHighPrice"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    );
    return reg_line;
  } else {
    return <div></div>;
  }
}
