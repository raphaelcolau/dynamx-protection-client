import * as React from 'react';
import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

export default function BottomNavigationComponent() {
    const [value, setValue] = React.useState(0);

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
            <BottomNavigationAction label="Home" icon={<HomeIcon sx={ActionIconStyle} />} />
            <BottomNavigationAction label="Add" icon={<LibraryAddIcon sx={ActionIconStyle} />} />
            <BottomNavigationAction label="Packs" icon={<LibraryBooksIcon sx={ActionIconStyle} />} />
            <BottomNavigationAction label="Whitelist" icon={<PlaylistAddCheckIcon sx={ActionIconStyle} />} />
            <BottomNavigationAction label="Blacklist" icon={<PlaylistRemoveIcon sx={ActionIconStyle} />} />
        </BottomNavigation>
    );
}