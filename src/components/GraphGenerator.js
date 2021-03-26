import React, {useEffect} from 'react'
import {Line} from 'react-chartjs-2';

function GraphGenerator({graphData}) {

	useEffect(() => {
		console.log('graphData: ', graphData);
	}, []);

	const data = {datasets: [getHRData(graphData)]};

	const options = {
		responsive: true,
		aspectRatio: 2,
		title: {
			display: false,
			text: 'Heart Rate'
		},
		legend: {
			display: true,
			position: 'top',
			labels: {
				usePointStyle: true,
			},
		},
		tooltips: {
      mode: 'index',
			intersect: false
    },
		plugins: {
      datalabels: {
        display: false
			},
		},
		elements: {
      line: {
        tension: .25
			},
			point:{
				radius: 0,
				hoverRadius: 5,
			}
		},
		scales: {
			yAxes: [
				 {
					scaleLabel: {
						display: true,
						labelString: 'beats/min',
					},
					ticks: {
						beginAtZero: true,
					},
					gridLines: {
						drawOnChartArea: false,
					}
				}
			],
			xAxes: [
				{
					scaleLabel: {
						display: false,
						labelString: 'Time'
					},
					ticks: {
						maxTicksLimit: 20,
						display: true,
					},
					gridLines: {
						display: true,
						drawOnChartArea: false,
					},
					type: "time",
					time: {
						displayFormats: {
							minute: "h:mm a"
						},
					},
				}
			]
		}
	}

	return (<Line data={data}  options={options} height={null} width={null}/>)
}

export default GraphGenerator

function getHRData(data){
	const HRValues = getValues(data, 'HeartRate');
	const HRTimes = getTimes(data);

	return  {
		type: 'line',
		label: 'Heart rate',
		data: mergeData(HRTimes, HRValues), //{time: 21:00, value: 55}
		borderColor: ['rgb(255, 167, 167)'],
		backgroundColor: ["rgba(0,0,0,0"],
		borderWidth: 2,
		spanGaps: false
	}
}

function mergeData(times, data){
	const arr = [];
	for(let i = 0; i < times.length; i++){
		const obj = {
			x: times[i],
			y: data[i]
		}
		arr.push(obj);
	}
	return arr;
}

function getValues(data, key){
	const arr = [];

	for(const item of data){
		if(item[key] === -1){
			arr.push(NaN)
		} else {
			arr.push(item[key])
		}
	}

	return arr;
}

function getTimes(data){
	const arr = [];

	for(const item of data){
		arr.push(new Date(item['Timestamp']))
	}

	return arr;
}