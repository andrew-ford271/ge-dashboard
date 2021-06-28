import React from 'react';
import './App.css';
import { Banner } from './banner';
import { Example } from './Example';
import { MyChart } from './MyChart';

function App() {
  const [value, setValue] = React.useState(null);

  return (
    <div>
      <Banner setValue={setValue} />
      <Example />
      <MyChart value={value} />
    </div>
  );
}

export default App;
