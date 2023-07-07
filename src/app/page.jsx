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
            date
              ? date.getHours() < 18 &&
                date.getHours() > 5 &&
                `ss:bg-[url(/assets/mobile/bg-image-daytime.jpg)] sm:bg-[url(/assets/tablet/bg-image-daytime.jpg)] lg:bg-[url(/assets/desktop/bg-image-daytime.jpg)] `
              : `ss:bg-[url(/assets/mobile/bg-image-nighttime.jpg)] sm:bg-[url(/assets/tablet/bg-image-nighttime.jpg)] lg:bg-[url(/assets/desktop/bg-image-nighttime.jpg)]`
          }`}
        >
          <div className=" absolute w-full h-full bg-black z-10 opacity-30"></div>
          <div className=" relative ss:px-8 ss:py-16 h-full z-20">
            <section className="h-full flex flex-col justify-between">
              <div className="flex w-full justify-between gap-2">
                <div className="flex flex-col gap-1 text-[15px] tracking-[3px]">
                  <p>{`"${quote.content}"`}</p>
                  <h4 className=" font-bold">{quote.author}</h4>
                </div>
                <Image
                  onClick={getQuote}
                  src="/assets/desktop/icon-refresh.svg"
                  alt="refresh"
                  width={20}
                  height={20}
                  className=" w-6 h-6 cursor-pointer hover:opacity-50 transition-opacity duration"
                />
              </div>

              <div className="flex flex-col gap-[54px]">
                <div className="flex flex-col gap-10">
                  <div className=" flex gap-8">
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
                      />
                    )}
                    <p className=" tracking-[4px]">
                      {date.getHours() > 5 &&
                        date.getHours() < 12 &&
                        "GOOD MORNING"}
                      {date.getHours() > 12 &&
                        date.getHours() < 18 &&
                        "GOOD AFTERNOON"}
                      {date.getHours() > 18 &&
                        date.getHours() < 5 &&
                        "GOOD EVENING"}
                    </p>
                  </div>
                  <div className="flex gap-3 items-end h-auto">
                    <h1 className=" ss:text-[100px] font-extrabold leading-[80px]">
                      {`${date.getHours()}:${`${
                        date.getMinutes().toString().length === 1 ? "0" : ""
                      }${date.getMinutes()}`}`}
                    </h1>
                    <p>BST</p>
                  </div>
                  <h2>
                    {`
                IN
                ${ipinfo.city}
                ,
                ${ipinfo.country}
              `}
                  </h2>
                </div>
                <div className=" rounded-full bg-white text-[#303030] w-[100px]">
                  <div className="flex gap-2 p-2 pl-6 justify-between">
                    <p className=" font-bold tracking-widest text-[12px] leading-[26px]">
                      {open === false ? "MORE" : "LESS"}
                    </p>
                    <div className=" w-12 h-12 bg-[#303030] rounded-full grid place-items-center cursor-pointer">
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

            <section className="absolute hidden">
              <ul>
                <li>
                  <h3>CURRENT TIMEZONE</h3> <p>{weather && weather.timezone}</p>
                </li>
                <li>
                  <h3>DAY OF THE YEAR</h3>
                  <p>{weather && weather.day_of_year}</p>
                </li>
                <li>
                  <h3>DAY OF THE WEEK</h3>
                  <p>{weather && weather.day_of_week}</p>
                </li>
                <li>
                  <h3>WEEK NUMBER</h3> <p>{weather && weather.week_number}</p>
                </li>
              </ul>
            </section>
          </div>
        </main>
      )}
    </>
  );
}
