import React,{useState,useEffect} from 'react'
import {fetchDailyData} from '../../api'
import {Line,Bar,Pie, Doughnut} from 'react-chartjs-2'
import styles from './Chart.module.css'


const Chart = ({data:{confirmed,recovered,deaths},country})=> {
    let [dailyData, setDailyData] = useState([]);

    useEffect(()=> {
        const fetchApi = async ()=> {
            setDailyData(await fetchDailyData());
        }
        fetchApi();
        
    },[]);

    const lineChart = (
        dailyData.length ? (
        <Line
            data={{
                labels: dailyData.map(({date})=> date),
                datasets: [
                    
                    {
                        data: dailyData.map(({confirmed})=> confirmed),
                        label: 'Confirmed',
                        borderColor: '#3333ff',
                        fill: true
                    }
                    
                    ,
                    {
                        data: dailyData.map(({deaths})=> deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,.5)',
                        fill: true
                    }
                ]
            }} 
        />
        ) : 'Loading'
    );
    console.log(confirmed,deaths,recovered);

    const barChart = (
        confirmed ? (
            <Bar 
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)',
                        ],
                        
                    data: [confirmed.value,recovered.value,deaths.value]
                    }],
                }}
                options={{
                    legend: {display: false},

                    title: {display :true, text:`Current State in ${country}`}
                }}
            />
        ): null
    )
    const doughnut = (
        confirmed ? (
            <Doughnut 
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)',
                        ],
                        
                    data: [confirmed.value,recovered.value,deaths.value]
                    }],
                }}
                options={{
                    legend: {display: true },

                    title: {display :true, text:`Current State in ${country}`}
                }}
            />
        ): null
    )


    return (
        <div className={styles.container2}>
            {country? barChart : lineChart}
            {country? doughnut : null }
        </div>
    )
}
export default Chart;