import {
  Button,
  Container,
  Box
} from "@mui/material";
import Typography from "@mui/material/Typography";
import theme from "../../Theme/Light.jsx";
import API from "../../API/API.jsx";


function StatistiquesLogs(props) {

  const classAPI = new API();

  return (
    <Container>
        <Typography variant="h4"
        component="p"
        sx={{
          color: "primary.dark",
          py: theme.spacing(10),
          textAlign: "center",
        }}>
                Statistiques de performances et Logs
            </Typography>
      <Box sx={{textAlign:"center"}}>
        <Box sx={{backgroundColor: "primary.light", my: theme.spacing(5), py:theme.spacing(2), borderRadius:"10px"}}>
            <Typography variant="h6"
        component="p" sx={{color: "primary.dark"}}>
                Vous pouvez télécharger l'historique de connexion ici : 
            </Typography>
          
          <Button
    sx={{
      borderRadius: 2,
      backgroundColor: "secondary.main",
      size: "large",
      mt: theme.spacing(3),
    }}
    variant="contained"
   href={classAPI.getURL()+"/service/download"}
  >
    Voir les Logs de connexion
  </Button>
        </Box>
        <Box sx={{backgroundColor: "primary.light", my: theme.spacing(5), py:theme.spacing(2), borderRadius:"10px"}}>
            <Typography variant="h6"
        component="p" sx={{color: "primary.dark"}}>
            Vous pouvez voir qui a telechargé le package des composants de notre
          application ici :
            </Typography>
          
          <Button
    sx={{
      borderRadius: 2,
      backgroundColor: "secondary.main",
      size: "large",
      mt: theme.spacing(3),
    }}
    variant="contained"
   href={ "https://npm-stat.com/api/download-counts?package=@loumads/my-appgetfast&from=2022-06-01&until=2022-06-30"}
  >
     Voir les Logs de telechargement des composants
  </Button>
        </Box>
        <Box sx={{backgroundColor: "primary.light", py:theme.spacing(2), borderRadius:"10px"}}>
        <Typography variant="h6"
        component="p" sx={{color: "primary.dark"}}>
          Vous pouvez voir les statistiques de performance serveur (performances des serveurs et micro-services) ici : 
            </Typography>
          <Button
            sx={{
              borderRadius: 2,
              backgroundColor: "secondary.main",
              size: "large",
              mt: theme.spacing(3),
              mr: theme.spacing(2),
            }}
            variant="contained"
            href={"http://91.236.239.56:3000/d/pMEd7m0Mz/dashboard-des-services?orgId=1"}
          >
            Voir les statistiques des services
          </Button>
          <Button
            sx={{
              borderRadius: 2,
              backgroundColor: "secondary.main",
              size: "large",
              mt: theme.spacing(3),
            }}
            variant="contained"
            href={"http://91.236.239.56:3000/d/rYdddlPWk/dashboard-serveur?orgId=1&refresh=1m"}
          >
            Voir les statistiques du serveur
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default StatistiquesLogs;
