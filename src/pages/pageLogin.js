import PageComponent from "../components/page/page";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

function InputHost() {
  const [value, setValue] = React.useState(null);
  return (
    <Autocomplete
    value={value}
    className="undraggable"
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
          host: `Add "${inputValue}"`,
        });
      }

      return filtered;
    }}
    selectOnFocus
    clearOnBlur
    handleHomeEndKeys
    id="Server host"
    options={ConnectionHistory}
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
    renderOption={(props, option) => <li {...props}>{option.host}</li>}
    sx={{ width: 300 }}
    freeSolo
    renderInput={(params) => (
      <TextField {...params} label="Server host" />
    )}
  />
  )
}

export default function PageLogin() {

  const hostContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'calc(90% - 25px)', // 25px is the height of the menubar
    '-webkit-app-region': 'drag',
    '& > *': {
      '-webkit-app-region': 'no-drag',
    }
  }
  
  return (
    <PageComponent>
      <div style={hostContainer}>
        <InputHost />
      </div>

    </PageComponent>
  );
}

const ConnectionHistory = [
  { host: 'secures.dartcher.fr' },
  { host: 'secures.dynamx.fr'},
  { host: 'localhost:2626' },
];
