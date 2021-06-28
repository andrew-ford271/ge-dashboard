import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MyChart } from "./MyChart";
import axios from "axios";
import { Banner } from "./banner";
import ReactDOM from "react-dom";
import { Example } from "./Example";
export default function App() {
  // state: {loading: boolean, data: {id: number, name: string} | null}
  const [value, setValue] = React.useState(null);

  return (
    <div>
      <Banner setValue={setValue} />
      <Example />
      <MyChart value={value} />
    </div>
  );
}
// export default class App extends React.Component {
//   render() {
//     return <Example />;
//   }
// }
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
