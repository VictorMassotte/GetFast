import {  Box,  Container } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import theme from "../Theme/Light";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import API from "../API/API";

function Tracker(props) {
  const steps = ["En Attente", "En Cuisine", "En Route", "A table"];
  const [notif, setNotif] = React.useState({ status: 0 });
  const [step, setStep] = React.useState(null);

  const useStyles = makeStyles({
    hover: {
      transition: "0.2s",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  });

  const classes = useStyles();
  const classAPI = new API();
  const stateObj = { pending: 0, cooking: 1, delivering: 2, finished: 3 };

  React.useEffect(() => {
    if (step == null) {
      classAPI
        .getCommandeClient(localStorage.getItem("id"))
        .then((response) => {
          setStep(stateObj[response[0].status]);
        });
    }

    const socket = io("http://91.236.239.56:3080");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("order", (data) => setNotif(data));
    socket.on("disconnect", () => console.log("server disconnected"));
  }, []);

  React.useEffect(() => {
    if (notif.user == localStorage.getItem("id")) {
      setStep(stateObj[notif.status]);
      console.log(notif)
    }
  }, [notif]);

  return (
    <Box
      className="Tracker"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: "tooltip",
        backgroundColor: "primary.dark",
      }}
    >
      <Container maxWidth="lg" sx={{ pt: theme.spacing(1) }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel className={classes.white}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  );
}

export default Tracker;
