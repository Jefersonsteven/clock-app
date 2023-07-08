"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

async function getData() {
  const data = await fetch("http://worldtimeapi.org/api/ip");
  const ip = await data.json();
  const weather = await fetch(`http://worldtimeapi.org/api/ip/${ip.client_ip}`);
  const ipdata = await fetch(
    `http://ipinfo.io/${ip.client_ip}?token=4b8302d0ab73bd`
  );
  const ipinfo = await ipdata.json();
  const weatherData = await weather.json();

  return {
    ipinfo,
    weatherData,
  };
}

async function getDataQuote() {
  const quote = await fetch("https://api.quotable.io/random");
  const quoteData = await quote.json();
  return quoteData;
}

export default function Home() {
  const [date, setDate] = useState();
  const [weather, setWeather] = useState();
  const [ipinfo, setIpInfo] = useState();
  const [quote, setQuote] = useState();
  const [open, setOpen] = useState(false);

  async function getWeather() {
    const {
      weatherData,
      ipinfo: { country, city },
    } = await getData();
    const date = new Date(weatherData.datetime);
    setIpInfo({ country, city });
    setWeather(weatherData);
    setDate(date);
  }

  async function getQuote() {
    const { content, author } = await getDataQuote();
    setQuote({ content, author });
  }

  useEffect(() => {
    getQuote();
    getWeather();
  }, []);

  return (
    <>
      {quote && date && ipinfo && (
        <main
          className={` main text-white bg-cover h-full relative ${
            date.getHours() < 18 && date.getHours() > 5
              ? `ss:bg-[url(/assets/mobile/bg-image-daytime.jpg)] sm:bg-[url(/assets/tablet/bg-image-daytime.jpg)] xl:bg-[url(/assets/desktop/bg-image-daytime.jpg)] `
              : `ss:bg-[url(/assets/mobile/bg-image-nighttime.jpg)] sm:bg-[url(/assets/tablet/bg-image-nighttime.jpg)] xl:bg-[url(/assets/desktop/bg-image-nighttime.jpg)]`
          }`}
        >
          <div className=" absolute w-full h-full bg-black z-10 ss:opacity-30 sm:opacity-40"></div>
          <div className=" relative h-full z-20 flex flex-col justify-between">
            <section
              className={`h-full flex flex-col ${
                open ? "justify-end" : "justify-between"
              }  ss:px-8 ss:py-16 sm:px-24 sm:py-32 xl:px-60 xl:py-48`}
            >
              <div
                className={`flex ss:w-full sm:w-10/12 xl:w-2/4 justify-between ss:gap-2 sm:gap-3 ${
                  open && "hidden"
                }`}
              >
                <article className="flex flex-col ss:gap-1 sm:gap-3 ss:text-[15px] sm:text-[18px] tracking-[3px]">
                  <p>{`"${quote.content}"`}</p>
                  <cite className=" font-bold">{quote.author}</cite>
                </article>
                <Image
                  onClick={getQuote}
                  src="/assets/desktop/icon-refresh.svg"
                  alt="refresh"
                  width={20}
                  height={20}
                  className=" ss:w-6 ss:h-6 sm:w-7 sm:h-7 cursor-pointer hover:opacity-50 transition-opacity duration"
                />
              </div>

              <div className="flex flex-col ss:gap-[54px] sm:gap-[76px] xl:flex-row  xl:items-end xl:justify-between">
                <div className="flex flex-col ss:gap-10 sm:gap-20 xl:gap-30">
                  <div className=" flex gap-8 sm:text-[18px] xl:text-[20px]">
                    {date.getHours() > 5 && date.getHours() < 18 ? (
                      <Image
                        src="/assets/desktop/icon-sun.svg"
                        width={24}
                        height={24}
                        alt="sun"
                      />
                    ) : (
                      <Image
                        src="/assets/desktop/icon-moon.svg"
                        width={22}
                        height={24}
                        alt="moon"
                        className=" xl:w-[24px] xl:h-[26px]"
                      />
                    )}
                    <div className=" tracking-[4px] flex">
                      <p>
                        {date.getHours() > 5 &&
                          date.getHours() <= 12 &&
                          "GOOD MORNING"}
                        {date.getHours() > 12 &&
                          date.getHours() < 18 &&
                          "GOOD AFTERNOON"}
                        {(date.getHours() >= 18 || date.getHours() < 5) &&
                          "GOOD EVENING"}
                      </p>
                      <p className=" ss:hidden sm:inline">, IT’S CURRENTLY</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-end h-auto">
                    <h1 className=" ss:text-[100px] sm:text-[175px] xl:text-[200px] font-extrabold leading-[80px] xl:leading-[200px]">
                      {`${
                        date.getHours() < 10 ? "0" : ""
                      }${date.getHours()}:${`${
                        date.getMinutes() < 10 ? "0" : ""
                      }${date.getMinutes()}`}`}
                    </h1>
                    <p className="xl:text-[40px]">BST</p>
                  </div>
                  <h2 className=" uppercase font-bold ss:tracking-widest sm:tracking-[3px] sm:text-[18px] xl:text-[24px]">
                    {`IN ${ipinfo.city}, ${ipinfo.country}`}
                  </h2>
                </div>
                <div className=" rounded-full bg-white text-[#303030] ss:w-[100px] sm:w-[120px] xl:h-[56px] xl:w-[156px] xl:flex xl:">
                  <div className="flex gap-2 p-2 pl-6 justify-between xl:w-full xl:items-center xl:pl-8">
                    <p className=" font-bold tracking-widest ss:text-[12px] sm:text-[15px] ss:leading-[26px] sm:leading-[30px] xl:leading-[45px]">
                      {open === false ? "MORE" : "LESS"}
                    </p>
                    <div
                      onClick={() => setOpen((preventOpen) => !preventOpen)}
                      className=" ss:w-12 ss:h-12 sm:w-14 sm:h-14 bg-[#303030] rounded-full grid place-items-center cursor-pointer xl:w-16 xl:h-16"
                    >
                      {open === false ? (
                        <Image
                          src="/assets/desktop/icon-arrow-down.svg"
                          alt="arrow"
                          width={10}
                          height={5}
                        />
                      ) : (
                        <Image
                          src="/assets/desktop/icon-arrow-up.svg"
                          alt="arrow"
                          width={10}
                          height={5}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={`ss:px-10 ss:py-16 backdrop-blur-xl sm:py-32 ${
                !open && "hidden"
              } ${
                date.getHours() > 5 && date.getHours() < 18
                  ? "bg-[#ffffff87]"
                  : "bg-[#0000008c]"
              }`}
            >
              <ul className="flex ss:flex-col ss:gap-4 sm:flex-wrap sm:justify-center sm:items-center sm:gap-12 sm:max-h-[260px]">
                <li className=" flex w-full justify-between items-center sm:flex-col sm:w-[40%] sm:items-start">
                  <h3 className=" ss:text-base tracking-[4px] sm:text-[16px]">
                    CURRENT TIMEZONE
                  </h3>{" "}
                  <p className=" font-bold ss:text-[24px] sm:text-[40px]">
                    {weather && weather.timezone}
                  </p>
                </li>
                <li className=" flex w-full justify-between items-center sm:flex-col sm:w-[40%] sm:items-start">
                  <h3 className=" text-base tracking-[4px] sm:text-[16px]">
                    DAY OF THE YEAR
                  </h3>
                  <p className=" font-bold ss:text-[24px] sm:text-[40px]">
                    {weather && weather.day_of_year}
                  </p>
                </li>
                <li className=" flex w-full justify-between items-center sm:flex-col sm:w-[40%] sm:items-start">
                  <h3 className=" text-base tracking-[4px] sm:text-[16px]">
                    DAY OF THE WEEK
                  </h3>
                  <p className=" font-bold ss:text-[24px] sm:text-[40px]">
                    {weather && weather.day_of_week}
                  </p>
                </li>
                <li className=" flex w-full justify-between items-center sm:flex-col sm:w-[40%] sm:items-start">
                  <h3 className=" text-base tracking-[4px] sm:text-[16px]">
                    WEEK NUMBER
                  </h3>{" "}
                  <p className=" font-bold ss:text-[24px] sm:text-[40px]">
                    {weather && weather.week_number}
                  </p>
                </li>
              </ul>
            </section>
          </div>
        </main>
      )}
    </>
  );
}
