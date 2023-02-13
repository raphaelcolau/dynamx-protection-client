import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import ListAutoComplete from './listAutoComplete';
import getHistory from '../historyHost/get';
import setHistory from '../historyHost/set';

const filter = createFilterOptions();

export default function InputHost(props) {
    const [value, setValue] = React.useState(null);
    const [options, setOptions] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {return undefined;}

        (async () => {
            const history = await getHistory();
            if (active) {
                setOptions(history);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        if (value !== null) {
            if (!value.host) {props.setAddress(value);}
            else {props.setAddress(value.host);}
        }
    }, [props, value]);

    return (
        <Autocomplete
            value={value}
            className="undraggable"
            open={open}
            onOpen={() => {setOpen(true);}}
            onClose={() => {setOpen(false);}}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        host: newValue,
                    });
                    props.setAddress(newValue);
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        host: newValue.inputValue,
                    });
                    props.setAddress(newValue.inputValue);
                } else {
                    setValue(newValue);
                    props.setAddress(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.host);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                    inputValue,
                    host: `New "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            blurOnSelect
            clearOnBlur
            handleHomeEndKeys
            id="Server host"
            options={options}
            loading={loading}
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    if (value !== null && value.host !== undefined && value.host !== "" && !value.host.startsWith("New")) {
                        setHistory(value.host);
                    }
                }
                if (event.key === 'Escape') {
                    setOpen(false);
                }
            }}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.host;
            }}
            renderOption={(props, option) => {
                return ListAutoComplete(props, option, setValue, setOpen);
            }}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
            <TextField {...params} label="Server host" />
        )}
    />
    )
}