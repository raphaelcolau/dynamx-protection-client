import PageComponent from "../components/page/page";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

function InputHost() {
  const [value, setValue] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;

    React.useEffect(() => {
    let active = true;

    if (!loading) {
    return undefined;
    }

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

    return (
        <Autocomplete
        value={value}
        className="undraggable"
        open={open}
        onOpen={() => {
            setOpen(true);
        }}
        onClose={() => {
            setOpen(false);
        }}
        onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
            setValue({
            host: newValue,
            });
        } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
            host: newValue.inputValue,
            });
        } else {
            setValue(newValue);
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
        clearOnBlur
        handleHomeEndKeys
        id="Server host"
        options={options}
        loading={loading}
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
        renderOption={(props, option) => <li {...props} onClick={() => {
            if (option.host.startsWith("New")) {
                setHistory(option.host.split(' ')[1].replace('"', ''));
            }
        }}>{option.host}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
        <TextField {...params} label="Server host" />
        )}
    />
    )
}

async function getHistory() {
    let history = await localStorage.getItem('history');
    history = JSON.parse(history);
    return history;
}

async function setHistory(entry) {
  const history = await getHistory();
  history.push({host: entry});
  await localStorage.setItem('history', JSON.stringify(history));
  return Promise.resolve(history);
}

export default function PageLogin() {

  const hostContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'calc(90% - 25px)', // 25px is the height of the menubar
    'WebkitAppRegion': 'drag',
    '& > *': {
      'WebkitAppRegion': 'no-drag',

    },
  }
  
  return (
    <PageComponent>
      <div style={hostContainer}>
        <InputHost />
      </div>

    </PageComponent>
  );
}
