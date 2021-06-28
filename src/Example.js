import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function Example() {
  const data = [
    { name: "Page A", uv: 400, pv: 1233, amt: 2400 },
    { name: "Page B", uv: 500, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 123, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 534, pv: 2400, amt: 2400 },
  ];
  const test_data = [
    { timestamp: 1624741800, avgHighPrice: 459085768, pv: 1233, amt: 2400 },
    { timestamp: 1624742100, avgHighPrice: 459500000, pv: 2400, amt: 2400 },
    { timestamp: 1624742400, avgHighPrice: 459400000 },
    { timestamp: 1624742700, avgHighPrice: 459180413 },
    { timestamp: 1624743000, avgHighPrice: 458930000 },
  ];
  const simple_data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const renderLineChart = (
    <div>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
  const render_test_line_chart = (
    <div>
      <LineChart
        width={600}
        height={300}
        data={test_data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
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
      <LineChart width={300} height={100} data={simple_data}>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );

  //return renderLineChart;
  return simple_line;
}
