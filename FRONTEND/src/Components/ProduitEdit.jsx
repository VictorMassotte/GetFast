import * as React from "react";
import API from "../API/API";
import theme from "../Theme/Light";
import {
  Box,
  Fab,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

function ProduitEdit(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    id: props._id,
    name: props.name,
    image: props.image,
    description: props.description,
    price: props.price,
    type: props.type,
    restoID: props.restoID,
  });
  const classAPI = new API();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(values);

  const submit = () => {
    setOpen(false);
    if (props.new) {
      classAPI.createArticle(values).then(() => {
        window.location.replace("/restaurateur/monrestaurant");
      });
    } else {
      classAPI.updateArticle(values).then(() => {
        window.location.replace("/restaurateur/monrestaurant");
      });
    }
  };

  const deleteArticle = () => {
    classAPI.deleteArticle(values.id).then(() => {
      window.location.replace("/restaurateur/monrestaurant");
    });
  };

  const useStyles = makeStyles({
    mainImage: {
      height: "100px",
      [theme.breakpoints.down("sm")]: {
        width: "150px",
        height: "auto",
      },
    },

    back: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "10px",
      transition: "0.2s",
    },

    price: {
      fontSize: "60px",
      [theme.breakpoints.down("md")]: {
        fontSize: "30px",
      },
    },
  });
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        sx={{
          py: theme.spacing(1),
          px: theme.spacing(2),
          mt: theme.spacing(1),
          mb: theme.spacing(4),
        }}
        className={classes.back}
      >
        <Grid item xs={4} alignSelf="center">
          {props.new ? (
            <Typography variant="h6">Nouvel Article</Typography>
          ) : (
            <img
              src={props.image}
              className={classes.mainImage}
              alt="Main article"
            />
          )}
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            component="p"
            variant="h5"
            sx={{
              lineHeight: 1,
              color: "primary.dark",
              textAlign: "right",
            }}
          >
            {props.name}
          </Typography>
          <Typography
            sx={{
              lineHeight: 1,
              color: "white",
              textAlign: "right",
            }}
          >
            {props.description}
          </Typography>
          {props.new ? (
            ""
          ) : (
            <Typography
              variant="h4"
              component="p"
              sx={{ color: "primary.dark", textAlign: "right" }}
              className={classes.price}
            >
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(props.price)}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {props.new ? (
              ""
            ) : (
              <Fab
                size="small"
                sx={{
                  backgroundColor: "error.light",
                  color: "white",
                  ml: theme.spacing(1),
                }}
                onClick={deleteArticle}
              >
                <RemoveIcon />
              </Fab>
            )}

            <Fab
              size="small"
              sx={{
                backgroundColor: "primary.dark",
                color: "white",
                ml: theme.spacing(1),
              }}
              onClick={handleClickOpen}
            >
              {props.new ? <AddIcon /> : <EditIcon />}
            </Fab>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.name}</DialogTitle>
        <DialogContent>
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
            id="Image"
            label="Image (URL)"
            variant="filled"
            value={values.image}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            onChange={(e) => {
              setValues({
                ...values,
                image: e.target.value,
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

          <TextField
            id="Type"
            label="Type"
            variant="filled"
            value={values.type}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            onChange={(e) => {
              setValues({
                ...values,
                type: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={submit} autoFocus>
            {props.new ? "Ajouter" : "Modifier"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProduitEdit;
