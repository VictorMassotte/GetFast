import {
  Box,
  Grid,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  DialogActions,
} from "@mui/material";
import theme from "../Theme/Light";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { Container } from "@mui/system";

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
      backgroundColor: theme.palette.primary.light,
      borderRadius: "10px",
      transition: "0.2s",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
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
  const [disabled, setDisabled] = useState(true);
  const [menuContent, setMenuContent] = useState([]);
  const [descriptName, setDescriptName] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    setOpen(false);
    e.preventDefault();
    props.addFunc({
      name: props.name,
      price: props.price,
      type: "menu",
      description: menuContent,
      descriptName : descriptName,
    });
  };

  const addToContent = (article, id) => {
    let newArr = [...menuContent];
    newArr[id] = article._id;
    setMenuContent(newArr);

    let newArr2 = [...descriptName];
    newArr2[id] = article.name;
    setDescriptName(newArr2);
  };

  useEffect(() => {
    if (props.content.length === menuContent.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
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
            backgroundColor: "primary.dark",
            color: "white",
            ml: theme.spacing(1),
          }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Grid>

      <Dialog onClose={handleClose} open={open} sx={{ pb: theme.spacing(4) }}>
        <DialogTitle>
          Choisissez la composition de votre menu {props.name}
        </DialogTitle>
        <Container>
          <FormControl>
            {props.content.map((typeArticle, index) => {
              return (
                <>
                  <FormLabel>{typeArticle}</FormLabel>
                  <RadioGroup>
                    {props.carte.article.map((article) => {
                      if (article.type == typeArticle) {
                        return (
                          <FormControlLabel
                            value={article._id}
                            control={<Radio />}
                            label={article.name}
                            required
                            onChange={() => {
                              addToContent({name : article.name, _id : article._id}, index);
                            }}
                          />
                        );
                      }
                    })}
                  </RadioGroup>
                </>
              );
            })}
          </FormControl>
        </Container>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            type="submit"
            form="my-form-id"
            label="Submit"
            disabled={disabled}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Menu;
