import * as React from 'react';
import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { useNavigate } from 'react-router-dom';

export default function BottomNavigationComponent(props) {
    const [value, setValue] = React.useState(props.pageNumber || 0);
    const navigate = useNavigate();

    const navStyle = {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '4.5rem',
    }

    const ActionIconStyle = {
        fontSize: 30,
        mb: 1,
    }

    return (
        <BottomNavigation
            style={navStyle}
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction
                label="Home"
                icon={<HomeIcon sx={ActionIconStyle} />}
                onClick={() => {
                    setTimeout(() => {
                        navigate("/home")
                    }, 400);
                }}
            />
            <BottomNavigationAction
                label="Add"
                icon={<LibraryAddIcon sx={ActionIconStyle}/>}
                onClick={() => {
                    setTimeout(() => {
                        navigate("/add")
                    }, 400);
                }}
            />
            <BottomNavigationAction
                label="Packs"
                icon={<LibraryBooksIcon sx={ActionIconStyle}/>}
                onClick={() => {
                    setTimeout(() => {
                        navigate("/packs")
                    }, 400);
                }}
            />
            <BottomNavigationAction
                label="Whitelist"
                icon={<PlaylistAddCheckIcon sx={ActionIconStyle}/>}
                onClick={() => {
                    setTimeout(() => {
                        navigate("/whitelist")
                    }, 400);
                }}
            />
            <BottomNavigationAction
                label="Blacklist"
                icon={<PlaylistRemoveIcon sx={ActionIconStyle}/>}
                onClick={() => {
                    setTimeout(() => {
                        navigate("/blacklist")
                    }, 400);
                }}
            />
        </BottomNavigation>
    );
}