import {
  Container,
  Typography,
  FormControl,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import theme from "../Theme/Light.jsx";
import API from "../API/API";

function Parrainage(props) {
  const [messageEmail, setMessageEmail] = useState("");
  const emailRegex = /\S+@\S+\.\S+/;
  const [code, setCode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [mail, setMail] = useState("");
  const classAPI = new API();

  const submit = () => {
    classAPI.SendParrainage(mail).then(() => {
      setCode("Un email a été envoyé ! Voici votre code ! : CODE1");
    });
  };

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setMessageEmail("");
      setDisabled(false);
    } else {
      setMessageEmail("Entrez une adresse email valide");
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Typography
        variant="h4"
        component="p"
        sx={{
          color: "primary.dark",
          py: theme.spacing(10),
          textAlign: "center",
        }}
      >
        Parrainage
      </Typography>

      <Typography variant="subtitle1">
        Parrainez votre entourage afin qu'ils rejoignent la plateforme GetFast !
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: "secondary.main", textAlign: " center" }}
      >
        Vous êtes tous deux gagnants ! Vous obtiendrez un avantage en code Promo
        !
      </Typography>

      <FormControl variant="filled" fullWidth>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="filled"
          onBlur={validateEmail}
          sx={{ mt: theme.spacing(3) }}
          value = {mail}
          onChange = {(e) => setMail(e.target.value)}
          required
        />
        <Typography sx={{ color: "red" }}>{messageEmail}</Typography>
      </FormControl>
      <Button
        href=""
        sx={{
          borderRadius: 2,
          backgroundColor: "secondary.main",
          size: "large",
          mt: theme.spacing(3),
          textTransform: "none",
        }}
        onClick={submit}
        disabled={disabled}
        variant="contained"
      >
        Envoyer l'invitation
      </Button>

      <Typography sx={{ mt: theme.spacing(2), color : "primary.dark" }}>{code}</Typography>
    </Container>
  );
}

export default Parrainage;
