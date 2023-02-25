import * as React from 'react';
import { Paper } from '@mui/material';
import axios from 'axios';


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
        "01/21": {},
        "02/21": {},
        "03/21": {},
        "04/21": {},
        "05/21": {},
        ...
    }
    the number of months is specified by the numMonths parameter
*/
function createMonthObject(numMonths, logs) {
    let today = new Date();
    let monthObj = {};
  
    for (let i = 0; i < numMonths; i++) {
      let month = today.getMonth() - i;
      let year = today.getFullYear();
      if (month < 0) {
        month += 12;
        year--;
      }
      let monthString = (month + 1).toString().padStart(2, "0") + "/" + year.toString().slice(-2);
      monthObj[monthString] = monthLengh(logs, month+1, year);
    }

    return monthObj;
}

export default function StatsPackComponent(props) {
    const [logs, setLogs] = React.useState("");
    const [stats, setStats] = React.useState("");
    const pack = props.pack;

    React.useEffect(() => {
        if (pack._id === undefined) {return} else {
            const address = sessionStorage.getItem("apiAddress");
            axios.get(`//${address}/statistics/packs/?id=${pack._id}`).then((response) => {
                setLogs(response.data);
                if (stats === "" && response.data !== "") {
                    setStats(createMonthObject(6, response.data));
                }
                console.log(stats)
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [pack._id, stats]);

    if (logs !== "") {
    }

    return (
        <Paper style={props.style} elevation={1} >
            {logs !== "" ? logs.toString() : "No logs"}
        </Paper>
    )
}