import { Button, Container, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import theme from "../../Theme/Light.jsx";

function MonitoringApp(props) {
    return(
        <Container>
            <Typography variant="h4"
        component="p"
        sx={{
          color: "primary.dark",
          py: theme.spacing(10),
          textAlign: "center",
        }}>
                Monitoring de l'application
            </Typography>
        <Box sx={{backgroundColor: "primary.light", py:theme.spacing(2), borderRadius:"10px", textAlign:"center"}}>
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
        </Container>
    );
};
export default MonitoringApp;
