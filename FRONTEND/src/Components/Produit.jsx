import { Box, Grid, Typography, Fab } from "@mui/material";
import theme from "../Theme/Light";
import { makeStyles } from "@mui/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";

function Produit(props) {
  var initQuan = props.panier.filter((obj) => obj.name == props.name).length;

  const [quantity, setQuantity] = useState(
    initQuan !== undefined && initQuan > 0 ? initQuan : 0
  );
  const removeQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      props.removeFunc({
        name: props.name,
        price: props.price,
        type: props.type,
        description: props.description,
        _id : props._id
      });
    }
  };

  const addQuantity = () => {
    setQuantity(quantity + 1);
    props.addFunc({
      name: props.name,
      price: props.price,
      type: props.type,
      description: props.description,
      _id : props._id
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
      backgroundColor: theme.palette.primary.light,
      borderRadius: "10px",
      transition: "0.2s",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },

    price: {
      fontSize: "60px",
      [theme.breakpoints.down("md")]: {
        fontSize: "30px",
      },
    },
  });

  useEffect(() => {
    if (props.panier.filter((obj) => obj.name == props.name).length == 0) {
      setQuantity(0);
    }
  }, [props.panier]);

  const classes = useStyles();

  return (
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
        <img
          src={props.image}
          className={classes.mainImage}
          alt="Main article"
        />
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
          sx={{ lineHeight: 1, color: "primary.dark", textAlign: "right" }}
        >
          {props.name}
        </Typography>
        <Typography sx={{ lineHeight: 1, color: "white", textAlign: "right" }}>
          {props.description}
        </Typography>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {quantity > 0 ? (
            <>
              <Fab
                size="small"
                sx={{
                  backgroundColor: "error.light",
                  color: "white",
                  ml: theme.spacing(1),
                }}
                onClick={removeQuantity}
              >
                <RemoveIcon />
              </Fab>

              <Fab
                size="small"
                sx={{
                  backgroundColor: "primary.dark",
                  color: "white",
                  ml: theme.spacing(1),
                }}
              >
                {quantity}
              </Fab>
            </>
          ) : (
            ""
          )}

          <Fab
            size="small"
            sx={{
              backgroundColor: "primary.dark",
              color: "white",
              ml: theme.spacing(1),
            }}
            onClick={addQuantity}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Produit;
