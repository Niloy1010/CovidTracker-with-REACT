import React,{useState,useEffect} from 'react';
import {Map, TileLayer, Marker, Tooltip,Circle,Popup} from 'react-leaflet'

import {fetchNumbers, fetchCountries} from '../../api'

const CircleDraw = (caseType="cases") => {

    const caseTypeColors= {
    cases: {
        hex: '#CC1034',
        multiplier: 800,
    },
    recovered: {
        hex: '#7dd71d',
        multiplier: 1200,
    },
    deaths: {
        hex: '#fb4443',
        multiplier: 2000,
    }
}
    const [fetchedCountries, setFetchedCountries] = useState([]);
    useEffect(()=> {
        const fetchApi = async () => {
            setFetchedCountries(await fetchNumbers());

        }
        fetchApi();
    },[])

    if(fetchedCountries) {
        let arr = fetchedCountries;
        console.log(arr);
        let lat = arr.map(({ lat }) => lat)
        let lng = arr.map(({ lng }) => lng)
        let confirmed = arr.map(({ confirmed }) => confirmed)
        let deaths = arr.map(({ deaths }) => deaths)
        console.log(lng);
        return(
           <Popup>HI</Popup>
            
        
        )
    }
    else{
        return "Bye"
    }
}

export default CircleDraw;