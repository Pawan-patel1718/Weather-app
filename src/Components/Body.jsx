import React, { useState, useEffect } from "react";
import tempData from "../tempData";
import Swal from "/node_modules/sweetalert2/dist/sweetalert2.all.min.js";
import wind from "../Images/wind.png";
import realFeel from "../Images/download.png";
import humidity from "../Images/1574227.png";
import weather from "../Images/cloud.png";

export default function Body() {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState(tempData[0]);
  const [extra, setExtra] = useState("delhi");

  useEffect(() => {
    if (extra == "") {
    } else {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${extra}&APPID=978a888b59d549d8a3fb2f604fa68a60&units=metric`;
      const fetchApi = async () => {
        const Response = await fetch(url);
        const actualData = await Response.json();
        if (actualData.cod == 404 || actualData == "") {
          // alert(" ");
          Swal.fire({
            title: "City Not Found!",
            width: 500,
            padding: "1rem",
            color: "#fff",
            background: "#000 ",
          });
        } else {
          setData(actualData);
        }
        // console.log(actualData);
      };
      fetchApi();
    }
  }, [extra]);

  const first = (event) => {
    event.preventDefault();
    setInputText(event.target.value);
  };
  const ex = (event) => {
    event.preventDefault();
    setExtra(inputText);
  };

  let windSpeed = Math.round(data.wind.speed * 3.6);
  let temp = Math.round(data.main.temp);
  let feelLike = Math.round(data.main.feels_like);
  let currentDate = new Date();

  return (
    // <div className="main bg-center bg-contain h-screen w-full">
    //   <div className="temprature">
    //     <form className="" role="search">
    //       <input
    //         className="form-control me-2"
    //         onChange={first}
    //         type="search"
    //         placeholder="Search"
    //         aria-label="Search"
    //       />
    //       <button className="" onClick={ex}>
    //         Search
    //       </button>
    //     </form>
    // <div className="result">
    //   <h1 className="mx-3 ">{temp}°</h1>
    //   <h2>{data.name}</h2>
    // </div>
    //     {/* <h4>6/2/2022</h4> */}
    //   </div>
    // <div className="other">
    //   <div className="one">
    //     <div className="list mx-3">
    //       <h2>Wind Speed</h2>
    //
    //       <h2>Humidity</h2>
    //       <hr />
    //       <h2>Real feel</h2>
    //       <hr />
    //       <h2>Weather</h2>
    //       <hr />
    //     </div>
    //     <div className="value mx-3">
    //       <h2>{windSpeed} km/h</h2>
    //       <hr />
    //       <h2>{data.main.humidity}%</h2>
    //       <hr />
    //       <h2>{feelLike} °C</h2>
    //       <hr />
    //       <h2>{data.weather[0].main}</h2>
    //       <hr />
    //     </div>
    //     </div>
    //   </div>
    // </div>

    <>
      <div className="main  h-screen w-full bg-bottom grid items-center justify-center text-white">
        <div className="temprature px-5 py-7 rounded-xl lg:px-12 lg:py-9 lg:rounded-2xl bg-gray-800 bg-opacity-80 w-[21rem] lg:w-[35rem] ">
          <form className="text-center" role="search">
            <input
              className=" bg-slate-200 text-gray-900 px-2 py-1 mb-2 focus:outline-slate-700 lg:px-3 mr-4 w-40 lg:w-60 lg:py-2  rounded-lg "
              onChange={first}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              type="submit"
              onClick={ex}
              className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm lg:px-5 lg:py-2.5 lg:mr-2 lg:mb-2 py-[6px] px-3
               dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Search
            </button>
          </form>
          <div className="flex my-2 lg:gap-3 flex-col text-center justify-center lg:my-4 lg:mb-7 font-semibold">
            <h2 className=" text-lg lg:text-2xl ">{data.name}</h2>
            <h1 className="text-4xl lg:text-5xl ">{temp}°C</h1>
          </div>
          <div className=" font-semibold ">
            <div className="lg:flex grid gap-y-8 grid-cols-2 mt-3  lg:justify-between text-center">
              <div>
                <h2 className="lg:text-3xl text-xl text-slate-100">{windSpeed} km/h</h2>
                <img
                  src={wind}
                  className=" h-9 lg:h-14 lg:ml-4 ml-12  "
                  alt="not found"
                />
                <h2 className="text-gray-400 text-sm">Wind Speed</h2>
              </div>
              <div>
                <h2 className="lg:text-3xl text-xl text-slate-100">
                  {data.main.humidity}%
                </h2>
                <img
                  src={humidity}
                  className="h-8 lg:h-12  my-1 ml-14 lg:ml-4 "
                  alt=""
                />
                <h2 className="text-gray-400 text-sm">Humidity</h2>
              </div>
              <div>
                <h2 className="lg:text-3xl text-xl text-slate-100">{feelLike}°C</h2>
                <img
                  src={realFeel}
                  className=" h-9 lg:h-12 my-1 ml-14 lg:ml-4 "
                  alt=""
                />
                <h2 className="text-gray-400 text-sm">Real feel</h2>
              </div>
              <div>
                <h2 className="lg:text-3xl text-xl text-slate-100">
                  {data.weather[0].main}
                </h2>
                <img
                  src={weather}
                  className=" h-9 lg:h-12  lg:my-1 ml-14 lg:ml-4"
                  alt=""
                />
                <h2 className="text-gray-400 text-sm mt-1">Weather</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
