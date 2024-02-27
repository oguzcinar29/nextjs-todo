import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import * as React from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function ShowPrio(props: {
  priority: number;
  username: string;
}) {
  return (
    <div>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <StyledRating
          readOnly
          name="customized-color"
          defaultValue={parseInt(props.priority)}
          getLabelText={(value: number) =>
            `${value} Heart${value !== 1 ? "s" : ""}`
          }
          precision={0.5}
          icon={<WhatshotIcon fontSize="inherit" />}
          emptyIcon={<WhatshotIcon fontSize="inherit" />}
        />
      </Box>
    </div>
  );
}
