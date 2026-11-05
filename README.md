# TP1 - Tickets de maintenance

## Présentation

Cette application Vue.js affiche une liste de tickets de maintenance.
Les tickets sont fournis par une API REST locale créée avec JSON Server.

## Technologies utilisées

- Vue 3
- TypeScript
- Vite
- Axios
- JSON Server

## Prérequis

Il faut installer Node.js et npm.

## Installation

```powershell
cd D:\projet-vue\tickets-maintenance
npm install
```

## Lancement de l'application

Dans un premier terminal, lancer l'API :

```powershell
npx json-server db.json --port 3000
```

L'API est disponible à l'adresse `http://localhost:3000/tickets`.

Dans un deuxième terminal, lancer Vue :

```powershell
npm run dev
```

Ouvrir ensuite l'adresse indiquée par Vite, généralement
`http://localhost:5173`.

## Fonctionnalités réalisées

- Affichage des tickets ;
- message pendant le chargement ;
- message si le serveur est arrêté ;
- recherche par titre ;
- filtre par statut ;
- filtre par priorité ;
- utilisation de plusieurs filtres en même temps ;
- nombre de tickets visibles ;
- message lorsqu'aucun ticket ne correspond ;
- badges pour la priorité et le statut.

## Explications

### Différence entre une API REST et `db.json`

`db.json` contient les données des tickets. JSON Server lit ce fichier et crée
une API REST accessible avec des adresses HTTP comme `GET /tickets`.

### Pourquoi utiliser `onMounted()` ?

`onMounted()` exécute du code lorsque le composant Vue est affiché. Il permet
ici de demander les tickets à l'API dès l'ouverture de la page.

### Rôle d'Axios

Axios permet d'envoyer des requêtes HTTP. Ici, il demande les tickets à
`http://localhost:3000/tickets`.

### Différence entre `ref()` et `computed()`

`ref()` crée une donnée réactive qui peut changer, comme la liste des tickets
ou le texte de recherche. `computed()` calcule automatiquement une valeur à
partir de données réactives ; ici, il calcule la liste filtrée.

## Captures demandées

Placer ces fichiers dans le dossier `captures/` :

1. `capture-01-api-json.png` : réponse de l'API `/tickets` ;
2. `capture-02-tous-les-tickets.png` : affichage des trois tickets ;
3. `capture-03-recherche.png` : résultat d'une recherche ;
4. `capture-04-filtres-combines.png` : résultat des deux filtres ;
5. `capture-05-erreur-serveur.png` : message après l'arrêt de JSON Server.

## Vérification

```powershell
npm run build
```

## Difficultés rencontrées

À compléter avec vos difficultés personnelles pendant le TP.
