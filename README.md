# GETFAST APPLICATION - PROJET LIVRAISON DE REPAS

## INTRODUCTION

Ce projet a pour but de vous faire concevoir, réaliser, déployer, tester et utiliser une plate forme logicielle distribuée. La vocation métier de cette plateforme est la convergence et le traitement des offres commerciales dans le domaine de la restauration. Plusieurs types d'utilisateurs peuvent consommer les services offerts par cette plate forme : l'utilisateur final, le restaurateur, le livreur, le développeur tiers, le service commercial (entreprise porteuse de l'offre de convergence), le service technique (entreprise porteuse de l'offre de convergence). Il s'agit donc d'un service d'offre de restauration par internet. Elle est le concentrateur technique pour la gestion des workflows. Elle propose une gamme de services variés à destination de profils utilisateurs différents.

Ce projet comporte tous les éléments techniques étudiés lors de votre 4em d'année d'études, mais également fait appel à l'ensemble des autres notions étudiées lors des années précédentes. Il constitue l'aboutissement technique de vos années d'études en informatique en école d'ingénieurs. Il a pour vocation d'être des plus réalistes et donc, comme dans un projet d'ingénierie en entreprise, vous disposez pour le réaliser de certaines connaissances, mais pas toutes. Il vous faudra alors, comme dans un projet réel, vous confronter à des problématiques jusqu'alors inconnues.

Ce projet, fait donc appel à l'ensemble de vos connaissances acquises depuis la première année jusqu'à ce jour. Il comporte des parties non couvertes par le bloc de manière à ressembler le plus possible à un projet réel d'entreprise. Certaines sections sont relativement bien décrites, d'autres non. Il vous faudra analyser le cahier des charges en profondeur, faire remonter les incertitudes et les traiter.

## DOCUMENTATION TECHNIQUE

- SOA vs micro-services
- Architecture micro-services
- API REST
- NodeJS
- RGPD
- JWT

## DEPLOIEMENT DE GETFAST
* Création de l'image API GATEWAY : [Script Linux](https://github.com/VictorMassotte/GetFast/blob/main/DOCKERFILE/Deploy%20MicroServices/prod-api-gateway.sh)
* Création des images des API microservices : [Script Linux](https://github.com/VictorMassotte/GetFast/blob/main/DOCKERFILE/Deploy%20MicroServices/prod-api-microservices.sh)
* Déploiement des API microservices : [DockerFile](https://github.com/VictorMassotte/GetFast/tree/main/DOCKERFILE/Server%20n%C2%B01%20MicroServices)
* Déploiement de l'API GATEWAY: [DockerFile](https://github.com/VictorMassotte/GetFast/blob/main/DOCKERFILE/Server%20API%20GATEWAY/docker-compose)

## DOCUMENTATION API

Documentation de l'API: [API DOCUMENTATION](https://documenter.getpostman.com/view/21488670/UzBpKRcj#3e410031-03a4-4d33-8948-bcde4d5db54e)

## AUTEURS
- Victor Massotte
- Lorry Kiavue
- Mattie Langlois
- Amine Dahmar
- Mohamad Alkhado
