import { Container, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import theme from "../Theme/Light.jsx";
import { useParams } from "react-router-dom";
import API from "../API/API";

function Recuperation(props) {
  const classAPI = new API();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [IsVerifPassword, setIsVerifPassword] = useState(false);
  const [messageVerifPassword, setMessageVerifPassword] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [valuePassword, setValuePassword] = React.useState();
  const [valuePasswordVerif, setValuePasswordVerif] = React.useState();
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const [disabled, setDisabled] = useState(true);
  const params = useParams();
  const email = params.email;

  var [values, setValues] = useState({
    password: "",
    passwordCheck: false,
  });

  const validatePassword = (event) => {
    const password = event.target.value;
    setValuePasswordVerif("");
    setMessageVerifPassword("");
    if (passwordRegex.test(password)) {
      setIsValidPassword(true);
      setMessagePassword("");
      setValues({ ...values, password: event.target.value });
    } else {
      setIsValidPassword(false);
      setMessagePassword(
        "Votre mot de passe doit avoir une majuscule, un chiffre, 8 caractères et un caractère spécial"
      );
    }
  };

  const verifPassword = (event) => {
    if (valuePassword === valuePasswordVerif) {
      setIsVerifPassword(true);
      setMessageVerifPassword("");
      setValues({ ...values, passwordCheck: true });
    } else {
      setIsVerifPassword(false);
      setMessageVerifPassword("Vos mots de passe ne sont pas identiques");
    }
  };

  useEffect(() => {
    Object.keys(values).some(function (k) {
      return values[k] === "" || values[k] === false;
    })
      ? setDisabled(true)
      : setDisabled(false);
  }, [values]);

  const password = valuePassword;
  const submit = () => {
    classAPI.getUserByMail(email).then(function (response) {
      classAPI
        .changemdp(
          response[0].ID,
          password,
          email,
          response[0].firstname,
          response[0].lastname,
          response[0].tel,
          response[0].address, 
          response[0].role
        )
        .then(() => {
          window.location.replace("/connexion");
        });
    });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Typography
        variant="h4"
        component="p"
        textAlign="center"
        sx={{
          color: "primary.dark",
          py: theme.spacing(10),
        }}
      >
        Nouveau mot de passe
      </Typography>
      <TextField
        fullWidth
        value={valuePassword}
        onChange={(e) => setValuePassword(e.target.value)}
        type="password"
        id="outlined-basic"
        label="Nouveau mot de passe"
        variant="filled"
        sx={{ mt: theme.spacing(3) }}
        onBlur={validatePassword}
        required
      />
      <Typography sx={{ color: "red" }}>{messagePassword}</Typography>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Vérification du nouveau mot de passe"
        type="password"
        variant="filled"
        sx={{ mt: theme.spacing(3) }}
        value={valuePasswordVerif}
        onChange={(e) => setValuePasswordVerif(e.target.value)}
        onBlur={verifPassword}
        required
      />
      <Typography sx={{ color: "red" }}>{messageVerifPassword}</Typography>
      <Button
        sx={{
          borderRadius: 2,
          backgroundColor: "secondary.main",
          size: "large",
          textTransform: "capitalize",
          my: theme.spacing(4),
        }}
        variant="contained"
        disabled={disabled}
        onClick={submit}
      >
        Valider
      </Button>
    </Container>
  );
}

export default Recuperation;
