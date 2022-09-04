import * as React from "react";
import { Grid} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
const Loading = () => {
  const useStyles = makeStyles({
    root: {
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    card: {
        alignItems: "center",
        justifyContent: "center"
    }
});

const classes = useStyles();

return (
  <Grid
    className={classes.root}
    alignItems="center"
    justify="center"
  >
    <Grid className={classes.card}>
        <CircularProgress size = {100}/>
    </Grid>
  </Grid>
)
};
export default Loading;
