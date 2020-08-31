import axios from 'axios';
import React from 'react'

import {Map, TileLayer, Marker, Tooltip,Circle,Popup} from 'react-leaflet'
const url = "https://covid19.mathdro.id/api";
const caseTypeColors= {
    confirmed: {
        hex: '#3c3cda',
        multiplier: 2000,
    },
    recovered: {
        hex: '#7dd71d',
        multiplier: 1800,
    },
    deaths: {
        hex: '#fb4443',
        multiplier: 3000,
    }
}
export const fetchData = async (country) => {
    let changeAbleUrl = url;

    if(country) {
        changeAbleUrl = `${url}/countries/${country}`;
    }
    try{
        const {data: {confirmed,recovered,deaths,lastUpdate}} = await axios.get(changeAbleUrl);
        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }
        return modifiedData;
    }
    catch(error) {
            console.log(error);
    }
}

export const fetchDailyData = async()=> {
    try{
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailydata)=> ({
            confirmed: dailydata.confirmed.total,
            deaths: dailydata.deaths.total,
            date: dailydata.reportDate
        }))
        console.log(modifiedData);
        return modifiedData;
    }
    catch(err) {
        console.log(err);
    }
}

export const fetchCountries = async() => {
    try{
        const {data : {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country)=> country.name);

    }
    catch(error) {

    }
}

export const fetchNumbers = async()=> {
    try{
        let arr = [];
        const {data } = await axios.get(`${url}/confirmed`)
        const modifiedData = data.map((dailydata)=> ({
            confirmed: dailydata.confirmed,
            deaths: dailydata.deaths,
            recovered: dailydata.recovered,
            lat: dailydata.lat,
            lng:    dailydata.long,
            countryRegion: dailydata.countryRegion
        }))

        return modifiedData;
    }
    catch(err) {

    }
}

export const showDataOnMap = (values,getNumberValues)=> {

   console.log("IN");
console.log(getNumberValues);
    return(
        values.map(country=> (
                
                <Circle
                
                center={[country.lat?country.lat:"1",country.lng?country.lng:"1"]}
                fillOpacity={.4}
                color={caseTypeColors[`${getNumberValues}`].hex}
                fillColor={caseTypeColors[`${getNumberValues}`].hex}
                radius={
                   Math.sqrt(country[`${getNumberValues}`] * caseTypeColors[`${getNumberValues}`].multiplier)
                   
                   
                }
                >
                    <Popup>
                   {getNumberValues} : {country[`${getNumberValues}`]}
                    </Popup>
                </Circle>




            ))
            )
        
}