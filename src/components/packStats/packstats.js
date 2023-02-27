import * as React from 'react';
import { Paper } from '@mui/material';
import axios from 'axios';
import {
    Chart,
    BarSeries,
  } from '@devexpress/dx-react-chart-material-ui';
  import { Animation, ArgumentAxis } from '@devexpress/dx-react-chart';

/*
    The date is formatted as dd/mm/yyyy hh:mm:ss
    The logs are stored in the following format:
    {
        2020: {
            1: {
                28: {
                    0: {
                        "28/01/2020 00:00:00": "Player sent a request to receive this pack"
                    },
                    1: {
                        "28/01/2020 01:00:00": "Player sent a request to receive this pack"
                        "28/01/2020 01:15:36": "Player sent a request to receive this pack"
                    }
                }
            }
        }
    }
*/


/*
    This function returns the number of requests made in the specified month
*/
function monthLengh(logs, month, year) {
    if (!logs) return 0;
    if (!logs[year]) return 0;
    if (!logs[year][month]) return 0;
    let monthLength = 0;
    const monthLogs = logs[year][month];

    for (let key in monthLogs) {
        let innerLogs = monthLogs[key];
        for (let innerKey in innerLogs) {
            let innerValue = innerLogs[innerKey];
            for (let date in innerValue) {
                let message = innerValue[date];
                if (message.includes(" requested the pack")) {
                    monthLength++;
                }
            }
        }
    }

    return monthLength;
}

/*
    This function creates an object with the following format:
    {
        {month: "01/20", usage: 10},
        {month: "02/20", usage: 20},
        {month: "03/20", usage: 30},
        {month: "04/20", usage: 40},
        ...
    }
    the number of months is specified by the numMonths parameter
*/
function createMonthObject(numMonths, logs) {
    let today = new Date();
    let globalObj = [];
  
    for (let i = 0; i < numMonths; i++) {
      let month = today.getMonth() - i;
      let year = today.getFullYear();
      if (month < 0) {
        month += 12;
        year--;
      }
      let monthString = (month + 1).toString().padStart(2, "0") + "/" + year.toString().slice(-2);
      globalObj.push({
        month: monthString,
        usage: monthLengh(logs, month+1, year)
      })

    }

    return globalObj;
}

export default function StatsPackComponent(props) {
    const [stats, setStats] = React.useState("");
    const pack = props.pack;

    React.useEffect(() => {
        if (pack._id === undefined) {return} else {
            const address = sessionStorage.getItem("apiAddress");
            axios.get(`//${address}/statistics/packs/?id=${pack._id}`).then((response) => {
                if (stats === "" && response.data !== "") {
                    setStats(createMonthObject(6, response.data));
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [pack._id, stats]);

    return (
        <Paper style={props.style} elevation={1} >

            {stats !== "" ? 
                <Chart
                    data={stats}
                    height="200"
                    width="330"
                    style={{
                        transform: "scale(0.5)",
                        transformOrigin: "top left",
                        fill: "#FFFFFF",
                    }}
                >
                    {/*  There is a problem with the ArgumentAxis component of the dx-react-chart lib in React StrictMode */}
                    {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 
                        <></>
                    : 
                        <ArgumentAxis 
                        showGrid={false}
                        showLine={false}
                        showTicks={false}
                        />
                    }
                
                    <BarSeries 
                        color="#e6750c"
                        valueField="usage"
                        argumentField="month"
                    />
                    <Animation />
                </Chart>
            : "No usage recorded"}
        </Paper>
    )
}