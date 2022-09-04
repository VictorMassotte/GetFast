import {
  Grid,
  Typography,
  Fab,
  Dialog,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import theme from "../Theme/Light";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import API from "../API/API";

function Menu(props) {
  const useStyles = makeStyles({
    desc: {
      fontSize: "19px",
      lineHeight: 1,
      color: "white",
      fontFamily: "GTAmerica",
      marginTop: "0px",
      marginBottom: "10px",
      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
      },
    },
    name: {
      color: theme.palette.primary.dark,
      fontFamily: "GTAmerica",
      fontSize: "150%",
      margin: 0,
    },
    back: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "10px",
      transition: "0.2s",
    },

    price: {
      color: theme.palette.primary.dark,
      fontFamily: "GTAmerica",
      fontSize: "30px",
      textAlign: "right",
      marginTop: "0px",
      marginBottom: "0px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "25px",
      },
    },
  });

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [menuContent, setMenuContent] = useState(
    props.new ? [] : props.content
  );
  const [values, setValues] = useState({
    _id: props._id,
    content: props.content,
    description: props.description,
    price: props.price,
    restaurantId: props.restaurantId,
    name: props.name,
  });
  const classAPI = new API();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    classAPI.deleteMenu(values._id)
    .then(() => {
      window.location.replace("/restaurateur/monrestaurant");
    })
  }

  const handleSubmit = () => {
    setOpen(false);
    console.log(values, menuContent);
    if (props.new) {
      classAPI.createMenu(values, menuContent).then(() => {
        window.location.replace("/restaurateur/monrestaurant");
      });
    } else {
      classAPI.updateMenu(values, menuContent).then(() => {
        window.location.replace("/restaurateur/monrestaurant");
      });
    }
  };

  const update = (type, e) => {
    var temp = menuContent.filter((obj) => obj !== type);
    for (var i = 0; i < e.target.value; i++) {
      temp = [...temp, type].sort();
    }
    setMenuContent(temp);
  };

  useEffect(() => {
    console.log(menuContent);
  }, [menuContent]);

  return (
    <>
      <Grid
        container
        sx={{
          py: theme.spacing(3),
          px: theme.spacing(2),
          mb: theme.spacing(4),
        }}
        className={classes.back}
      >
        {props.new ? (
          <Typography variant="h6">Nouveau Menu</Typography>
        ) : (
          <>
            <Grid item md={10} xs={7}>
              <p className={classes.name}>{props.name}</p>
              <p className={classes.desc}>{props.description}</p>
            </Grid>

            <Grid item md={2} xs={5}>
              <p className={classes.price}>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(props.price)}
              </p>
            </Grid>

            <Fab
              size="small"
              sx={{
                backgroundColor: "error.light",
                color: "white",
                ml: theme.spacing(1),
              }}
              onClick={handleDelete}
            >
              <RemoveIcon />
            </Fab>
          </>
        )}

        <Fab
          size="small"
          sx={{
            backgroundColor: "primary.dark",
            color: "white",
            ml: theme.spacing(1),
          }}
          onClick={handleOpen}
        >
          {props.new ? <AddIcon /> : <EditIcon />}
        </Fab>
      </Grid>

      <Dialog onClose={handleClose} open={open} sx={{ pb: theme.spacing(4) }}>
        <Container>
          <Typography> Composition du Menu {props.name}</Typography>
          <TextField
            id="Name"
            label="Name"
            variant="filled"
            value={values.name}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            onChange={(e) => {
              setValues({
                ...values,
                name: e.target.value,
              });
            }}
          />

          <TextField
            id="Description"
            label="Description"
            variant="filled"
            value={values.description}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            multiline
            rows={4}
            onChange={(e) => {
              setValues({
                ...values,
                description: e.target.value,
              });
            }}
          />

          <Grid container spacing={2}>
            {props.types.map((type) => {
              return (
                <Grid
                  item
                  xs={4}
                  sx={{ py: theme.spacing(0), mt: theme.spacing(1) }}
                >
                  <TextField
                    id={type}
                    label={type}
                    variant="filled"
                    type="number"
                    value={menuContent.filter((obj) => obj == type).length}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ py: theme.spacing(1) }}
                    onChange={(e) => {
                      update(type, e);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>

          <TextField
            id="Prix"
            label="Prix"
            variant="filled"
            type="number"
            value={values.price}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            onChange={(e) => {
              setValues({
                ...values,
                price: e.target.value,
              });
            }}
          />
        </Container>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} autoFocus>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Menu;
