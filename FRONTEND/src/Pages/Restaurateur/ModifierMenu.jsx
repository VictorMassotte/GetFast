import {
  Container,
  Typography,
  FormControl,
  Button,
  Link,
  Box,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import theme from "../../Theme/Light.jsx";

function ModifierMenu(props) {

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box>
      <Typography
        variant="h4"
        component="p"
        sx={{
          color: "primary.dark",
          py: theme.spacing(10),
          textAlign: "center",
        }}
      >
        Modifier le menu
      </Typography>
      <FormControl variant="filled" fullWidth>
        <TextField fullWidth id="outlined-basic" required label="Nom" variant="filled" />
        <TextField
          label="Description"
          required
          multiline
          rows={4}
          variant="filled"
          sx={{ mt: theme.spacing(3) }}
        />
        <TextField
          fullWidth
          required
          id="outlined-basic"
          label="Prix"
          variant="filled"
          sx={{ mt: theme.spacing(3) }}
        />
      </FormControl>
      <Box sx ={{display: "flex", justifyContent: "space-between", mt: theme.spacing(2)}}>
          <Button
            href=""
            sx={{
              borderRadius: 2,
              backgroundColor: "secondary.main",
              size: "large",
              textTransform: "capitalize",
            }}
            variant="contained"
          >
            Modifier
          </Button>
          <Button
            href=""
            sx={{
              borderRadius: 2,
                backgroundColor: "#F44336",
                '&:hover': {
                    backgroundColor: '#d32f2f',
                    opacity: 0.9,},
                color: "white",
              
              
              textTransform: "capitalize",
            }}
            variant="contained"
          >
            Supprimer le menu
          </Button>
          </Box>
      <Typography
        variant="h5"
        component="p"
        sx={{
          color: "primary.dark",
          mt: theme.spacing(5),
          textAlign: "center",
        }}
      >
        Ou retourner au
      </Typography>
      <Link
        href="/restaurant"
        sx={{
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: "secondary.main",
          }}
        >
          Restaurant
        </Typography>
      </Link>
      </Box>
    </Container>
  );
}

export default ModifierMenu;
