import './App.css';
import {useState} from 'react';

const api = {
	key: "0156492192258bb36ce55f6a1d9c9d7b",
	base: "https://api.openweathermap.org/data/2.5/"
}

const App = () => {
    const [param,setParam] = useState("Seoul");
    const [weather,setSeather] = useState(null);
    const [weatherBack,setWeatherBack] = useState("contents cold");
    const search = e => {
        if(e.key === "Enter")
        {
            fetch(`${api.base}weather?q=${param}&units=metric&APPID=${api.key}`)
            .then(response => response.json())
            .then(json => {
                if(json.cod === "400")
                {
                    alert("Please write city")
                }
                if(json.cod === "404")
                {
                    alert("Not found city")
                }
                if(json.cod === 200)
                {
                    setSeather(json)
                    if(json.main.temp > 16) {
                        setWeatherBack("contents warm")
                    }
                    else
                    {
                        setWeatherBack("contents cold")
                    }
                }
            })
        }
    }

    const setDate = (t) => {
        let months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
        let weeks = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

        let week = weeks[t.getDay()];
        let day = t.getDate()+"일";
        let month = months[t.getMonth()];
        let year = t.getFullYear()+"년";

        return `${year} ${month} ${day} ${week}`;
    }

    return (
        <div className="App">
            <div className={weatherBack}>
                <div className="main">
                    <input 
                    onChange={e => setParam(e.target.value)}
                    value={param}
                    onKeyPress={search}
                    className="search-text"
                    type="text"/>
                    {
                        weather != null && 
                        <div className="weather-form">
                            <div className="weather country">{weather.name} {weather.sys.country}</div>
                            <div className="weather date">{setDate(new Date)}</div>
                            <p className="weather temperature">{Math.floor(weather.main.temp)}ºC</p>
                            <p className="weather">{weather.weather[0].main}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
