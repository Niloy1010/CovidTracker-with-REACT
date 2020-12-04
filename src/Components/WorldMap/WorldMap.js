import React,{useState,useEffect} from 'react'
import styles from './WorldMap.css'
import {Map as LeafletMap, TileLayer} from 'react-leaflet';
import CircleDraw from '../Circles/CircleDraw'
import {showDataOnMap,fetchNumbers, fetchCountries} from '../../api'
import { Button } from '@material-ui/core';
const WorldMap = ({center,zoom}) =>{


    const [fetchedCountries, setFetchedCountries] = useState([]);
    let [numberValue, setNumberValue] = useState('confirmed');

    useEffect(()=> {
        const fetchApi = async () => {
            setFetchedCountries(await fetchNumbers());

        }
        fetchApi();
        
        setNumberValue = "confirmed";
    },[setFetchedCountries])
    if(fetchedCountries){
        console.log(fetchedCountries);
    }

    let changeNumberValue =(value)=> {
        console.log(value);
        setNumberValue(value);
        console.log(numberValue);
    }

    return(
        fetchedCountries ?
        <div className="map">
            
            <input onClick={e=> changeNumberValue(e.target.value)} className="mapBtn cnfrm" type="button" value="confirmed" />
            <input onClick={e=> changeNumberValue(e.target.value)}  className="mapBtn dth" type="button" value="deaths" />
            <input onClick={e=> changeNumberValue(e.target.value)}  className="mapBtn recov" type="button" value="recovered" />
        <LeafletMap center={center} zoom={zoom}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors">


            </TileLayer>

            { showDataOnMap(fetchedCountries,numberValue) }
        </LeafletMap>
        </div> : null
    )
}
export default WorldMap;