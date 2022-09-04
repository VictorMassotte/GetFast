import Typography from "@mui/material/Typography";
import theme from "../../Theme/Light.jsx";
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Container, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import API from "../../API/API.jsx";
import Loading from "../../Components/Loading.jsx";

function LivraisonRestaurant(props) {
  const [center, setCenter] = useState();

  const classAPI = new API();
  const params = useParams();
  const idOrder = params.idCommande;
  const [resto, setResto] = useState();
  const [loaded, setLoaded] = useState(false);

  console.log(idOrder);

  useEffect(() => {
    classAPI.getCommande(idOrder).then((res) => {
      classAPI.getRestaurant(res.restaurant).then((response) => {
        setResto(response);
        setLoaded(true)
        const apiUrl =
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          response.restaurant.address +
          "&key=Google API Key";
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            setCenter({
              lat: data.results[0].geometry.location.lat,
              lng: data.results[0].geometry.location.lng,
            });
            setLoaded(true);
          });
      });
    });
  }, []);

  const containerStyle = {
    width: "500px",
    height: "300px",
  };

  const handleRecup = () => {
    classAPI.updateOrder(idOrder, "delivering").then(() => {
      window.location.replace("/livreur/livraisonclient/" + idOrder);
    });
  };

  return !loaded ? (
    <Loading />
  ) : (
    <Container
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        component="p"
        sx={{
          color: "primary.dark",
          py: theme.spacing(10),
          textAlign: "center",
        }}
      >
        Livraison acceptée
      </Typography>
      <Box
        sx={{
          backgroundColor: "primary.light",
          px: theme.spacing(1),
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "10px",
          py: theme.spacing(4),
        }}
      >
        <Typography
          variant="h5"
          component="p"
          sx={{
            textAlign: "center",
            color: "primary.dark",
          }}
        >
          Adresse du Restaurant
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            textAlign: "center",
            color: "#fff",
            mb: theme.spacing(4),
          }}
        >
          {resto.restaurant.address}
        </Typography>
        <div>
          <LoadScript googleMapsApiKey="Google API Key">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={18}
            >
              <Marker position={center}></Marker>
            </GoogleMap>
          </LoadScript>
        </div>
      </Box>
      <Button
        sx={{
          borderRadius: 2,
          backgroundColor: "secondary.main",
          size: "large",
          textTransform: "capitalize",
          mt: theme.spacing(4),
        }}
        variant="contained"
        onClick={handleRecup}
      >
        Commande récupérée
      </Button>
    </Container>
  );
}

export default LivraisonRestaurant;
