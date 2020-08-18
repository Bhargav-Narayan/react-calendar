import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Playground({ events, handleOnChange }) {
  //   const defaultProps = {
  //     options: events,
  //     getOptionLabel: (option) => option.eventName,
  //   };

  //   const [value, setValue] = React.useState(null);

  return (
    <div
      style={{
        width: 200,
        marginRight: "15px",
        marginBottom: "10px",
      }}
    >
      <TextField
        label="Search event name"
        style={{ marginTop: "5px" }}
        margin="normal"
        size="small"
        onChange={(e) => handleOnChange(e.target.value)}
      />
      {/* <Autocomplete
        {...defaultProps}
        id="clear-on-escape"
        clearOnEscape
        onChange={(e, value) => handleOnChange(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="clearOnEscape"
            margin="normal"
          />
        )}
      /> */}
    </div>
  );
}
