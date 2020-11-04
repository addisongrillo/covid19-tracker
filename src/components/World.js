import React, { useState, useEffect } from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';
import axios from 'axios';
import './World.css'


function World() {
    const [world, setWorld] = useState(null);
    const [worldHistory, setWorldHistory] = useState(null);
    const [worldCases, setWorldCases] = useState([]);
    const [worldNewCases, setWorldNewCases] = useState([]);

    const getWorldStats = async () => {
        //changeLoading(true);
        await axios(
          `https://disease.sh/v3/covid-19/all`
        ).then((res =>{
            setWorld(res.data);
          
        //changeLoading(false)
        })
    
        ).catch( (error) =>{
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

    const getWorldHistory =  () => {
        //changeLoading(true);
         axios(
          `https://disease.sh/v3/covid-19/historical/all?lastdays=50000`
        ).then((res =>{
            setWorldHistory(res.data);
            let precases=[];
            let preNewCases=[];
            for (var key in res.data.cases) {
                if (res.data.cases.hasOwnProperty(key)) {
                    precases.push({"day":key, "cases":res.data.cases[key]})
                }
            }
            setWorldCases(precases);
            worldCases.map((day, index) =>{
            index==0 ? preNewCases.push({"day":day.day, "cases":day.cases}) : 
            preNewCases.push({"day":day.day, "cases":(day.cases-(worldCases[index-1].cases))}) 
            })
            setWorldNewCases(preNewCases)
        //changeLoading(false)
        })
    
        ).catch( (error) =>{
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
    const formatCharts = () =>{
        // for (var key in hist.cases) {
        //     if (hist.cases.hasOwnProperty(key)) {
        //         //console.log(key + " -> " + worldHistory.cases[key]);
        //         worldCases.push({"day":key, "cases":hist.cases[key]})
        //     }
        // }
        console.log("format")
        
        // worldCases.map((day, index) =>{
        //     index==0 ? worldNewCases.push({"day":day.day, "cases":day.cases}) : 
        //     worldNewCases.push({"day":day.day, "cases":(day.cases-(worldCases[index-1].cases))}) 
        // })
    }
    
      useEffect(() => {
        getWorldStats();
        getWorldHistory(); 
      }, []);
  return (
    <>
      <div id='WorldContainer'>
      <h1>World</h1>
        {world !=null&&
        <div>
            <h3>Cases: {world.cases}</h3>
            <h3>New Cases Today: {world.todayCases}</h3>
            <h3>Deaths: {world.deaths}</h3>
            <h3>New Deaths Today: {world.todayDeaths}</h3>
            <h3>Recovered: {world.Recovered}</h3>
            <h3>Active: {world.active}</h3>
        </div>
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
      </div>
    </>
  );
}

export default World;



