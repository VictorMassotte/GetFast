import {
    Container,
    Typography,
    FormControl,
    Button,
    Link,
  } from "@mui/material";
  import TextField from "@mui/material/TextField";
  import theme from "../../Theme/Light.jsx";
  
  function CreerMenu(props) {
    return (
      <Container
        maxWidth="sm"
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
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
          Ajouter un nouveau Menu
        </Typography>
        <FormControl variant="filled" fullWidth>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            label="Description"
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
        <Button
          href=""
          sx={{
            borderRadius: 2,
            backgroundColor: "secondary.main",
            size: "large",
            mt: theme.spacing(3),
            textTransform: "capitalize",
          }}
          variant="contained"
        >
          Ajouter
        </Button>
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: "primary.dark",
            mt: theme.spacing(5),
          }}
        >
          Ou retourner au
        </Typography>
        <Link
          href="/restaurant"
          sx={{
            textDecoration: "none",
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
      </Container>
    );
  }
  
  export default CreerMenu;
  