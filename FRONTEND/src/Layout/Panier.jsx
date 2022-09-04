import {
  BottomNavigation,
  Grid,
  Box,
  Divider,
  Typography,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as React from "react";
import theme from "../Theme/Light";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import Paypal from "../Components/PayPal";
import API from "../API/API";

function Panier(props) {
  const [total, setTotal] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [openValid, setOpenValid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [codePromoValid, setCodePromoValid] = React.useState("");
  const [codePromoUsed, setCodePromoUsed] = React.useState(false);
  const [paypalReturn, setPaypalReturn] = React.useState();
  const classAPI = new API();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseValid = () => {
    setOpenValid(false);
  };

  const remove = (data) => {
    props.removeFunc(data);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const valid = async (order, state) => {
    setOpen(false);
    console.log(order, state);
    setPaypalReturn(state);
    setOpenValid(true);
    if(state){
      classAPI.createOrder(props.panier, localStorage.getItem('id'), props.restoID, total)
    }
    await sleep(2000);
    window.location.replace("/");
  };

  const codePromoCheck = (e) => {
    if (e.target.value == "CODE1" && !codePromoUsed) {
      setCodePromoUsed("CODE1");
    } else if (!codePromoUsed) {
      setCodePromoValid("Le code n'est pas valide");
    } else {
      setCodePromoValid("Code Promo déjà utilisé");
    }
  };

  React.useEffect(() => {
    var t = 0;
    props.panier.forEach((element) => {
      t = t + element.price;
    });
    setTotal(t);

    props.panier.length > 0 ? setDisabled(false) : setDisabled(true);
    console.log(props.panier)
  }, [props.panier]);

  React.useEffect(() => {
    setTotal(total * 0.75);
  }, [codePromoUsed]);

  const useStyles = makeStyles({
    price: {
      color: theme.palette.primary.main,
      fontSize: "10px",
    },
    description: {
      color: theme.palette.primary.light,
      fontSize: "10px",
    },
  });

  const deleteAll = () => {
    props.deleteAll();
  };

  const classes = useStyles();
  return (
    <>
      <Box
        className="Tracker"
        sx={{ position: "fixed", bottom: 0, width: "100%", zIndex: "tooltip" }}
      >
        <BottomNavigation sx={{ backgroundColor: "primary.dark" }}>
          <Container
            maxWidth="xl"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h3" sx={{ color: "secondary.main" }}>
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(total)}
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: 8,
                backgroundColor: "secondary.main",
                textTransform: "capitalize",
                height: "70%",
                mt: theme.spacing(1),
              }}
              onClick={handleOpen}
            >
              Commander
              <ArrowForwardIcon />
            </Button>
          </Container>
        </BottomNavigation>
      </Box>

      <Dialog onClose={handleClose} open={open} sx={{ pb: theme.spacing(4) }}>
        <DialogTitle>Récapitulatif de votre commande</DialogTitle>

        <Container>
          {props.panier.map((article) => {
            return (
              <>
                <Typography variant="h6">{article.name}</Typography>
                <Typography className={classes.description}>
                  {Array.isArray(article.description)
                    ? article.descriptName.join(" • ")
                    : ""}
                </Typography>
                <Typography className={classes.price}>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(article.price)}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    py: theme.spacing(0),
                    borderRadius: 8,
                    textTransform: "capitalize",
                    mb: theme.spacing(3),
                  }}
                  onClick={() => remove(article)}
                >
                  Supprimer
                </Button>
              </>
            );
          })}
          <Divider sx={{ my: theme.spacing(2) }} />

          <Typography>Vider</Typography>
          <DeleteIcon
            onClick={deleteAll}
            sx={{ mx: theme.spacing(0), px: theme.spacing(0) }}
          />
          <Typography>Code Promo</Typography>
          <TextField
            onBlur={(e) => codePromoCheck(e)}
            size="small"
            variant="outlined"
          />
          <Typography variant="h6" sx={{ color: "red" }}>
            {codePromoValid}
          </Typography>

          <Divider sx={{ my: theme.spacing(4) }} />
          <Typography variant="h6"> Total :</Typography>
          <Typography variant="h4" sx={{ color: "secondary.main" }}>
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(total)}
          </Typography>
        </Container>

        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              mt: theme.spacing(2),
              borderRadius: 8,
              textTransform: "capitalize",
            }}
          >
            Annuler
          </Button>
          {/* <Button
            onClick={valid}
            disabled={disabled}
            variant="contained"
            sx={{
              mt: theme.spacing(2),
              borderRadius: 8,
              backgroundColor: "secondary.main",
              textTransform: "capitalize",
            }}
          >
            Commander
          </Button> */}

          {disabled ? "" : <Paypal price={total} returnFunc={valid} />}
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={handleCloseValid}
        open={openValid}
        sx={{ pb: theme.spacing(4) }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            direction: "column",
          }}
        >
          {paypalReturn ? (
            <>
              {" "}
              <CheckCircleIcon
                sx={{ fontSize: "100px", color: "success.light" }}
              />
              <Typography> Commande Validée </Typography>{" "}
            </>
          ) : (
            <>
              {" "}
              <ErrorIcon sx={{ fontSize: "100px", color: "error.light" }} />
              <Typography> Erreur </Typography>
            </>
          )}
        </Container>
      </Dialog>
    </>
  );
}

export default Panier;
