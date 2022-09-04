import theme from "../Theme/Light.jsx";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Link,
  Button,
  Divider,
  Container,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import API from "../API/API";

function Inscription(props) {
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePhone, setMessagePhone] = useState("");
  const [messageVerifPassword, setMessageVerifPassword] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [valuePassword, setValuePassword] = React.useState();
  const [valuePasswordVerif, setValuePasswordVerif] = React.useState();
  const [disabled, setDisabled] = useState(true);
  const classAPI = new API();

  // The regular exprssion to validate the email pattern
  // It may not be 100% perfect but can catch most email pattern errors and assures that the form is mostly right
  const emailRegex = /\S+@\S+\.\S+/;
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  var [values, setValues] = useState({
    lastname: "",
    firstname: "",
    email: "",
    tel: "",
    password: "",
    address: "",
    passwordCheck: false,
    role: "",
  });

  useEffect(() => {
    Object.keys(values).some(function (k) {
      return values[k] === "" || values[k] === false;
    })
      ? setDisabled(true)
      : setDisabled(false);

    console.log(values);
  }, [values]);

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setMessageEmail("");
      setValues({ ...values, email: email });
    } else {
      setMessageEmail("Entrez une adresse email valide");
      setValues({ ...values, email: "" });
    }
  };

  const validatePhone = (event) => {
    const phone = event.target.value;
    if (phoneRegex.test(phone)) {
      setMessagePhone("");
      setValues({ ...values, tel: phone });
    } else {
      setMessagePhone("Entrez un numéro valide");
      setValues({ ...values, tel: "" });
    }
  };

  const validatePassword = (event) => {
    const password = event.target.value;
    setValuePasswordVerif("");
    setMessageVerifPassword("");

    if (passwordRegex.test(password)) {
      setMessagePassword("");
      setValues({
        ...values,
        password: event.target.value,
        passwordCheck: false,
      });
    } else {
      setMessagePassword(
        "Votre mot de passe doit avoir une majuscule, un chiffre, 8 caractères et un caractère spécial"
      );
    }
  };

  const verifPassword = (event) => {
    if (valuePassword === valuePasswordVerif) {
      setMessageVerifPassword("");
      setValues({ ...values, passwordCheck: true });
    } else {
      setMessageVerifPassword("Vos mots de passe ne sont pas identiques");
      setValues({ ...values, passwordCheck: false });
    }
  };

  const submit = () => {
    classAPI.register(values).then((response) => {
      console.log(response);
      window.location.replace("/connexion");
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
        sx={{
          color: "primary.dark",
          py: theme.spacing(10),
        }}
      >
        Inscription
      </Typography>

      <FormControl variant="filled" fullWidth>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Nom"
          variant="filled"
          required
          onChange={(e) => {
            setValues({ ...values, lastname: e.target.value });
          }}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Prénom"
          variant="filled"
          sx={{ mt: theme.spacing(3) }}
          required
          onChange={(e) => {
            setValues({ ...values, firstname: e.target.value });
          }}
        />

        <TextField
          fullWidth
          id="outlined-basic"
          label="Adresse"
          variant="filled"
          sx={{ mt: theme.spacing(3) }}
          required
          onChange={(e) => {
            setValues({ ...values, address: e.target.value });
          }}
        />

        <TextField
          fullWidth
          id="outlined-basic"
          label="Téléphone"
          variant="filled"
          onBlur={validatePhone}
          sx={{ mt: theme.spacing(3) }}
          required
        />
        <Typography sx={{ color: "red" }}>{messagePhone}</Typography>

        <TextField
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="filled"
          onBlur={validateEmail}
          sx={{ mt: theme.spacing(3) }}
          required
        />
        <Typography sx={{ color: "red" }}>{messageEmail}</Typography>

        <TextField
          fullWidth
          value={valuePassword}
          onChange={(e) => setValuePassword(e.target.value)}
          type="password"
          id="outlined-basic"
          label="Mot de passe"
          variant="filled"
          sx={{ mt: theme.spacing(3) }}
          onBlur={validatePassword}
          required
        />
        <Typography sx={{ color: "red" }}>{messagePassword}</Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Vérification du mot de passe"
          type="password"
          variant="filled"
          sx={{ mt: theme.spacing(3) }}
          value={valuePasswordVerif}
          onChange={(e) => setValuePasswordVerif(e.target.value)}
          onBlur={verifPassword}
          required
        />
      </FormControl>
      <Typography sx={{ color: "red" }}>{messageVerifPassword}</Typography>
      <FormControl variant="filled" sx={{ mt: theme.spacing(3) }} fullWidth>
        <InputLabel id="demo-simple-select-label">Je suis</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Role"
          required
          onChange={(e) => {
            setValues({ ...values, role: e.target.value });
          }}
        >
          <MenuItem value={"role_client"}>Utilisateur</MenuItem>
          <MenuItem value={"role_livreur"}>Livreur</MenuItem>
          <MenuItem value={"role_restaurateur"}>Restaurateur</MenuItem>
        </Select>
      </FormControl>
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
        Inscription
      </Button>
      <Divider
        sx={{
          my: theme.spacing(2),
        }}
      />

      <Typography
        variant="h6"
        component="p"
        sx={{
          color: "primary.dark",
        }}
      >
        Vous avez deja un compte?
      </Typography>
      <Link
        href="/connexion"
        sx={{
          textDecoration: "none",
        }}
      >
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: "secondary.main",
          }}
        >
          Connectez-vous
        </Typography>
      </Link>
    </Container>
  );
}

export default Inscription;
