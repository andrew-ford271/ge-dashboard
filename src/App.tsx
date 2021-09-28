import React from "react";
import "./App.css";
import { Banner } from "./banner";
import { Example } from "./Example";
import { ItemChart } from "./MyChart";
import { ItemTable } from "./ItemTable";
type Item = {
  id: number;
  name: string;
};
function App() {
  const [item, setItem] = React.useState<Item | null>({
    name: "Cannonball",
    id: 2,
  });
  const [time_value, setTimeValue] = React.useState<string | null>(null);

  return (
    <div>
      <Banner setValue={setItem} />
      <Example />
      <ItemChart
        item={item}
        time_interval={time_value}
        setTimeValue={setTimeValue}
      />
      <ItemTable />
    </div>
  );
}

export default App;
