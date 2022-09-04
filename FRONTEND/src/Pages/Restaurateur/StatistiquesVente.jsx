import * as React from "react";
import Typography from "@mui/material/Typography";
import theme from "../../Theme/Light.jsx";
import { Container, Box } from "@mui/material";
import { Chart, Series } from "devextreme-react/chart";
import API from "../../API/API";
import Loading from "../../Components/Loading";

function StatistiquesVente(props) {
  const countarticle = {};
  const classAPI = new API();
  const [commande, setCommande] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [name, setName] = React.useState([]);
  var temp = [];
  let max, min, averagePanier;
  const ventesJour = [];
  var objVente = {};
  var arrayVente = [];
  const [IdResto, setIdResto] = React.useState();

  React.useEffect(() => {
    classAPI
      .getRestaurantByOwner(localStorage.getItem("id"))
      .then(function (response) {
        setIdResto(response.restaurant._id);
        classAPI.getCommandeRestaurant(response.restaurant._id).then(function (response) {
        setCommande(response);
        setLoaded(true);
        });
      });
  }, []);


  React.useEffect(() => {
    if (loaded) {
      commande.article.forEach((article) => {
        temp = [...temp, article.name];
      });
      setName([...new Set(temp)]);
    }
  }, [commande]);

  if (loaded) {
    for (const element of commande.article) {
      if (countarticle[element.name]) {
        countarticle[element.name] += 1;
      } else {
        countarticle[element.name] = 1;
      }
    }

   max = Object.entries(countarticle).reduce(
      (max, entry) => (entry[1] > max[1] ? entry : max),
      [0, -Infinity]
    );
    min = Object.entries(countarticle).reduce(
      (min, entry) => (entry[1] < min[1] ? entry : min),
      [0, +Infinity]
    );
  
  averagePanier =
    commande.restaurant.reduce((total, next) => total + next.price, 0) /
    commande.restaurant.length;

    for (const element of commande.article) {
    ventesJour.push({
      date:formatDate(element.created),
      nbArticle: 1,
    });
  }

  ventesJour.map((vente) => {
    objVente[vente.date] == undefined
      ? (objVente[vente.date] = vente.nbArticle)
      : (objVente[vente.date] = objVente[vente.date] + vente.nbArticle);
  });

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');

}

Object.keys(objVente).map((key) => {
  arrayVente = [...arrayVente, { date: key, nbArticle: objVente[key] }];
});

arrayVente.sort((a, b) => {
  let da = new Date(a.date),
    db = new Date(b.date);
  return da - db;
});

  
}

  return !loaded ? (
    <Loading />
  ) : (
    
    <Container>
      <Typography
        variant="h4"
        component="p"
        sx={{
          color: "primary.dark",
          py: theme.spacing(10),
          textAlign: "center",
        }}
      >
        Statistiques des Ventes
      </Typography>
      <Box sx={{ backgroundColor: "primary.light", borderRadius: "10px", textAlign: "center" }}>
      <Typography
        variant="h5"
        component="p"
        sx={{
          pb: theme.spacing(1),
          color: "primary.dark",
        }}
      >
        Le prix panier moyen est :{" "}
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(Math.round(averagePanier *  100) / 100)}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          pb: theme.spacing(1),
          color: "White",
        }}
      >
        Produit le plus vendu : {max[0]} avec {max[1]} vente(s)
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          pb: theme.spacing(1),
          color: "white",
        }}
      >
        Produit le moins vendu : {min[0]} avec {min[1]} vente(s)
      </Typography>
      </Box>
      <Typography
        variant="h5"
        component="p"
        sx={{
          pt: theme.spacing(5),
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        Evolution des ventes de votre restaurant :
      </Typography>
      <Chart id="chart" dataSource={arrayVente}>
        <Series
          valueField="nbArticle"
          argumentField="date"
          name="Evolution des Ventes"
          type="bar"
          color="#FF961F"
        />
      </Chart>

    </Container>

  );
}

export default StatistiquesVente;
