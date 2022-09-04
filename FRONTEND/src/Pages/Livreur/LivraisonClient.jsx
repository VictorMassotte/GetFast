import Typography from "@mui/material/Typography";
import theme from "../../Theme/Light.jsx";
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Container, Button, Box } from "@mui/material";
import QRCode from "react-qr-code";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading.jsx";
import API from "../../API/API.jsx";

function LivraisonClient(props) {

  const classAPI = new API();
  const params = useParams();
  const idOrder = params.idCommande;
  const [center, setCenter] = useState();
  const [client, setClient] = useState();
  const [loaded, setLoaded] = useState(false);

  console.log(idOrder);
  console.log("res");

  useEffect(() => {
    classAPI.getCommande(idOrder).then((res) => {
      classAPI.getUser(res.user).then((response) => {
        setClient(response);
        setLoaded(true)
        const apiUrl =
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          response[0].address +
          "&key=Google API Key";
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) =>
            setCenter({
              lat: data.results[0].geometry.location.lat,
              lng: data.results[0].geometry.location.lng,
            })
          );
      });
    });
  }, []);

  const containerStyle = {
    width: "500px",
    height: "300px",
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return !loaded? (<Loading/>) : ( 
    <Container
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        flexDirection: "column",
      }}
      maxWidth="lg"
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
        Livraison au Client
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
          Adresse du Client
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
          {client[0].address}
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
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          borderRadius: 2,
          backgroundColor: "secondary.main",
          color: "#fff",
          size: "large",
          textTransform: "capitalize",
          mt: theme.spacing(4),
        }}
      >
        Generer le QRcode
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <QRCode value={window.location.protocol +"//" + window.location.hostname + ":"+window.location.port+ "/deliveredPage/"+idOrder} size={200} />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Container>
  );
}

export default LivraisonClient;
