import Typography from "@mui/material/Typography";
import {
  Grid,
  Link
} from "@mui/material";

function NotFound() {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={3}>
          <Typography
            sx={{
              fontStyle: "italic",
              fontSize: "200%",
              color: "secondary.main",
            }}
            variant="h1"
          >
            Uh Oooooh
          </Typography>

          <Typography sx={{ fontSize: "130%" }} variant="h6">
            Cette page n'existe pas...
          </Typography>

          <Link href="/">
            <Typography sx={{ fontSize: "160%" }} variant="h4">
              Retournez à la page d'accueil
            </Typography>
          </Link>
        </Grid>{" "}
      </Grid>{" "}
    </>
  );
}
export default NotFound;
