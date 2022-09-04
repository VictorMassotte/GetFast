import { Typography, Container, Box } from "@mui/material";
import theme from "../Theme/Light.jsx";

function Confidentialite(props) {
  const cgvlist = [
    {
      article: "Qui sommes-nous ?",
      texte: "L’adresse de notre site Web est : https://getfast.fr/",
    },
    {
      article: "Utilisation des données personnelles collectées",
      texte:
        "Quand vous laissez un commentaire sur notre site web, les données inscrites dans le formulaire de commentaire, mais aussi votre adresse IP et l’agent utilisateur de votre navigateur sont collectés pour nous aider à la détection des commentaires indésirables. Une chaîne anonymisée créée à partir de votre adresse de messagerie (également appelée hash) peut être envoyée au service Gravatar pour vérifier si vous utilisez ce dernier. Les clauses de confidentialité du service Gravatar sont disponibles ici : https://automattic.com/privacy/. Après validation de votre commentaire, votre photo de profil sera visible publiquement à coté de votre commentaire.",
    },
    {
      article: "Médias",
      texte:
        "Si vous êtes un utilisateur ou une utilisatrice enregistré·e et que vous téléversez des images sur le site web, nous vous conseillons d’éviter de téléverser des images contenant des données EXIF de coordonnées GPS. Les visiteurs de votre site web peuvent télécharger et extraire des données de localisation depuis ces images.",
    },
    {
      article: "Formulaires de contact",
      texte:
        "L’adresse e-mail utilisée pour chaque formulaire de contact ne sera pas collectée. Elle sera utilisée simplement pour finir une réponse directe au message envoyé.",
    },
    {
      article: "Cookies",
      texte:
        "Si vous déposez un commentaire sur notre site, il vous sera proposé d’enregistrer votre nom, adresse de messagerie et site web dans des cookies. C’est uniquement pour votre confort afin de ne pas avoir à saisir ces informations si vous déposez un autre commentaire plus tard. Ces cookies expirent au bout d’un an. Si vous vous rendez sur la page de connexion, un cookie temporaire sera créé afin de déterminer si votre navigateur accepte les cookies. Il ne contient pas de données personnelles et sera supprimé automatiquement à la fermeture de votre navigateur. Lorsque vous vous connecterez, nous mettrons en place un certain nombre de cookies pour enregistrer vos informations de connexion et vos préférences d’écran. La durée de vie d’un cookie de connexion est de deux jours, celle d’un cookie d’option d’écran est d’un an. Si vous cochez « Se souvenir de moi », votre cookie de connexion sera conservé pendant deux semaines. Si vous vous déconnectez de votre compte, le cookie de connexion sera effacé. En modifiant ou en publiant une publication, un cookie supplémentaire sera enregistré dans votre navigateur. Ce cookie ne comprend aucune donnée personnelle. Il indique simplement l’ID de la publication que vous venez de modifier. Il expire au bout d’un jour.",
    },
    {
      article: "Contenu embarqué depuis d’autres sites",
      texte:
        "Les articles de ce site peuvent inclure des contenus intégrés (par exemple des vidéos, images, articles…). Le contenu intégré depuis d’autres sites se comporte de la même manière que si le visiteur se rendait sur cet autre site. Ces sites web pourraient collecter des données sur vous, utiliser des cookies, embarquer des outils de suivis tiers, suivre vos interactions avec ces contenus embarqués si vous disposez d’un compte connecté sur leur site web.",
    },
    {
      article: "Utilisation et transmission de vos données personnelles",
      texte:
        "Vos données ne seront jamais fournies à des tiers étrangers à https://getfast.fr/.",
    },
    {
      article: "Durées de stockage de vos données",
      texte:
        "Si vous laissez un commentaire, le commentaire et ses métadonnées sont conservés indéfiniment. Cela permet de reconnaître et approuver automatiquement les commentaires suivants au lieu de les laisser dans la file de modération. Pour les utilisateurs et utilisatrices qui s’inscrivent sur notre site (si cela est possible), nous stockons également les données personnelles indiquées dans leur profil. Tous les utilisateurs et utilisatrices peuvent voir, modifier ou supprimer leurs informations personnelles à tout moment (à l’exception de leur nom d’utilisateur·ice). Les gestionnaires du site peuvent aussi voir et modifier ces informations.",
    },
    {
      article: "Les droits que vous avez sur vos données",
      texte:
        "Si vous avez un compte ou si vous avez laissé des commentaires sur le site, vous pouvez demander à recevoir un fichier contenant toutes les données personnelles que nous possédons à votre sujet, incluant celles que vous nous avez fournies. Vous pouvez également demander la suppression des données personnelles vous concernant. Cela ne prend pas en compte les données stockées à des fins administratives, légales ou pour des raisons de sécurité.",
    },
    {
      article: "Transmission de vos données personnelles",
      texte:
        "Les commentaires des visiteurs peuvent être vérifiés à l’aide d’un service automatisé de détection des commentaires indésirables.",
    },
    {
      article: "Informations de contact",
      texte:
        "Pour toute demande, vous avez la possibilité de nous joindre à l’adresse contact@getfast.fr",
    },
    {
      article: "Comment nous protégeons vos données",
      texte: "Le site https://getfast.fr/ est protégé par le chiffrement SSL.",
    },
  ];

  return (
    <Container>
      <Typography
        variant="h4"
        component="p"
        sx={{
          color: "primary.dark",
          textAlign: "center",
          py: theme.spacing(9),
        }}
      >
        Politique de Confidentialité
      </Typography>
      {cgvlist.map((textes) => (
        <Box
          sx={{
            backgroundColor: "primary.main",
            py: theme.spacing(5),
            px: theme.spacing(2),
            my: theme.spacing(4),
            borderRadius: "10px",
          }}
        >
          <Typography variant="h5" component="p" sx={{ color: "primary.dark" }}>
            {textes.article}
            <Typography variant="h6" component="p" sx={{ color: "white" }}>
              {textes.texte}
            </Typography>
          </Typography>
        </Box>
      ))}
    </Container>
  );
}

export default Confidentialite;
