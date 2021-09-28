import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./App.css";

export function MyTabs({ setMonth, setWeek, setDay }) {
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper square className="ButtonGroup">
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab onClick={setMonth} label="Month" />
        <Tab onClick={setWeek} label="Week" />
        <Tab onClick={setDay} label="Day" />
      </Tabs>
    </Paper>
  );
}
