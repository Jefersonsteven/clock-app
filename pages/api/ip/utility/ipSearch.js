import moment from "moment";

async function getData() {
  const data = await fetch("https://ipapi.co/json/");
  const ip = await data.json();
  const ipdata = await fetch(
    `https://ipinfo.io/${ip.ip}?token=${process.env.API_KEY}`
  );
  const ipinfo = await ipdata.json();
  const response = await fetch(
    `https://api.ipgeolocation.io/timezone?apiKey=${process.env.API_KEY_TIME}&tz=${ipinfo.timezone}`
  );
  const datetime = await response.json();

  const date = moment(datetime.date_time_ymd);
  const day_of_week = date.day();
  const day_of_year = date.dayOfYear();
  const week_number = date.week();

  return {
    ipinfo,
    weatherData: {
      day_of_week,
      day_of_year,
      week_number,
      timezone: datetime.timezone,
      datetime: datetime.date_time_ymd,
    },
  };
}

export default getData;
