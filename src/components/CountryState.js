import React, { useState, useEffect } from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Stats from './Stats'
import './CountryState.css'


import axios from 'axios';
//import './CountryState.css'





function CountryState(props) {
    const [CSChoice, setCSChoice] = useState("");
    const [CSChoiceOptions, setCSChoiceOptions] = useState([]);
    const [CountryState, setCountryState] = useState(null);
    const [CountryStateCases, setCountryStateCases] = useState([]);
    const [CountryStateNewCases, setCountryStateNewCases] = useState([]);
    const [CountryStateDeaths, setCountryStateDeaths] = useState([]);
    const [CountryStateNewDeaths, setCountryStateNewDeaths] = useState([]);

    const mobile = (window.innerWidth<=600);

    const changeLoading = (val) =>{
        props.setLoading(val);
    }
    
    const getCountryStateStats = async (val) => {
        changeLoading(true);
        let arg=""
        if(props.type === "Country"){
            arg="countries"
        }else{
            arg="states"
        }
        await axios(
            `https://disease.sh/v3/covid-19/${arg}/${val}`
        ).then((res => {
            setCountryState(res.data);
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
    const getCountryStateChoices = async () => {
        changeLoading(true)
        if(props.type === "Country"){
            await axios(
                `https://disease.sh/v3/covid-19/countries`
            ).then((res => {
                let choices=[]
                res.data.map((region) =>{
                    return choices.push(region.country)
                })
                setCSChoiceOptions(choices);
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
        }else{
            await axios(
                `https://disease.sh/v3/covid-19/states`
            ).then((res => {
                let choices=[]
                res.data.map((region) =>{
                    return choices.push(region.state)
                })
                choices.sort();
                setCSChoiceOptions(choices);
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
        }
    };

    const getCountryStateHistory = async (val) => {
        changeLoading(true);
        if(props.type === "Country"){
            await axios(
                `https://disease.sh/v3/covid-19/historical/${val}?lastdays=50000`
            ).then((res => {
                //setCountryStateHistory(res.data);
    
                let precases = [];
                let preNewCases = [];
                for (var key in res.data.timeline.cases) {
                    if (res.data.timeline.cases.hasOwnProperty(key)) {
                        precases.push({ "day": key, "cases": res.data.timeline.cases[key] })
                    }
                }
                setCountryStateCases(precases);
                precases.map((day, index) => {
                    return index === 0 ? preNewCases.push({ "day": day.day, "cases": day.cases }) :
                            preNewCases.push({ "day": day.day, "cases": (day.cases - (precases[index - 1].cases)) })
                })
                setCountryStateNewCases(preNewCases)
    
                let preDeaths = [];
                let preNewDeaths = [];
                for (var key2 in res.data.timeline.deaths) {
                    if (res.data.timeline.deaths.hasOwnProperty(key2)) {
                        preDeaths.push({ "day": key2, "deaths": res.data.timeline.deaths[key2] })
                    }
                }
                setCountryStateDeaths(preDeaths);
                preDeaths.map((day, index) => {
                        return index === 0 ? preNewDeaths.push({ "day": day.day, "deaths": day.deaths }) :
                        preNewDeaths.push({ "day": day.day, "deaths": (day.deaths - (preDeaths[index - 1].deaths)) })
                })
                setCountryStateNewDeaths(preNewDeaths)
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
        }else{
            await axios(
                `https://disease.sh/v3/covid-19/nyt/states/${val}?lastdays=50000`
            ).then((res => {
                //setCountryStateHistory(res.data);
                let precases = [];
                let preNewCases = [];
                res.data.map((day) => {
                    return precases.push({ "day": day.date, "cases": day.cases })
                })
                setCountryStateCases(precases);
                precases.map((day, index) => {
                    return index === 0 ? preNewCases.push({ "day": day.day, "cases": day.cases }) :
                           preNewCases.push({ "day": day.day, "cases": (day.cases - (precases[index - 1].cases)) })
                })
                setCountryStateNewCases(preNewCases)
                let preDeaths = [];
                let preNewDeaths = [];
                res.data.map((day) => {
                    return preDeaths.push({ "day": day.date, "deaths": day.deaths })
                })   
                setCountryStateDeaths(preDeaths);
                preDeaths.map((day, index) => {
                    return index === 0 ? preNewDeaths.push({ "day": day.day, "deaths": day.deaths }) :
                           preNewDeaths.push({ "day": day.day, "deaths": (day.deaths - (preDeaths[index - 1].deaths)) })
                })
                setCountryStateNewDeaths(preNewDeaths)
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
        }
        
    };
    const handleChange = (event) => {
        setCSChoice(event.target.value)
        getCountryStateStats(event.target.value)
        getCountryStateHistory(event.target.value)
    }
    useEffect(() => {
        getCountryStateChoices()
        setCountryState(null)
        setCountryStateCases([])
        setCountryStateNewCases([])
        setCountryStateDeaths([])
        setCountryStateNewDeaths([])
    }, [props.type]);
    return (
        <>
        <h1>{props.type}</h1>
            { CSChoiceOptions.length >0 &&
            <FormControl className="CSChoice">
                <InputLabel id="demo-simple-select-label">Select {props.type === "State" ? "State" : "Country"}</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="CSSelect"
                value={CSChoice}
                onChange={handleChange}
                >
                    {CSChoiceOptions.map((x) => (

                        <MenuItem key={x} value={x} >
                        {x}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
           
            }
            <div id='CountryStateContainer'>
                
                {CountryState != null &&
                    <Stats stats={CountryState} />
                }
                <div>
                {
                    CountryStateCases.length > 0 &&
                    <div>
                        <h1>Total Cases</h1>
                        <Chart className="charts" height={mobile == false ? 400: 200} autoFit="true" forceUpdate="true" data={CountryStateCases} interactions={['active-region']}  >
                            <Interval position="day*cases" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                {
                    CountryStateNewCases.length > 0 &&
                    <div>
                        <h1>New Cases</h1>
                        <Chart className="charts" height={mobile == false ? 400: 200} autoFit="true" forceUpdate="true" data={CountryStateNewCases} interactions={['active-region']}  >
                            <Interval position="day*cases" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                {
                    CountryStateDeaths.length > 0 &&
                    <div>
                        <h1>Total Deaths</h1>
                        <Chart className="charts" height={mobile == false ? 400: 200} autoFit="true" forceUpdate="true" data={CountryStateDeaths} interactions={['active-region']}  >
                            <Interval position="day*deaths" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                {
                    CountryStateNewDeaths.length > 0 &&
                    <div>
                        <h1>New Deaths</h1>
                        <Chart className="charts" height={mobile == false ? 400: 200} autoFit="true" forceUpdate="true" data={CountryStateNewDeaths} interactions={['active-region']}  >
                            <Interval position="day*deaths" />
                            <Tooltip shared />
                        </Chart>
                    </div>
                }
                </div>
            </div>
        </>
    );
}

export default CountryState;



