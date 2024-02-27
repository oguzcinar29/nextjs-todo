import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  TicketContext,
  priType,
  ticketContextType,
} from "@/context/TicketContext";

export default function Priorty() {
  const { setPri } = React.useContext<ticketContextType>(TicketContext);

  return (
    <div className="text-white">
      <FormControl>
        <FormLabel className="text-white" id="demo-radio-buttons-group-label">
          Priority
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          className="flex"
          onChange={(e, value) => setPri(parseInt(value))}
        >
          <div className="flex">
            <FormControlLabel value={1} control={<Radio />} label="1" />
            <FormControlLabel value={2} control={<Radio />} label="2" />
            <FormControlLabel value={3} control={<Radio />} label="3" />
            <FormControlLabel value={4} control={<Radio />} label="4" />
            <FormControlLabel value={5} control={<Radio />} label="5" />
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
}
