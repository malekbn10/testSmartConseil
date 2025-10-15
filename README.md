# Test Smart Conseil — Application de Gestion des Livres

Une application Full Stack développée avec **Angular16 (frontend)** et **Laravel 10 (backend)**.  
Elle permet de gérer une collection de livres (ajout, modification, suppression, affichage) via une interface simple et intuitive.

---

##  Fonctionnalités principales

###  Frontend (Angular)
- Affichage dynamique de la liste des livres
- Formulaire réactif avec validations
- Messages d’erreur sous chaque champ
- Ajout, édition et suppression d’un livre
- Interface responsive et fluide 

###  Backend (Laravel)
- API RESTful pour la gestion des livres
- Validation et gestion des requêtes HTTP
- Connexion à une base de données MySQL

---

## 🛠️ Technologies utilisées

| Côté | Technologie | Version |
|------|--------------|----------|
| Frontend | Angular | 16 |
| Backend | Laravel | 10 |
| Langages | TypeScript, PHP |
| Base de données | MySQL |
| Serveur local | XAMPP / Laravel Artisan |

---

## 📦 Installation et exécution du projet localement

### 1️ Cloner le dépôt

```bash
git clone https://github.com/malekbn10/testSmartConseil.git
cd testSmartConseil
```
Le projet contient deux dossiers principaux :
testSmartConseil/
├── booksAPI/    # Application Angular
└── booksUI/     # Application Laravel

Installation du backend (Laravel):
```bash
cd booksAPI
composer install
cp .env.example .env

```
### 2 Configuration du fichier .env
Ouvre le fichier .env et configure la base de données :

```bash
APP_NAME=TestSmartConseil
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=books_db
DB_USERNAME=root
DB_PASSWORD=
```
```bash
php artisan key:generate
php artisan migrate
php artisan serve

```
Le backend est maintenant accessible sur :
http://localhost:8000

### 3 Installation du frontend (Angular)

Ouvre un nouveau terminal :
```bash
cd ../booksUI
npm install
ng serve

```
### 4️ Configuration de l’API dans Angular
Ouvre le fichier src/app/services/book.service.ts et assure-toi que l’URL de l’API pointe vers le backend Laravel :
```bash
private baseUrl = 'http://localhost:8000/api/books';
```
