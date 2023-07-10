async function getData() {
  const data = await fetch("https://worldtimeapi.org/api/ip");

  const ip = await data.json();
  const weather = await fetch(
    `https://worldtimeapi.org/api/ip/${ip.client_ip}`
  );
  const ipdata = await fetch(
    `https://ipinfo.io/${ip.client_ip}?token=${process.env.API_KEY}`
  );
  const ipinfo = await ipdata.json();
  const weatherData = await weather.json();

  return {
    ipinfo,
    weatherData,
  };
}

export default getData;
