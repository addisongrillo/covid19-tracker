import React, { useState, useEffect } from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
import Stats from './Stats'

import axios from 'axios';
import './World.css'





function World() {
    const [world, setWorld] = useState(null);
    //const [worldHistory, setWorldHistory] = useState(null);
    const [worldCases, setWorldCases] = useState([]);
    const [worldNewCases, setWorldNewCases] = useState([]);
    const [worldDeaths, setWorldDeaths] = useState([]);
    const [worldNewDeaths, setWorldNewDeaths] = useState([]);
    const getWorldStats = async () => {
        //changeLoading(true);
        await axios(
            `https://disease.sh/v3/covid-19/all`
        ).then((res => {
            setWorld(res.data);
            //changeLoading(false)
        })

        ).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            //changeLoading(false)
        })
    };

    const getWorldHistory = async () => {
        //changeLoading(true);
        await axios(
            `https://disease.sh/v3/covid-19/historical/all?lastdays=50000`
        ).then((res => {
            //setWorldHistory(res.data);

            let precases = [];
            let preNewCases = [];
            for (var key in res.data.cases) {
                if (res.data.cases.hasOwnProperty(key)) {
                    precases.push({ "day": key, "cases": res.data.cases[key] })
                }
            }
            setWorldCases(precases);
            precases.map((day, index) => {
                index === 0 ? preNewCases.push({ "day": day.day, "cases": day.cases }) :
                    preNewCases.push({ "day": day.day, "cases": (day.cases - (precases[index - 1].cases)) })
            })
            setWorldNewCases(preNewCases)

            let preDeaths = [];
            let preNewDeaths = [];
            for (var key in res.data.deaths) {
                if (res.data.deaths.hasOwnProperty(key)) {
                    preDeaths.push({ "day": key, "deaths": res.data.deaths[key] })
                }
            }
            setWorldDeaths(preDeaths);
            preDeaths.map((day, index) => {
                index === 0 ? preNewDeaths.push({ "day": day.day, "deaths": day.deaths }) :
                    preNewDeaths.push({ "day": day.day, "deaths": (day.deaths - (preDeaths[index - 1].deaths)) })
            })
            setWorldNewDeaths(preNewDeaths)
            //changeLoading(false)
        })

        ).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            //changeLoading(false)
        })
    };

    useEffect(() => {
        getWorldStats();
        getWorldHistory();
    }, []);
    return (
        <>
            <div id='WorldContainer'>
                <h1>World</h1>
                {world != null &&
                    <Stats stats={world} />
                }

                {
                    worldCases.length > 0 &&
                    <div>
                        <h1>Total Cases</h1>
                        <Chart height={400} autoFit data={worldCases} interactions={['active-region']}  >
                            <Interval position="day*cases" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                {
                    worldNewCases.length > 0 &&
                    <div>
                        <h1>New Cases</h1>
                        <Chart height={400} autoFit data={worldNewCases} interactions={['active-region']}  >
                            <Interval position="day*cases" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                {
                    worldDeaths.length > 0 &&
                    <div>
                        <h1>Total Deaths</h1>
                        <Chart height={400} autoFit data={worldDeaths} interactions={['active-region']}  >
                            <Interval position="day*deaths" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                {
                    worldNewDeaths.length > 0 &&
                    <div>
                        <h1>New Deaths</h1>
                        <Chart height={400} autoFit data={worldNewDeaths} interactions={['active-region']}  >
                            <Interval position="day*deaths" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
            </div>
        </>
    );
}

export default World;



