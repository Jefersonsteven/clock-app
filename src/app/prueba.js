async function getData() {
  try {
    const response = await fetch(
      "https://api.getgeoapi.com/v2/ip/check?api_key=ac564af3162451b0bab2ae40b3829123d1a92789"
    );
    const ip = await response.json();
    const ipdata = await fetch(
      `https://ipinfo.io/${ip.ip}?token=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const ipinfo = await ipdata.json();
    const weather = await fetch(
      `https://timezone.abstractapi.com/v1/current_time/?api_key=${process.env.NEXT_PUBLIC_API_KEY2}&location=${ipinfo.city}, ${ip.country.name}`
    );
    const weatherData = await weather.json();

    return {
      ipinfo,
      weatherData,
    };
  } catch (error) {
    console.error(error);
  }
}
