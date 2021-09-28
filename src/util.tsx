import { ma, dma, ema, sma, wma } from "moving-averages";
type Data = {
  timestamp: string;
  avgHighPrice: number;
  avgLowPrice: number;
  date: string;
};
export function getFormattedTime(unix_timestamp) {
  let date = new Date(unix_timestamp * 1000);
  let hours = date.getHours();
  let suffix = hours >= 12 ? "PM" : "AM";
  hours = ((hours + 11) % 12) + 1;
  let minutes = "0" + date.getMinutes();
  let formattedTime = hours + ":" + minutes.substr(-2) + " " + suffix;

  return formattedTime;
}

export function getFormattedDate(unix_timestamp) {
  let date = new Date(unix_timestamp * 1000);

  return date.toDateString();
}
export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function pushData(response) {
  const roll_delta = 10;
  let data: Data[] = new Array();
  let highArray = new Array();
  let lowArray = new Array();
  let timeArray = new Array();
  let dateArray = new Array();
  for (let i = 0; i < response.data.length; i += 5) {
    let time = getFormattedTime(response.data[i].timestamp);
    let date = getFormattedDate(response.data[i].timestamp);
    lowArray.push(response.data[i].avgLowPrice);
    highArray.push(response.data[i].avgHighPrice);
    timeArray.push(time);
    dateArray.push(date);
  }
  lowArray = ma(lowArray, roll_delta).map((x) => Math.round(x));
  highArray = ma(highArray, roll_delta).map((x) => Math.round(x));
  for (let i = roll_delta; i < timeArray.length; i += 1) {
    data.push({
      timestamp: timeArray[i],
      avgHighPrice: highArray[i],
      avgLowPrice: lowArray[i],
      date: dateArray[i],
    });
  }
  return data;
}
