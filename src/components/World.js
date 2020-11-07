import React, { useState, useEffect } from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
import Stats from './Stats'

import axios from 'axios';
import './World.css'





function World(props) {
    const [world, setWorld] = useState(null);
    const [worldCases, setWorldCases] = useState([]);
    const [worldNewCases, setWorldNewCases] = useState([]);
    const [worldDeaths, setWorldDeaths] = useState([]);
    const [worldNewDeaths, setWorldNewDeaths] = useState([]);

    const mobile = (window.innerWidth<=600);

    const changeLoading = (val) =>{
        props.setLoading(val);
    }
    
    const getWorldStats = async () => {
        changeLoading(true);
        await axios(
            `https://disease.sh/v3/covid-19/all`
        ).then((res => {
            setWorld(res.data);
            changeLoading(false)
        })

        ).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            changeLoading(false)
        })
    };

    const getWorldHistory = async () => {
        changeLoading(true);
        await axios(
            `https://disease.sh/v3/covid-19/historical/all?lastdays=50000`
        ).then((res => {

            let precases = [];
            let preNewCases = [];
            for (var key in res.data.cases) {
                if (res.data.cases.hasOwnProperty(key)) {
                    precases.push({ "day": key, "cases": res.data.cases[key] })
                }
            }
            setWorldCases(precases);
            precases.map((day, index) => {
                return index === 0 ? preNewCases.push({ "day": day.day, "cases": day.cases }) :
                    preNewCases.push({ "day": day.day, "cases": (day.cases - (precases[index - 1].cases)) })
            })
            setWorldNewCases(preNewCases)

            let preDeaths = [];
            let preNewDeaths = [];
            for (var key2 in res.data.deaths) {
                if (res.data.deaths.hasOwnProperty(key2)) {
                    preDeaths.push({ "day": key2, "deaths": res.data.deaths[key2] })
                }
            }
            setWorldDeaths(preDeaths);
            preDeaths.map((day, index) => {
                return index === 0 ? preNewDeaths.push({ "day": day.day, "deaths": day.deaths }) :
                    preNewDeaths.push({ "day": day.day, "deaths": (day.deaths - (preDeaths[index - 1].deaths)) })
            })
            setWorldNewDeaths(preNewDeaths)
            changeLoading(false)
        })

        ).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            changeLoading(false)
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
                        <Chart height={mobile == false ? 400: 200} autoFit="true" data={worldCases} interactions={['active-region']}  >
                            <Interval position="day*cases" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                {
                    worldNewCases.length > 0 &&
                    <div>
                        <h1>New Cases</h1>
                        <Chart height={mobile == false ? 400: 200} autoFit="true" data={worldNewCases} interactions={['active-region']}  >
                            <Interval position="day*cases" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                {
                    worldDeaths.length > 0 &&
                    <div>
                        <h1>Total Deaths</h1>
                        <Chart height={mobile == false ? 400: 200} autoFit="true" data={worldDeaths} interactions={['active-region']}  >
                            <Interval position="day*deaths" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                {
                    worldNewDeaths.length > 0 &&
                    <div>
                        <h1>New Deaths</h1>
                        <Chart height={mobile == false ? 400: 200} autoFit="true" data={worldNewDeaths} interactions={['active-region']}  >
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



