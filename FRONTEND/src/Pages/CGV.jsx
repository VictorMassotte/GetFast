import { Typography, Container, Box } from "@mui/material";
import theme from "../Theme/Light.jsx";

function CGV(props) {
  const cgvlist = [
    {
      article: "Article 1. Objet",
      texte:
        "Les présentes conditions de vente visent à définir les relations contractuelles entre GETFAST et l’acheteur et les conditions applicables à tout achat effectué par le biais du site internet gestfast.fr. L’acquisition d’un produit à travers le présent site implique une acceptation sans réserve par l’acheteur des présentes conditions de vente dont l’acheteur reconnaît avoir pris connaissance préalablement à sa commande. Avant toute transaction, l’acheteur déclare d’une part que l’achat de produits sur le site gestfast.fr. est sans rapport direct avec son activité professionnelle et est limité à une utilisation strictement personnelle et d’autre part avoir la pleine capacité juridique, lui permettant de s’engager au titre des présentes conditions générales de ventes. GETFAST conserve la possibilité de modifier à tout moment ces conditions de ventes, afin de respecter toute nouvelle réglementation ou dans le but d'améliorer l’utilisation de son site. De ce fait, les conditions applicables seront celles en vigueur à la date de la commande par l’acheteur.",
    },
    {
      article: "Article 2. Produits",
      texte:
        "Les produits proposés sont ceux qui figurent sur le site gestfast.fr appartenant à GETFAST, dans la limite des stocks disponibles. GETFAST se réserve le droit de modifier à tout moment l’assortiment de produits. Chaque produit est présenté sur le site internet sous forme d’un descriptif reprenant ses principales caractéristiques techniques. Les photographies sont les plus fidèles possibles mais n’engagent en rien le vendeur. La vente des produits présentés dans le site greenbee.eu est destinée à tous les acheteurs résidant dans les pays qui autorisent pleinement l’entrée sur leur territoire de ces produits.",
    },
    {
      article: "Article 3. Tarifs",
      texte:
        "Les prix figurant sur les fiches produits du catalogue internet et sont des prix en euros (€) toutes taxes comprises (TTC) tenant compte de la TVA applicable au jour de la commande. Tout changement du taux de la TVA pourra être répercuté sur le prix des produits. GETFAST se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable à l’acheteur. Les prix indiqués ne comprennent pas les frais de livraison, facturés en supplément du prix des produits achetés suivant le montant total de la commande.",
    },
    {
      article: "Article 4. Réserve de propriété",
      texte:
        "GETFAST conserve la propriété pleine et entière des produits vendus jusqu'au parfait encaissement du prix, en principal, frais et taxes compris.",
    },
    {
      article: "Article 5. Rétractation",
      texte:
        "En vertu de l’article L121-20 du code de la consommation, l’acheteur dispose d'un délai de 14 jours ouvrables à compter de la livraison de leur commande pour exercer son droit de rétractation et ainsi faire retour du produit au vendeur pour échange ou remboursement sans pénalité, à l’exception des frais de retour.",
    },
    {
      article: "Article 6. Garantie",
      texte:
        "Tous les produits fournis par GETFAST bénéficient de la garantie légale prévue par les articles 1641 et suivants du code civil. En cas de non-conformité d’un produit vendu, il pourra être retourné à GETFAST qui le reprendra, l’échangera ou le remboursera. Toutes les réclamations, demandes d’échange ou de remboursement doivent s’effectuer par voie postale à l’adresse suivante : 93 boulevard de le seine Nanterre 92000, dans un délai de trente jours après livraison.",
    },
    {
      article: "Article 7. Responsabilité",
      texte:
        "Dans le processus de vente à distance, GETFAST n’est tenue que par une obligation de moyens. Sa responsabilité ne pourra être engagée pour un dommage résultant de l’utilisation du réseau Internet tel que perte de données, intrusion, virus, rupture du service ou autres problèmes involontaires.GETFAST ne peut être tenu responsable des informations diffusées sur ce site ni de l'utilisation qui en est faîtes par les utilisateurs. Il est de la responsabilité du visiteur de vérifier les informations auprès des professionnels de santé et de vérifier si sa démarche est compatible avec son cas personnel, auprès d'un professionnel de santé ou de son médecin traitant. Les informations contenues sur ce site ne sont pas destinées à remplacer l'avis d'un médecin ou d'un praticien du domaine de la santé. Elles sont données à titre purement informatif, aucun diagnostic ou prescription médicale n'est proposée. Il est vivement recommandé à toute personne sous traitement de ne pas interrompre brutalement celui-ci et il est admis qu'un tel arrêt se fait progressivement et sous supervision médicale.",
    },
    {
      article: "Article 8. Propriété intellectuelle",
      texte:
        "Tous les éléments du site getfast.fr sont la propriété intellectuelle et exclusive de GETFAST. Personne n’est autorisé à reproduire, exploiter, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu’ils soient sous forme de photo, logo, visuel ou texte.",
    },
    {
      article: "Article 9. Données à caractère personnel",
      texte:
        "GETFAST s'engage à préserver la confidentialité des informations fournies par l’acheteur, qu'il serait amené à transmettre pour l'utilisation de certains services. Toutes informations le concernant est soumise aux dispositions de la loi n° 78-17 du 6 janvier 1978. À ce titre, l'internaute dispose d'un droit d'accès, de modification et de suppression des informations le concernant. Il peut en faire la demande à tout moment soit par email à l’adresse suivante : contact@getfast.fr soit par courrier à l’adresse suivante : 93 boulevard de la seine, 92000 NANTERRE.",
    },
    {
      article: "Article 12. Règlement des litiges",
      texte:
        "Les présentes conditions de vente à distance sont soumises à la loi française. Pour tous litiges ou contentieux, le tribunal compétent sera celui de Nanterre.",
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
        Conditions Générales de Ventes
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

export default CGV;
