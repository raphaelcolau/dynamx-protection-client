import * as React from 'react';
import PageComponent from '../components/page/page';
import axios from 'axios';
import { Grid } from '@mui/material';
import PackDisplayComponent from '../components/packDisplay/packdisplay';
import StatsPackComponent from '../components/packStats/packstats';

export default function PagePacks() {
    const [packs, setPacks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    /*
        React.StrictMode renders the components twice on development mode.
    */
    React.useEffect(() => {
        const address = sessionStorage.getItem("apiAddress");
        if (loading) {
            axios.get(`https://${address}/mprotector/packs/list`).then((response) => {
                setPacks(response.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [loading]);

    const pageContainer = {
        width: '90%',
        height: 'calc(100vh - 4.5rem)', // 4.5rem is the height of the bottom navigation bar
        margin: "auto",
        marginTop: "1rem",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: "1rem",
    };

    const paperStyle = {
        width: '100%',
        height: '16vh',
        overflow: 'hidden',
    }

    return (
        <PageComponent navigation pageNumber={2}>
            <div style={pageContainer}>
                {packs.map((pack) => {
                    return (
                        <Grid container key={pack._id} spacing={2}>
                            <Grid item xs={8}>
                                <PackDisplayComponent pack={pack} style={paperStyle} />
                            </Grid>

                            <Grid item xs={4}>
                                <StatsPackComponent style={paperStyle} pack={pack} />
                            </Grid>
                        </Grid>
                    )
                })}
            </div>
        </PageComponent>
    );
}