# Bienvenue sur le projet stream app !

Vous êtes actuellement sur le projet de stream app de **Valentin Debray**  et **Fanny Maille**. Ce projet à été réalisé dans le cadre d'un projet étudiant lors d'un cours de perfectionnement tech. Le temps pour réaliser ce projet était de 5 jours.

## Les consignes

Réalisation d'un projet “STREAM” en binôme avec la proposition de 3 niveau de réalisation :
1. **LEVEL 1 => WEB CHAT / STREAM** (Web chat avec visio en websocket)  
Création d'un projet de webchat en utilisant les technologies de notre choix. L'application devra avoir les fonctionnalités suivantes :
	- L’enregistrement des utilisateurs
	- La création de canaux de discussion
	- Un chat “real-time” par canal (optionel : où les messages sont persistés en base)
	- Lancer des visio par canal en utilisant le RPC et les websockets
2. **LEVEL 2 => LIVE STREAMING SERVICE** (Stream sans encodage)  
Création d'un service de streaming en utilisant les technologies de notre choix. L'application devra avoir les fonctionnalités suivantes :
	- L’enregistrement des utilisateurs
	- La création de canaux de stream
	- Un chat “real-time” par canal (optionel : où les messages sont persistés en base)
	- Un utilisateur peut lancer un stream en utilisant le protocol RTSP (Si vous utilisez
NodeJs je vous conseille Node Media Server)
3. **LEVEL 3 => LIVE STREAMING SERVICE AVEC ENCODAGE** (Stream avec encodage en utilisant ffmpeg). 
Création d'un service de streaming en utilisant les technologies de notre choix. L'application devra avoir les fonctionnalités suivantes :
	- L’enregistrement des utilisateurs
	- La création de canaux de stream
	- Un chat “real-time” par canal (optionel : où les messages sont persistés en base)
	- Un utilisateur peut lancer un stream en utilisant le protocol RTSP (Si vous utilisez
	NodeJs je vous conseille Node Media Server)
	- Vous proposez plusieurs flux à des débits différents en utilisant ffmpeg

- **Architecture du projet** :
	- Un front end et un back end séparé
	- Langage libre (Pour vous aider j’ai une préférence React ou Vanilla / NodeJS / MongoDB)
	- Versioning du code : Git

## Outils utilisés

 - NodeJS, javascript, SCSS, HTML
 - concurrently, jsonwebtoken, peer, qs, socket.io, socket.io-client,
   cors, express, bcryptjs, , WebRTC
 - Postman, Mongodb, Vercel, Heroku

## Ce que nous avons fait

Nous avions pour objectifs de partir sur le Projet de niveaux 2. Mais par manque de temps et pour mieux comprendre le protocole RMTP nous avons préférer nous rabattre sur le niveaux 1. 
1. **LEVEL 1 => WEB CHAT / STREAM** (Web chat avec visio en websocket)
- **L’enregistrement des utilisateurs :**
Nous avons réussi à faire un système d'inscription => l'utilisateur doit entrer un nom et mot de passe que nous stockons en base de donnée Mongodb. En base de donnée on attribue un id à ce nouvel utilisateur et pour son mot de passe on l'enregistre de manière crypté.
Nous avons aussi mis en place un système d'authentification des utilisateurs => l'utilisateur entre son nom et son mot de passe et nous vérifions que nous avons un utilisateurs avec ce nom et ce mot de passe qui correspond dans notre base de donnée.
- **La création de canaux de discussion :**
Chacun des utilisateurs peut rejoindre une "room" qui porte le nom d'un des utilisateurs inscrits pour communiquer entre eux. 
- **Un chat “real-time” par canal** 
Dans chaque "room" les utilisateurs uniquement dans cette "room" peuvent communiquer en temps réels entre eux. Les messages envoyés dans une "room" sont uniquement envoyé dans cette room.
- **Lancer des visio par canal en utilisant le RPC et les websockets**
Nous avons réussi à faire en sorte qu'un utilisateur qui se connecte à une room puisse lancer sa vidéo "webcam" de son ordinateur et que celle-ci soit retransmis aux autres utilisateurs présents dans la même room.
- **Architecture du projet** :
Nous avons séparés ce projet en 2 : Partie front et Partie back (=notre API). Notre front fait appel à notre API.
Les deux dépôts sont présents sur git :  
FRONT : https://github.com/ValouZ/stream-app-front.git
BACK : https://github.com/ValouZ/stream-app-API.git

## Problèmes rencontrés

- **Lancer des visio par canal en utilisant le RPC et les websockets**

Nous n'avons réussi complètement cette partie.

Nous n'avons pas réussi à lancer le server peers en ligne. De ce fait notre vidéo n'est pas envoyé aux autres utilisateurs. Pour tester cette fonctionnalité il faut tester le projet en local.
Il faut alors aller dans le fichier wschat.js du front et 
- enlever les commentaires les lignes : 24-38 ; 92-103 ; 113-148
- mettre en commentaire les lignes : 40-45

Aussi nous avons rencontrés des erreurs au moment ou le premier utilisateur qui a rejoint la "room" la quitte. La vidéo de sa webcam se coupe et se frise mais ne se supprime pas. Nous savons que cette erreur est dû au fait que le call avec l'ID du premier utilisateur n'est pas enregistré dans l'objet peers au depart. Cependant nous n'avons pas trouver de solution à ce problème.

## Projet en ligne

Nous avons réussi à déployer le projet en ligne. Vous pouvez allez le visiter à cette adresse :
[https://stream-app-front.vercel.app/](https://stream-app-front.vercel.app/ "https://stream-app-front.vercel.app/")
Cependant en ligne nous n'avons pas réussi à lancer le server peers. De ce fait notre vidéo n'est pas envoyé aux autres utilisateurs. Pour tester cette fonctionnalité il faut tester le projet en local.
