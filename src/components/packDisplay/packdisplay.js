import * as React from 'react';
import {Grid, Paper, Typography, Avatar} from '@mui/material';
import squareLogo from '../../assets/images/square-logo.png';
import ButtonComponent from './buttonContainer';

export default function PackDisplayComponent(props) {
    const paperStyle = props.style;
    const pack = props.pack;

    return (
        <Paper 
            style={paperStyle}
            elevation={1}
        >
            <Grid container sx={{padding: 1}}>

                <Grid item xs={2}>
                    <Avatar sx={{width: 42, height: 42, mt: 0.5}} alt={pack.name} src={squareLogo} />
                </Grid>

                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={12}>

                            <Typography 
                                variant="button"
                                component="div"
                                sx={{mt: 0.5}}
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}    
                            >
                                {pack.name}
                            </Typography>

                            <Typography 
                                variant="caption"
                                component="div"
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {pack.keyw}
                            </Typography>

                        </Grid>

                        <ButtonComponent pack={pack} /> {/* Grid inside this component */}

                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}