async function getData() {
  const data = await fetch("https://ipapi.co/json/");

  const ip = await data.json();
  const weather = await fetch(`https://worldtimeapi.org/api/ip/${ip.ip}`);
  const ipdata = await fetch(
    `https://ipinfo.io/${ip.ip}?token=${process.env.API_KEY}`
  );
  const ipinfo = await ipdata.json();
  const weatherData = await weather.json();

  return {
    ipinfo,
    weatherData,
  };
}

export default getData;
