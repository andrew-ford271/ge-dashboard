import axios from "axios";
import React, { Component } from "react";

// export default class Example extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isPoop: true,
//       quote: "",
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.fetchQuote = this.fetchQuote.bind(this);
//   }
//   async fetchQuote() {
//     const response = await axios.get("https://api.kanye.rest/");
//     const quote = response.data.quote;
//     if (this.mounted) {
//       this.setState((prevState) => ({ ...prevState, quote: quote }));
//     }
//   }

//   handleClick() {
//     this.fetchQuote();
//   }
//   componentDidMount() {

//     this.mounted = true;
//     this.fetchQuote();
//   }
//   componentWillUnmount() {
//     this.mounted = false;
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <p>
//           Kanye says: "<em>{this.state.quote}</em>"
//         </p>
//         <button onClick={this.handleClick}>refresh quote</button>
//       </React.Fragment>
//     );
//   }
// }

export const Example = (props) => {
  const [state, setState] = React.useState({ quote: "" });

  let mounted = React.useRef(true);

  const fetchQuote = async () => {
    const response = await axios.get("https://api.kanye.rest/");
    const quote = response.data.quote;
    if (mounted.current) {
      setState((prevState) => ({ ...prevState, quote: quote }));
    }
  };
  const handleClick = () => {
    fetchQuote();
  };
  React.useEffect(() => {
    fetchQuote();
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <React.Fragment>
      <p>
        Kanye says: "<em>{state.quote}</em>"
      </p>
      <button onClick={handleClick}>refresh quote</button>
    </React.Fragment>
  );
};
