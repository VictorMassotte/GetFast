import { Button, Container, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import theme from "../../Theme/Light.jsx";
function GestionComposant(props) {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
        Gestion des Composants
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", width: "fit-content" }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: "primary.dark",
            textAlign: "center",
          }}
        >
          Vous pouvez voir qui a telechargé le package des composants de notre
          application ici :
        </Typography>
        <Button
          sx={{
            borderRadius: 2,
            backgroundColor: "secondary.main",
            size: "large",
            mt: theme.spacing(2),
            alignSelf: "center",
            width: "fit-content"
          }}
          variant="contained"
          href={
            "https://npm-stat.com/api/download-counts?package=@loumads/my-appgetfast&from=2022-06-01&until=2022-06-30"
          }
        >
          Voir les Logs de telechargement
        </Button>
        <Typography
          variant="h6"
          component="p"
          sx={{
            mt: theme.spacing(5),
            color: "primary.dark",
            textAlign: "center",
          }}
        >
          Vous pouvez telecharger le package des composants de notre application
          ici :
        </Typography>
        <Button
          sx={{
            borderRadius: 2,
            backgroundColor: "secondary.main",
            size: "large",
            mt: theme.spacing(2),
            alignSelf: "center",
            width: "fit-content"
          }}
          variant="contained"
          href={"https://www.npmjs.com/package/@loumads/my-appgetfast"}
        >
          Telecharger les composants
        </Button>
        <Box sx={{ my: theme.spacing(5),  py: theme.spacing(2), mx: theme.spacing(2),px: theme.spacing(2)}}>
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: "primary.dark",
            textAlign: "center",
          }}
        >
          Nos composants :
          <Box sx={{backgroundColor: "primary.main",  boxShadow: 3,borderRadius: "10px", my: theme.spacing(2),px: theme.spacing(2),  py: theme.spacing(2)}}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "primary.dark",
              textAlign: "justify",
            }}
          >
            - BlocCommande : 
            </Typography>
            <Typography
            variant="h6"
            component="p"
            sx={{
              color: "white",
              textAlign: "justify",
            }}
          >
            Ce composant permet d'afficher les commandes, il
            est utiliser pour les utilisateurs pour afficher l'historique de
            commande.
          </Typography>
          </Box>
          <Box sx={{backgroundColor: "primary.main",  boxShadow: 3,borderRadius: "10px", my: theme.spacing(2),px: theme.spacing(2), py: theme.spacing(2)}}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "primary.dark",
              textAlign: "justify",
            }}
          >
            - Loading : 
            </Typography>
            <Typography
            variant="h6"
            component="p"
            sx={{
              color: "white",
              textAlign: "justify",
            }}
          >
            Ce composant permet d'afficher une animation lors du
            chargement d'une page.
          </Typography>
          </Box>
          <Box sx={{backgroundColor: "primary.main",  boxShadow: 3,borderRadius: "10px", my: theme.spacing(2),px: theme.spacing(2),  py: theme.spacing(2)}}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "primary.dark",
              textAlign: "justify",
            }}
          >
            - Menu : 
            </Typography>
            <Typography
            variant="h6"
            component="p"
            sx={{
              color: "white",
              textAlign: "justify",
            }}
          >
            Il permet d'afficher les menus de chaque restaurant.
          </Typography>
          </Box>
          <Box sx={{backgroundColor: "primary.main",  boxShadow: 3,borderRadius: "10px", my: theme.spacing(2),px: theme.spacing(2), py: theme.spacing(2)}}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "primary.dark",
              textAlign: "justify",
            }}
          >
            - NouvelleCommande :
            </Typography> 
            <Typography
            variant="h6"
            component="p"
            sx={{
              color: "white",
              textAlign: "justify",
            }}
          >
            Il permet au livreur d'accepeter ou de refuser
            une commande.
          </Typography>
          </Box>
          <Box sx={{backgroundColor: "primary.main",  boxShadow: 3,borderRadius: "10px", my: theme.spacing(2),px: theme.spacing(2),  py: theme.spacing(2)}}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "primary.dark",
              textAlign: "justify",
            }}
          >
            
            - Produit :
            </Typography>
            <Typography
            variant="h6"
            component="p"
            sx={{
              color: "white",
              textAlign: "justify",
            }}
          >
             Il permet d'afficher les articles de chaque restaurant.
          </Typography>
          </Box>
          <Box sx={{backgroundColor: "primary.main",  boxShadow: 3,borderRadius: "10px", my: theme.spacing(2),px: theme.spacing(2),  py: theme.spacing(2)}}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "primary.dark",
              textAlign: "justify",
            }}
          >
            - RestoCard :
            </Typography>
            <Typography
            variant="h6"
            component="p"
            sx={{
              textAlign: "justify",
              color: "white",
            }}
          >
          
             Ce composant permet d'afficher chaque restaurant, dans
            un bloc donné.
          </Typography>
          </Box>
        </Typography>
        </Box>
      </Box>

    </Container>
  );
}

export default GestionComposant;
