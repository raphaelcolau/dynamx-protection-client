import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import removeHistory from '../historyHost/remove';
import setHistory from '../historyHost/set';

export default function ListAutoComplete(props, option, setValue, setOpen) {

    const handleDelete = async (event) => {
        event.stopPropagation();
        removeHistory(option.host);
        setValue("");
        setOpen(false);
    };

    return (
        <li 
            {...props}
            style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
            onClick={() => {
                if (option.host.startsWith("New")) {
                    const newOption = option.host.split(' ')[1].replaceAll('"', '');
                    setHistory(newOption);
                    setValue(newOption);
                    setOpen(false);
                } else {
                    if (option.host !== undefined) {
                        setValue(option);
                        setOpen(false);
                    }
                }
            }}
        >
            {option.host.slice(0, 29)}
            {option.host.startsWith("New") ? null : 
                <IconButton 
                aria-label="delete"
                size="small"
                onClick={(event) => handleDelete(event)}
                >
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            }
        </li>
    )
}