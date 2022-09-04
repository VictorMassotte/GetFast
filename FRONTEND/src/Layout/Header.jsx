import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import theme from "../Theme/Light";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import BarChartIcon from "@mui/icons-material/BarChart";
import SourceIcon from "@mui/icons-material/Source";
import GavelIcon from "@mui/icons-material/Gavel";
import PolicyIcon from '@mui/icons-material/Policy';
import ReceiptIcon from '@mui/icons-material/Receipt';
import logo from "../Images/logo.png";
import API from "../API/API";
import CloseIcon from "@mui/icons-material/Close";
import { io } from "socket.io-client";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  SnackbarContent,
  Button,
} from "@mui/material";

function Header(props) {
  const useStyles = makeStyles({
    hover: {
      transition: "0.2s",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
    notOnPhone : {
      [theme.breakpoints.up("md")]: {
        display : "none !important",
      },
    },

    title : {
      transition: "0.2s",
      "&:hover": {
        color: theme.palette.secondary.main,
        fontSize : "40px"
      },
    }
  });

  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [notif, setNotif] = React.useState();
  const [message, setMessage] = React.useState();
  const [idResto, setIdResto] = React.useState();
  const classAPI = new API();
  const objState = {
    pending: "en attente",
    cooking: "en cuisine",
    delivering: "en route",
    finished: "arrivée",
  };

  React.useEffect(() => {
    const socket = io("http://91.236.239.56:3080");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("order", (data) => setNotif(data));
    socket.on("disconnect", () => console.log("server disconnected"));

    

    if (localStorage.getItem("role") === "role_restaurateur") {
      classAPI.getRestaurantByOwner(localStorage.getItem("id")).then((res) => {
        setIdResto(res.restaurant._id);
      });
    }
  }, []);

  React.useEffect(() => {
    console.log(notif);
    if (notif !== undefined) {
      if (
        notif.user == localStorage.getItem("id") &&
        notif.status !== "pending" &&
        notif.status !== "declined"
      ) {
        setMessage("Votre commande est " + objState[notif.status]);
        setOpen(true);
      }

      if (
        notif.user == localStorage.getItem("id") &&
        notif.status == "declined"
      ) {
        setMessage("Votre commande a été annulée par le restaurant");
        setOpen(true);
      }

      if (
        localStorage.getItem("role") == "role_livreur" &&
        notif.status == "cooking"
      ) {
        setMessage("Une commande s'apprête à être préparée");
        setOpen(true);
      }

      if (
        localStorage.getItem("role") == "role_restaurateur" &&
        notif.restaurant == idResto &&
        notif.status == "pending"
      ) {
        setMessage(
          "Une nouvelle commande est arrivée, découvrez et acceptez la dans l'onglet Commandes en Attente"
        );
        setOpen(true);
      }

      if (
        localStorage.getItem("role") == "role_restaurateur" &&
        notif.restaurant == idResto &&
        notif.status == "finished"
      ) {
        setMessage(
          "La commande "+ notif._id +" a été livrée"
        );
        setOpen(true);
      }
    }
  }, [notif]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const disconnect = () => {
    classAPI.disconnect();
    window.location.replace("/");
  };

  const handleCloseNotif = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseNotif}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const list = (
    <List
      sx={{ flexDirection: "column", display: "flex", px: theme.spacing(3) }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {localStorage.getItem("login") === "true" ? (
        <>
          <Link
            href="/compte"
            sx={{ textDecoration: "none", color: " inherit" }}
            className={classes.hover}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <AccountCircleIcon />
              </ListItemButton>
              <ListItemText>Mon Compte</ListItemText>
            </ListItem>
          </Link>

          {localStorage.getItem("role") === "role_client" ? (
            <Link
              href="/historique"
              sx={{ textDecoration: "none", color: " inherit" }}
              className={classes.hover}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <FactCheckIcon />
                </ListItemButton>
                <ListItemText>Historique de Commandes</ListItemText>
              </ListItem>
            </Link>
          ) : (
            ""
          )}
          {localStorage.getItem("role") === "role_livreur" ? (
            <Link
              href="/livreur/commandes"
              sx={{ textDecoration: "none", color: " inherit" }}
              className={classes.hover}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListAltIcon />
                </ListItemButton>
                <ListItemText>Commandes à Livrer</ListItemText>
              </ListItem>
            </Link>
          ) : (
            ""
          )}

          {localStorage.getItem("role") === "role_restaurateur" ? (
            <Link
              href="/restaurateur/monrestaurant"
              sx={{ textDecoration: "none", color: " inherit" }}
              className={classes.hover}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <StorefrontIcon />
                </ListItemButton>
                <ListItemText>Mon Restaurant</ListItemText>
              </ListItem>
            </Link>
          ) : (
            ""
          )}
          {localStorage.getItem("role") === "role_restaurateur" ? (
            <Link
              href="/restaurateur/statsventes"
              sx={{ textDecoration: "none", color: " inherit" }}
              className={classes.hover}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <BarChartIcon />
                </ListItemButton>
                <ListItemText>Statistiques des ventes</ListItemText>
              </ListItem>
            </Link>
          ) : (
            ""
          )}

          {localStorage.getItem("role") === "role_restaurateur" ? (
            <Link
              href="/restaurateur/commandes"
              sx={{ textDecoration: "none", color: " inherit" }}
              className={classes.hover}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListAltIcon />
                </ListItemButton>
                <ListItemText>Commandes en Attente</ListItemText>
              </ListItem>
            </Link>
          ) : (
            ""
          )}
          {localStorage.getItem("role") === "role_technique" ? (
            <Link
              href="/technique/logs"
              sx={{ textDecoration: "none", color: " inherit" }}
              className={classes.hover}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <EqualizerIcon />
                </ListItemButton>
                <ListItemText>Statistiques et Logs</ListItemText>
              </ListItem>
            </Link>
          ) : (
            ""
          )}
          {localStorage.getItem("role") === "role_commercial" ? (
            <Link
              href="/commercial/statsapp"
              sx={{ textDecoration: "none", color: " inherit" }}
              className={classes.hover}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <EqualizerIcon />
                </ListItemButton>
                <ListItemText>Statistiques de l'application</ListItemText>
              </ListItem>
            </Link>
          ) : (
            ""
          )}
          {localStorage.getItem("role") === "role_commercial" ? (
            <Link
              href="/commercial/monitoringapp"
              sx={{ textDecoration: "none", color: " inherit" }}
              className={classes.hover}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <EqualizerIcon />
                </ListItemButton>
                <ListItemText>Monitoring de l'application</ListItemText>
              </ListItem>
            </Link>
          ) : (
            ""
          )}
          {localStorage.getItem("role") === "role_dev" ? (
            <Link
              href="/developpeurtiers/gestioncomposant/"
              sx={{ textDecoration: "none", color: " inherit" }}
              className={classes.hover}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <SourceIcon />
                </ListItemButton>
                <ListItemText>Gestion des composants</ListItemText>
              </ListItem>
            </Link>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}

      {localStorage.getItem("login") === "true" ? (
        <Link
          sx={{ textDecoration: "none", color: " inherit" }}
          className={classes.hover}
          onClick={disconnect}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <LogoutIcon />
            </ListItemButton>
            <ListItemText>Se Déconnecter</ListItemText>
          </ListItem>{" "}
        </Link>
      ) : (
        <Link
          href="/connexion"
          sx={{ textDecoration: "none", color: " inherit" }}
          className={classes.hover}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <LogoutIcon />
            </ListItemButton>
            <ListItemText>Se Connecter</ListItemText>
          </ListItem>
        </Link>
      )}

      <Divider sx={{ my: theme.spacing(3) }} />

      <Link
        href="/mentionlegales"
        sx={{ textDecoration: "none", color: " inherit" }}
        className={classes.hover}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <GavelIcon />
          </ListItemButton>
          <ListItemText>Mentions Legales</ListItemText>
        </ListItem>
      </Link>
      <Link
        href="/conditionsgenerales"
        sx={{ textDecoration: "none", color: " inherit" }}
        className={classes.hover}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ReceiptIcon />
          </ListItemButton>
          <ListItemText>Conditions Générales de Ventes</ListItemText>
        </ListItem>
      </Link>
      <Link
        href="/confidentialite"
        sx={{ textDecoration: "none", color: " inherit" }}
        className={classes.hover}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <PolicyIcon />
          </ListItemButton>
          <ListItemText>Confidentialité</ListItemText>
        </ListItem>
      </Link>

      <ListItem
        className={`${classes.hover} ${classes.notOnPhone}`}
        disabledPadding
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <CloseIcon onClick={() => setState(false)} />
      </ListItem>
    </List>
  );
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "primary.dark",
            textShadow: "0px 4px 4px black",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, position: "absolute" }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              <Link
                href="/"
                underline="none"
                color="inherit"
                className={classes.title}
              >
                GetFast
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>

      <Snackbar
        open={open}
        onClose={handleCloseNotif}
        message="Note archived"
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent message={message} action={action} />
      </Snackbar>
    </>
  );
}

export default Header;
