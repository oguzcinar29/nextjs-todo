import * as React from "react";
import Box from "@mui/material/Box";
import Slider, { SliderValueLabel } from "@mui/material/Slider";
import { TicketContext } from "@/context/TicketContext";

export default function Progress() {
  const { setProgress, progress } = React.useContext(TicketContext);

  return (
    <div>
      <label htmlFor="">Progress</label>
      <Box sx={{ width: "98%", margin: "auto" }}>
        <Slider
          onChange={(e, value: number) => {
            setProgress(value);
          }}
          defaultValue={50}
          value={progress}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
}
