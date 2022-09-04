import { Button, Container, Grid, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import API from "../../API/API";
import Loading from "../../Components/Loading";
import theme from "../../Theme/Light.jsx";
import { Chart, Series, ConstantLine, Label } from "devextreme-react/chart";

function StatistiquesApplication(props) {
  const classAPI = new API();
  const [commandes, setCommandes] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const countUser = {};
  const ventesJour = [];
  var arrayVente = [];
  var objVente = {};
  React.useEffect(() => {
    classAPI.getUsers().then(function (response) {
      setUser(response);
    });
    classAPI.getCommandes().then(function (response) {
      setCommandes(response);
      setLoaded(true);
    });
  }, []);

  React.useEffect(() => {
    if (loaded) {
      user.forEach((element) => console.log());
    }
  }, [user]);

  React.useEffect(() => {
    if (loaded) {
      commandes.forEach((element) => console.log());
    }
  }, [commandes]);

  for (const element of user) {
    if (countUser[element.role]) {
      countUser[element.role] += 1;
    } else {
      countUser[element.role] = 1;
    }
  }

  if (loaded) {
    for (const element of commandes) {
      ventesJour.push({
        date: formatDate(element.created),
        nbArticle: element.article.length,
      });
    }

    ventesJour.map((vente) => {
      objVente[vente.date] == undefined
        ? (objVente[vente.date] = vente.nbArticle)
        : (objVente[vente.date] = objVente[vente.date] + vente.nbArticle);
    });

    Object.keys(objVente).map((key) => {
      arrayVente = [...arrayVente, { date: key, nbArticle: objVente[key] }];
    });

    arrayVente.sort((a, b) => {
      let da = new Date(a.date),
        db = new Date(b.date);
      return da - db;
    });

    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
    console.log(arrayVente);
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
        Statistiques de l'application
      </Typography>
      <Box sx={{ backgroundColor: "primary.light", borderRadius: "10px", textAlign: "center" }}>
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: "primary.dark",
            py: theme.spacing(2),
          }}
        >
          Il y {user.length > 1? user.length + " utilisateurs " : user.length + " utilisateur "}  sur l'application{" "}
        </Typography>
        {Object.keys(countUser).map((key) => {
          return (
            <>
              {console.log(key)}
              <Typography
                variant="h6"
                component="p"
                sx={{
                  color: "white",
                  py: theme.spacing(1),
                }}
              >
                {countUser[key] >1 ? countUser[key] + " utilisateurs " : countUser[key] + " utilisateur "}avec le role{" "}
                {key === "role_client"
                  ? "Client"
                  : key === "role_restaurateur"
                  ? "Restaurateur"
                  : key === "role_livreur"
                  ? "Livreur"
                  : key === "role_dev"
                  ? "Developpeur"
                  : key === "role_commercial"
                  ? "Commercial"
                  : "Technique"}
              </Typography>
            </>
          );
        })}
      </Box>
      <Box sx={{ py: theme.spacing(5) }}>
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: "primary.dark",
            py: theme.spacing(2),
          }}
        >
          Evolution des ventes de tous les restaurants en fonction du temps :
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
      </Box>
    </Container>
  );
}

export default StatistiquesApplication;
