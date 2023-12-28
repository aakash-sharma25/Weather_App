import React, { useEffect, useState } from "react";

const Temp = () => {
  const id = process.env.REACT_APP_API_ID;

  const [searchvalue, setsearchvalue] = useState("mumbai");
  const [icon, seticon] = useState("");
  const [temp, settemp] = useState("");
  const [condition, setcondition] = useState("");
  const [description, setdescription] = useState("");
  const [city, setcity] = useState("");
  const [pressure, setpressure] = useState("");
  const [humidity, sethumidity] = useState("");
  const [wind, setwind] = useState("");
  const [sunrise, setsunrise] = useState("");

  function convertTime(unixTime) {
    let dt = new Date(unixTime * 1000);
    let h = dt.getHours();
    let m = "0" + dt.getMinutes();
    let t = h + ":" + m.substr(-2);
    return t;
  }

  const getweatherinfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&appid=${YourApiId}&units=metric`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(id, "api id");

      console.log(data);

      seticon(data.weather[0].icon);
      settemp(data.main.temp);
      setcondition(data.weather[0].main);
      setdescription(data.weather[0].description);
      setcity(data.name + ", " + data.sys.country);
      setpressure(data.main.pressure);
      sethumidity(data.main.humidity);
      setwind(data.wind.speed);
      // setsunrise(Date({timeIntervalSince1970:data.sys.sunrise}).t)
      setsunrise(convertTime(data.sys.sunrise));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getweatherinfo();
  }, []);

  return (
    <div className="flex flex-col  items-center justify-center w-[100%] mt-20 ">
      <div className="flex m-[10px] gap-x-3">
        <input
          type="search"
          placeholder="search city"
          autoFocus
          id="search"
          onChange={(e) => setsearchvalue(e.target.value)}
          className="p-[8px] rounded-lg w-[200px]"
        ></input>
        <button
          type="button"
          onClick={getweatherinfo}
          className="text-white p-[8px] bg-gray-500 rounded-lg"
        >
          Search
        </button>
      </div>

      <div className="w-[70%] inner-box">
        <div className="bg-gray-500">
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt=""
            width={140}
            className="mx-auto"
          ></img>

          <div className=" bg-gray-500 p-3 m-5 flex items-center justify-center">
            <p className="text-3xl ">{new Date().toLocaleString()}</p>
          </div>

          <div className="flex  bg-black p-5 flex-wrap gap-x-[200px] gap-y-10 items-center justify-center">
            <div className="text-4xl p-[5px] text-white ">{temp}℃</div>
            <div className="text-white text-center ">
              <h1 className="text-3xl p-[5px] ">{condition}</h1>
              <span className="p-[3px] text-2xl ">{description}</span>
              <p className="text-2xl p-[3px] ">{city}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-white text-center p-5 bg-gray-700 flex-wrap gap-6">
          <div className="flex flex-col items-center justify-center ">
            <p>{sunrise}</p>
            <p>Sunrise</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p>{humidity}%</p>
            <p>Humidity</p>
          </div>

          <div className="flex flex-col items-center justify-center ">
            <p>{pressure}hPa</p>
            <p>Pressure</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p>{wind}</p>
            <p>Wind </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp;
