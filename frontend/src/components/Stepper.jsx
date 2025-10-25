import * as React from "react";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";

const steps = ["Owner Information", "Owner Submission"];

export default function Stepper({ activeStep }) {
  return (
    <Box sx={{ width: "100%" }}>
      <MuiStepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-label": {
            fontSize: "0.9rem",
            opacity: 0.5,
            color: "gray",
            transition: "color 0.4s, opacity 0.4s",
          },
          "& .MuiStepLabel-label.Mui-active, & .MuiStepLabel-label.Mui-completed": {
            color: "#7A1CA9",
            opacity: 1,
          },
          "& .MuiStepIcon-root": {
            transition: "transform 0.4s, color 0.4s",
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#7A1CA9",
            transform: "scale(1.3)",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#7A1CA9",
            transform: "scale(1.1)",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
}