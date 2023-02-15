import { Paper} from '@mui/material';
import * as React from 'react';
import PageComponent from '../components/page/page';
import DropZone from '../components/dropZoneCreatePack/dropZone';
import InputZone from '../components/formCreatePack/inputZone';

export default function PageAdd() {
    const [pack, setPack] = React.useState({
        rep_id: "",
        game_dir: "",
        pack_file: [],
    });
    const [loading, setLoading] = React.useState(false);

    const pageContainer = {
        width: '100%',
        height: 'calc(100vh - 4.5rem)', // 4.5rem is the height of the bottom navigation bar    
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: "1rem",
    };

    const paperStyle = {
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    
    return (
        <PageComponent navigation pageNumber={1}>
            <div style={pageContainer}>

                <Paper elevation={1} style={paperStyle}>
                    <DropZone pack={pack} setPack={setPack} />
                </Paper>

                <Paper elevation={1} style={paperStyle}>
                    <InputZone pack={pack} setPack={setPack} loading={loading} setLoading={setLoading}/>
                </Paper>

            </div>
        </PageComponent>
    );
}