import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./Pages/Home";
import Restaurant from "./Pages/Restaurant";
import Connexion from "./Pages/Connexion";
import Inscription from "./Pages/Inscription";
import MotDePasse from "./Pages/MotDePasse";
import Historique from "./Pages/Historique";
import Recuperation from "./Pages/Recuperation";
import Commande from "./Pages/Livreur/Commande";
import MailEnvoye from "./Pages/MailEnvoye";
import LivraisonClient from "./Pages/Livreur/LivraisonClient";
import LivraisonRestaurant from "./Pages/Livreur/LivraisonRestaurant";
import StatistiquesVente from "./Pages/Restaurateur/StatistiquesVente";
import StatistiquesLogs from "./Pages/ServiceTechnique/StatistiquesLogs";
import MonitoringApp from "./Pages/ServiceCommercial/MonitoringApp";
import StatistiquesApplication from "./Pages/ServiceCommercial/StatistiquesApplication";
import GestionComposant from "./Pages/DeveloppeurTiers/GestionComposant";
import MonResto from "./Pages/Restaurateur/MonResto";
import Parrainage from "./Pages/Parrainage";
import CGV from "./Pages/CGV";
import MentionLegales from "./Pages/MentionLegales";
import Confidentialité from "./Pages/Confidentialite"
import Header from "./Layout/Header";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme/Light.jsx";
import { Box } from "@mui/material";
import NotFound from "./Pages/NotFound";
import Compte from "./Pages/Compte";
import DMZ from "./Pages/DMZ";
import DMZcopy from "./Pages/DMZcopy";
import "./Fonts/gt-america-extended-medium.latin-webfont.woff";
import PrivateRoute from "./API/PrivateRoute";
import CommandesList from "./Pages/Restaurateur/CommandesList";
import DeliveredPage from "./Pages/Scripting/DeliveredPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />

      <Box maxwidth sx={{ my: theme.spacing(8), px: theme.spacing(0) }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />

          <Route exact path="/compte" element={<PrivateRoute />}>
            <Route path="/compte" element={<Compte />} />
          </Route>

          <Route
            exact
            path="/restaurant/:restoID"
            element={<PrivateRoute role="role_client" />}
          >
            <Route path="/restaurant/:restoID" element={<Restaurant />} />
          </Route>

          <Route exact path="/parrainage" element={<PrivateRoute />}>
            <Route path="/parrainage" element={<Parrainage />} />
          </Route>

          <Route
            exact
            path="/historique"
            element={<PrivateRoute role="role_client" />}
          >
            <Route path="/historique" element={<Historique />} />
          </Route>

          <Route
            exact
            path="/livreur/Commandes"
            element={<PrivateRoute role="role_livreur" />}
          >
            <Route path="/livreur/Commandes" element={<Commande />} />
          </Route>

          <Route
            exact
            path="/livreur/livraisonClient/:idCommande"
            element={<PrivateRoute role="role_livreur" />}
          >
            <Route
              path="/livreur/livraisonClient/:idCommande"
              element={<LivraisonClient />}
            />
          </Route>

          <Route path="/motdepasse/oublie" element={<MotDePasse />} />

          <Route path="/motdepasse/mail" element={<MailEnvoye  />} />

          <Route
              path="/motdepasse/recuperation/:email"
              element={<Recuperation />}
            />
          <Route path="/conditionsgenerales" element={<CGV />} />

          <Route path="/mentionlegales" element={<MentionLegales />} />

          <Route path="/confidentialite" element={<Confidentialité />} />

          <Route
            exact
            path="/livreur/LivraisonRestaurant/:idCommande"
            element={<PrivateRoute role="role_livreur" />}
          >
            <Route
              path="/livreur/LivraisonRestaurant/:idCommande"
              element={<LivraisonRestaurant />}
            />
          </Route>

          <Route
            path="/developpeurtiers/gestioncomposant/"
            element={<PrivateRoute role="role_dev" />}
          >
            <Route path="/developpeurtiers/gestioncomposant/" element={<GestionComposant />} />
          </Route>

          <Route
            path="/restaurateur/monrestaurant"
            element={<PrivateRoute role="role_restaurateur" />}
          >
            <Route path="/restaurateur/monrestaurant" element={<MonResto />} />
          </Route>

          <Route
            path="/restaurateur/commandes"
            element={<PrivateRoute role="role_restaurateur" />}
          >
            <Route path="/restaurateur/commandes" element={<CommandesList />} />
          </Route>

          {/* <Route path="/restaurateur/addarticle" element={<Article />} />
        <Route path="/restaurateur/addmenu" element={<Menu />} /> */}

          {/* <Route path="/modifierarticle" element={<ModifierArticle />} />
        <Route path="/modifiermenu" element={<ModifierMenu />} /> */}

          <Route
            path="/technique/logs"
            element={<PrivateRoute role="role_technique" />}
          >
            <Route path="/technique/logs" element={<StatistiquesLogs />} />
          </Route>

          <Route
            path="/restaurateur/statsventes"
            element={<PrivateRoute role="role_restaurateur" />}
          >
            <Route path="/restaurateur/statsventes" element={<StatistiquesVente />} />
          </Route>

          <Route
            path="/commercial/statsapp"
            element={<PrivateRoute role="role_commercial" />}
          >
            <Route path="/commercial/statsapp" element={<StatistiquesApplication />} />
          </Route>

          <Route
            path="/commercial/monitoringapp"
            element={<PrivateRoute role="role_commercial" />}
          >
            <Route path="/commercial/monitoringapp" element={<MonitoringApp />} />
          </Route>
    
          <Route path="/deliveredPage/:idOrder" element={<DeliveredPage/>}/>

          <Route path="/dmz" element={<DMZ />} />
          <Route path="/dmz2" element={<DMZcopy/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
