import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Container, Grid, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import theme from "../Theme/Light";
import { Button } from "@mui/material";
import RestoCard from "../Components/RestoCard";
import Tracker from "../Layout/Tracker";
import Banner from "../Images/logoBanner.png";
import API from "../API/API";

function Home(props) {
  const classAPI = new API();
  const [restos, setRestos] = React.useState([]);

  React.useEffect(() => {
    classAPI.getRestaurants().then(function (response) {
      setRestos(response);
    });
  }, []);

  return (
    <div className="font-face-gm">
      {/* <Container
        maxWidth="false"
        sx={{
          backgroundImage: `url(${banner1})`,
          backgroundSize : "100%",
          backgroundPosition : "center",
          mt: theme.spacing(1),
          height: "40vh",
        }}
      ></Container> */}
      <Container
        maxWidth="false"
        sx={{
          backgroundImage: `url(${Banner})`,
          backgroundSize: "6.2em",
          mt: theme.spacing(1),
          py: theme.spacing(3),
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h5" component="p" sx={{ color: "white" }}>
            Parrainez un ami,
          </Typography>

          <Typography variant="h4" component="p" sx={{ color: "primary.dark" }}>
            Économisez -25%
          </Typography>

          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Link href="/parrainage">
              <Button
                variant="contained"
                sx={{
                  mt: theme.spacing(2),
                  borderRadius: 8,
                  backgroundColor: "primary.dark",
                  textTransform: "capitalize",
                }}
              >
                <Typography variant="h6">Allons-y</Typography>
                <ArrowForwardIcon />
              </Button>
            </Link>
          </Box>
        </Container>
      </Container>

      <Container maxWidth="xl" sx={{ pb: theme.spacing(2) }}>
        <Grid container spacing={2}>
          {restos.map((element, i) => {
            if (element.status == "open") {
              return (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <RestoCard {...element} />
                </Grid>
              );
            }
          })}
        </Grid>
      </Container>
      {localStorage.getItem("role") == undefined ||
      localStorage.getItem("role") == null ||
      localStorage.getItem("role") == "" ||
      localStorage.getItem("role") == "null" ||
      localStorage.getItem("role") == "role_client" ? (
        <Tracker />
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
