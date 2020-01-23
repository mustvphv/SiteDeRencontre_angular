# SiteDeRencontre_angular

# Introduction:

Ce projet est un site de rencontre fait avec Angular pour le Front-End et NestJS pour le Back-End avec l'utilisation de TypeORM (pour la gestion des bases de données SQLite *db.sqlite* et *db_messagerie.sqlite*).

Une base de donnée d'une quarantaine d'utilisateurs a déjà été créée (voir *db.sqlite*).


## Lancer le Back-End

Une fois le projet cloné, il faut se placer dans le dossier *back* et lancer la commande:

<pre><code>npm install</code></pre>

Afin d'installer les dépendances dans le dossier local *back/node_modules*.

Ensuite, pour démarrer l'application NestJS, on utilise la commande:

<pre><code>npm run start:dev</code></pre>

## Lancer le Front-End

On se place dans le dossier *front* et on lance la commande:

<pre><code>npm install</code></pre>

Afin d'installer les dépendances dans le dossier local *front/node_modules*.

Ensuite, pour démarrer l'application Angular, on utilise la commande:

<pre><code>ng serve</code></pre>

Par défaut, en lançant cette commande, c'est le port 4200 qui va être utilisé.
Pour voir l'application au niveau du front, il faut ouvrir votre navigateur et aller sur localhost:4200/.

Pour utiliser un autre port, il faut le spécifier, en utilisant la commande suivante (ici pour le port 4300):

<pre><code>ng serve --port 4300</code></pre>

## Exploration du site


Une fois rentré dans le site, on a la possibilité de s'inscrire et de se connecter.

Lors de l'inscription, on utilise des *custom validators* nous permettant d'alerter l'utilisateur si le mot de passe proposé ne respecte pas les conditions de sécurité (on a, par exemple, établi qu'un mot de passe doit contenir au moins deux chiffres et deux lettres et qu'il y ait plus de 8 caractères en tout), si l'email proposé respecte la syntaxe définie, si le pseudo proposé a bien 8 caractères minimum et si tout les champs ont bien été rempli, sinon l'inscription de fonctionnera pas.

Pour vérifier, par exemple, si le pseudo existe déjà ou non, on demande à notre *custom validator* de lancer une requête au serveur qui nous permettra de savoir si un autre utilisateur a déjà été inscrit avec le même pseudo, auquel cas, l'utilisateur devra changer de pseudo pour s'inscrire.


![Optional Text](../master/images-readme/image_projet1.png)

![Optional Text](../master/images-readme/image_projet2.png)


Une fois que l'utilisateur va s'inscire, on va lancer une requête POST sur le serveur NestJS qui va nous permettre d'envoyer les informations afin de les stocker dans une base de données qu'on a appelé *db.sqlite*.
Dans cette base de données seront stockées toutes les informations dont on aura besoin pour la connexion, et pour l'algorithme de matching, le mot de passe est crypté.

Lors de la connexion, si le mot de passe et le pseudo correspondent, le serveur va envoyer au client un token (JWT) permettant à l'utilisateur de se connecter, on a décidé de lui donner une durée de vie de 3 minutes (180 secondes), c'est-à-dire qu'au bout de 3 minutes, l'utilisateur ne pourra plus utiliser son compte et sera déconnecté.

Chaque utilisateur a une route spéciale qui est protégée et qui est inaccessible si on a pas le bon token généré par le serveur.

Une fois connecté, l'utilisateur va pouvoir accéder à son profil avec la photo qu'il avait mise lors de l'inscription, et quelques informations comme son email et son pseudo.

![Optional Text](../master/images-readme/image_projet3.png)

Il a alors la possibilité de cliquer sur deux boutons.

Le bouton *Voir vos messages* lui permet de voir les discussions qu'il avait eu précédemment, ou alors voir les messages qu'il a reçu venant d'autres profils.

![Optional Text](../master/images-readme/image_projet4.png)

Le bouton *Rechercher des profils compatibles* permet à l'utilisateur de lancer la recherche des profils les plus compatibles.

Cette recherche va être faite avec un algorithme de matching, qui va utiliser les informations contenues dans la base de données *db.sqlite*.
Ces informations sont les descriptions et préférences physiques choisies par l'utilisateur lors de son inscription, elles seront comparées avec celles des autres utilisateurs inscrits.

Après ce traitement, les utilisateurs les plus compatibles seront proposés à l'utilisateur comme on peut le voir ci-dessous.

![Optional Text](../master/images-readme/image_projet5.png)

Il y a la possibilité de défiler en swipant ou en appuyant sur les flêches.
On peut ensuite appuyer sur le profil qui nous convient, on arrive alors sur une interface de messagerie, on peut alors envoyer et recevoir des messages avec l'autre utilisateur.

![Optional Text](../master/images-readme/image_projet6.png)


La messagerie a été faite avec SocketIo et NestJS.

Lors du premier message envoyé entre deux utilisateurs, une discussion est créée, chaque discussion est référencée dans la base de donnée avec un id unique, le nom de l'expéditeur et le nom du destinataire.

Chaque nouveau message est lui aussi stocké dans la base de donnée, il est lié à une discussion par une *foreign key* (clé étrangère), (voir champ **discussionId** dans la base de donnée *db_messagerie.sqlite*, qui correspond à l'id d'une discussion déjà enregistrée).
Ce système permettra de retrouver facilement les différents messages, lorsque l'utilisateur se reconnectera.

Au moment où l'on arrive dans l'interface de messagerie, l'historique des messages précédemment envoyés entre les deux utilisateurs est affiché dans l'ordre dans lequel ils ont été envoyés.





