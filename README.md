# memento
[Notion](https://owen-calvin.notion.site/Application-web-II-924bc8c9573b4b7390ef0f1394d36b60)


# Initialisation du projet
1. Installez [composer](https://getcomposer.org/)
2. Installez [Node.js](https://nodejs.org/en/) (Version LTS)
3. Lancez les commandes suivantes
```sh
mkdir memento
cd memento

# Création du projet de base du backend avec Laravel Lumen
composer create-project --prefer-dist laravel/lumen memento-back

# Création du projet de base du frontend React avec TypeScript
npx create-react-app memento-front --template typescript

# Installation des paquet sur le frontend
cd memento-front
npm i styled-components rebass

cd ..
```

# Démarrer le backend
```sh
cd memento-back
php -S localhost:8000 -t public

cd ..
```

# Démarrer le frontend
```sh
cd memento-front
npm start

cd ..
```
