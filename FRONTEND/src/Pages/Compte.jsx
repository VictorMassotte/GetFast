import theme from "../Theme/Light.jsx";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Button,
  Container,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import API from "../API/API";

function Compte(props) {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePhone, setMessagePhone] = useState("");
  const [messageMDP, setMessageMDP] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const classAPI = new API();
  const emailRegex = /\S+@\S+\.\S+/;
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  var [values, setValues] = useState({});
  var [typeRequest, setTypeRequest] = useState();

  const submit = () => {
    classAPI
      .checkPassword(values.email, values.password)
      .then((result) => {
        console.log(result);
        if (result["access_token"]) {
          if (typeRequest == "edit") {
            console.log("edit");
            classAPI
              .updateUser(localStorage.getItem("id"), values)
              .then(() => {
                setMessageMDP("");
              })
              .then(() => window.location.replace("/compte"));
          }
          if (typeRequest == "delete") {
            classAPI.deleteUser(localStorage.getItem("id"), true).then(() => {
              window.location.replace("/");
            });
          }
        } else {
          setMessageMDP("Mot de passe incorrect");
        }
      })
      .catch(function (error) {
        setMessageMDP("Mot de passe incorrect");
      });
  };

  useEffect(() => {
    isValidEmail && isValidPhone ? setDisabled(false) : setDisabled(true);

    console.log(values);
  }, [values]);

  useEffect(() => {
    classAPI.getUser(localStorage.getItem("id")).then((response) => {
      console.log(response);
      setValues({
        lastname: response[0].lastname,
        firstname: response[0].firstname,
        email: response[0].email,
        role: response[0].role,
        tel: response[0].tel,
        address: response[0].address,
        status: true,
        password: "",
      });
    });
  }, []);

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValidEmail(true);
      setMessageEmail("");
      setValues({ ...values, email: email });
    } else {
      setIsValidEmail(false);
      setMessageEmail("Please enter a valid email!");
      setValues({ ...values, email: "" });
    }
  };

  const validatePhone = (event) => {
    const phone = event.target.value;
    if (phoneRegex.test(phone)) {
      setIsValidPhone(true);
      setMessagePhone("");
      setValues({ ...values, tel: phone });
    } else {
      setIsValidPhone(false);
      setMessagePhone("Entrez un numéro valide");
      setValues({ ...values, tel: "" });
    }
  };

  const handleClickOpen = (type) => {
    setTypeRequest(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          Mon Compte
        </Typography>

        <FormControl variant="filled" fullWidth>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Nom"
            variant="filled"
            required
            value={values.lastname}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setValues({ ...values, lastname: e.target.value });
            }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Prénom"
            variant="filled"
            value={values.firstname}
            sx={{ mt: theme.spacing(3) }}
            InputLabelProps={{
              shrink: true,
            }}
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
            value={values.address}
            sx={{ mt: theme.spacing(3) }}
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={values.tel}
            onChange={(e) => {
              setValues({ ...values, tel: e.target.value });
            }}
            required
          />
          <Typography sx={{ color: "red" }}>{messagePhone}</Typography>

          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="filled"
            value={values.email}
            InputLabelProps={{
              shrink: true,
            }}
            onBlur={validateEmail}
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
            sx={{ mt: theme.spacing(3) }}
            required
          />
          <Typography sx={{ color: "red" }}>{messageEmail}</Typography>
        </FormControl>
        <FormControl variant="filled" sx={{ mt: theme.spacing(3) }} fullWidth>
          <InputLabel id="demo-simple-select-label">Je suis</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role"
            required
            disabled={values.role == "role_restaurateur" ? true : ""}
            value={values.role == undefined ? "" : values.role}
            onChange={(e) => {
              setValues({ ...values, role: e.target.value });
            }}
          >
            <MenuItem value={"role_client"}>Utilisateur</MenuItem>
            <MenuItem value={"role_livreur"}>Livreur</MenuItem>
            <MenuItem disabled value={"role_restaurateur"}>
              Restaurateur
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          sx={{
            borderRadius: 2,
            backgroundColor: "secondary.main",
            size: "large",
            textTransform: "capitalize",
            mt: theme.spacing(1),
          }}
          variant="contained"
          onClick={() => handleClickOpen("edit")}
          disabled={disabled}
        >
          Sauvegarder les changements
        </Button>

        <Button
          sx={{
            borderRadius: 2,
            backgroundColor: "secondary.main",
            size: "large",
            textTransform: "capitalize",
            mt: theme.spacing(1),
          }}
          variant="contained"
          onClick={() => handleClickOpen("delete")}
        >
          Supprimer le compte
        </Button>

        <Button
          sx={{
            borderRadius: 2,
            backgroundColor: "secondary.main",
            size: "large",
            textTransform: "capitalize",
            mt: theme.spacing(1),
          }}
          variant="contained"
          onClick={handleClickOpen}
        >
          Réinitialiser mot de passe
        </Button>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez entrer votre mot de passe pour confirmer votre action
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="filled"
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
          />
          <Typography variant="h5" sx={{ color: "red" }}>
            {messageMDP}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={submit}>Confirmer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Compte;
