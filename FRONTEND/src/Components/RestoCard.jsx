import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Fab, Link } from "@mui/material";
import theme from "../Theme/Light";
import { makeStyles } from "@mui/styles";

function RestoCard(props) {
  const useStyles = makeStyles({
    hover: {
      transition: "0.2s",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        fontSize: "130%",
      },
    },
  });

  const classes = useStyles();
  const now = new Date();
  const opening = new Date(
    now.getFullYear() +
      "-" +
      (now.getMonth() + 1) +
      "-" +
      now.getDate() +
      " " +
      props.opening
  );
  const closing = new Date(
    now.getFullYear() +
      "-" +
      (now.getMonth() + 1) +
      "-" +
      now.getDate() +
      " " +
      props.closing
  );
  const hourOpen = opening < now && closing > now;

  return (
    <Card sx={{ mt: theme.spacing(2) }}>
      <CardMedia component="img" height="190" image={props.image} />
      <CardContent
        className={classes.hover}
        sx={{ backgroundColor: "primary.light", pt: theme.spacing(1) }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            align="left"
            sx={{ color: "primary.dark", fontSize: "129%" }}
          >
            {props.name}
          </Typography>

          <Link href={"/restaurant/" + props._id} disabled={!hourOpen}>
            <Fab
              size="small"
              sx={{
                backgroundColor: "primary.dark",
                color: "white",
                mb: theme.spacing(0),
              }}
              disabled={!hourOpen}
            >
              <ArrowForwardIcon />
            </Fab>
          </Link>
        </Box>

        {!hourOpen ? (
          <Typography
            sx={{
              backgroundColor: "primary.dark",
              display: "inline-flex",
              px: theme.spacing(1),
              color: "secondary.main",
              borderRadius: "4px",
              boxShadow: 4,
              fontSize: "12px",
            }}
          >
            Fermé
          </Typography>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}

export default RestoCard;
