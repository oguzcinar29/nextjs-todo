import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TicketContext, ticketContextType } from "@/context/TicketContext";
export default function SelectProjectType() {
  const { projectType, setProjectType } =
    React.useContext<ticketContextType>(TicketContext);

  const handleChange = (event: SelectChangeEvent) => {
    setProjectType(event.target.value as string);
  };
  return (
    <div className="text-white">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel className="text-white" id="demo-simple-select-label">
            Category
          </InputLabel>
          <Select
            className="text-white bg-slate-400 "
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projectType}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="Hardware Problem">Hardware Problem</MenuItem>
            <MenuItem value="Software Problem">Software Problem</MenuItem>
            <MenuItem value="Project">Project</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
