import theme from "../Theme/Light.jsx";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link, Button, Divider, Container, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import API from "../API/API";

function Connexion() {
  const emailRegex = /\S+@\S+\.\S+/;

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({ email: "", password: "" });
  const [returnError, setReturnError] = useState('')
  const classAPI = new API();

  useEffect(() => {
    Object.keys(values).some(function (k) {
      return values[k] === "" || values[k] === false;
    })
      ? setDisabled(true)
      : setDisabled(false);
  }, [values]);

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValidEmail(true);
      setMessageEmail("");
      setValues({ ...values, email: email });
    } else {
      setIsValidEmail(false);
      setMessageEmail("Entrez une adresse email valide");
    }
  };

  const valid = () => {
    classAPI
      .login(values.email, values.password)
      .then(() => {
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
        setReturnError("Erreur : Vérifier votre mot de passe. ")
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
        Connexion
      </Typography>
      <FormControl variant="filled" fullWidth>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="filled"
          onBlur={validateEmail}
        />
        <Typography sx={{ color: "red" }}>{messageEmail}</Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Mot de passe"
          variant="filled"
          type="password"
          sx={{ mt: theme.spacing(3) }}
          onChange={(e) => {
            setValues({ ...values, password: e.target.value });
          }}
        />
      </FormControl>
      <Link
        href="/motdepasse/oublie"
        sx={{
          textDecorationColor: theme.palette.secondary.main,
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: "secondary.main",
            fontSize: "15px",
            my: theme.spacing(2),
          }}
          type="password"
        >
          Mot de passe oublié
        </Typography>
      </Link>
      <Button
        sx={{
          borderRadius: 2,
          backgroundColor: "secondary.main",
          size: "large",
          textTransform: "capitalize",
        }}
        variant="contained"
        disabled={disabled}
        onClick={valid}
      >
        Connexion
      </Button>

      <Typography variant="h6" sx={{color:"red"}}>
        {returnError}
      </Typography>

      <Divider
        sx={{
          my: theme.spacing(7),
        }}
      />

      <Typography
        variant="h6"
        component="p"
        sx={{
          color: "primary.dark",
        }}
      >
        Vous n'avez pas de compte?
      </Typography>
      <Link
        href="/inscription"
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
          Inscrivez-vous
        </Typography>
      </Link>
    </Container>
  );
}

export default Connexion;
