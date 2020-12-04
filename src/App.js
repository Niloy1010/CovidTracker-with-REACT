import React, { Component } from 'react';



import { Cards, Chart, CountryPicker,WorldMap,Headers, Doughnut } from './Components'
import {fetchData, fetchCountries} from './api'

import "leaflet/dist/leaflet.css"

import styles from './App.module.css'
class App extends Component {

    state = {
        data:{},
        country: '',
        mapCenter:{},
        mapZoom: 0,
        mapSelected:true,
        inputValue:'See Line Graph'
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        console.log(fetchedData);

        this.setState({
            data: fetchedData,
            mapCenter: {
                lat: 32.80746,
                lng: -96.4796
            },
            mapZoom: 3
        })
        console.log(this.state.mapCenter);
    }

    handleCountryChange= async (country) => {
        const fetchedData = await fetchData(country);
        console.log(country);
        console.log(fetchedData);

        this.setState({
            data: fetchedData,
            country: country
        })
    }

    mapGraph =()=> {
        this.setState({
            mapSelected: true
        })
        console.log(this.state.mapSelected);
    }
    lineGraph = ()=> {
        this.setState({
            mapSelected: !this.state.mapSelected
        })
        if(this.state.mapSelected) {
            this.setState({
                inputValue: "See World Map"
            })
        }
        else{
            this.setState({
                inputValue: "See Line Graph"
            })
        }
        console.log(this.state.mapSelected);
    }
    render() {
        
        
        const {data,country,mapCenter,mapZoom} = this.state;

        return(
            this.state.mapSelected ? 
            
            <div className={styles.container}>
                
            <Headers></Headers>
                <Cards data={data} ></Cards>
                <CountryPicker handleCountryChange={this.handleCountryChange}></CountryPicker>
                <div>
                <input  onClick={this.lineGraph} className={styles.changeBtn} type="button" value={this.state.inputValue}/>
                </div>
                <WorldMap center={{lat: 34.80746,
                lng: -40.4796}} zoom={4}></WorldMap>
              
            </div>
            :
            <div className={styles.container}>
                
            <Headers></Headers>
            <Cards data={data} ></Cards>
            <CountryPicker handleCountryChange={this.handleCountryChange}></CountryPicker>
            <div>
            <input  onClick={this.lineGraph} className={styles.changeBtn} type="button" value={this.state.inputValue}/>
            </div>
            <Chart data={data} country={country}></Chart>
          
        </div>
        )
    }
}
export default App;
