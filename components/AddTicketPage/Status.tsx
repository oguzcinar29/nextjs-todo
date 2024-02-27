import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TicketContext } from "@/context/TicketContext";
export default function Status() {
  const { category, setCategory } = React.useContext(TicketContext);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  return (
    <div className="text-white">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel className="text-white" id="demo-simple-select-label">
            Status
          </InputLabel>
          <Select
            className="text-white bg-slate-400 "
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="not started">Not Started</MenuItem>
            <MenuItem value="started">Starter</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
