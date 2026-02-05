# 🔐 OAuth JWT Demo - Multi-Provider Authentication

Application de démonstration d'authentification avec **JWT** et **OAuth 2.0** supportant plusieurs providers.

## ✨ Fonctionnalités

### Méthodes d'authentification supportées :
- ✅ **Login local** (Email + Password)
- ✅ **Google OAuth 2.0**
- ✅ **GitHub OAuth**
- ✅ **Discord OAuth**

### Architecture :
- **Backend** : Express.js + MongoDB + Passport.js + JWT
- **Frontend** : Vue.js 3 + Vue Router + Axios
- **Sécurité** : JWT stateless, tokens expirables, hash bcrypt

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v16+)
- MongoDB
- Clés OAuth (voir [QUICK_START.md](./QUICK_START.md))

### Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd oauth_project

# Backend
cd backend
npm install
cp .env.example .env
# ⚠️ Configurer les clés OAuth dans .env

# Frontend
cd ../frontend
npm install
```

### Configuration OAuth

📖 **Guide détaillé** : Voir [QUICK_START.md](./QUICK_START.md) pour obtenir vos clés OAuth

Ou suivez le guide complet : [OAUTH_SETUP.md](./OAUTH_SETUP.md)

### Lancement

```bash
# Terminal 1 - MongoDB
mongod

# Terminal 2 - Backend
cd backend
npm run dev

# Terminal 3 - Frontend
cd frontend
npm run dev
```

Accédez à : http://localhost:5173

---

## 📁 Structure du projet

```
oauth_project/
├── backend/
│   ├── config/
│   │   └── passport.js          # Stratégies OAuth (Google, GitHub, Discord)
│   ├── middleware/
│   │   └── auth.js              # Middleware JWT
│   ├── models/
│   │   └── User.js              # Modèle utilisateur MongoDB
│   ├── routes/
│   │   └── auth.js              # Routes d'authentification
│   ├── server.js                # Point d'entrée backend
│   ├── .env                     # Variables d'environnement (ne pas committer!)
│   └── .env.example             # Template des variables
├── frontend/
│   ├── src/
│   │   ├── views/
│   │   │   ├── Login.vue        # Page de connexion (4 méthodes)
│   │   │   ├── Register.vue     # Inscription locale
│   │   │   ├── Home.vue         # Page d'accueil protégée
│   │   │   └── AuthCallback.vue # Gestion du callback OAuth
│   │   ├── router/
│   │   │   └── index.js         # Routes Vue Router
│   │   ├── services/
│   │   │   └── api.js           # Client API Axios + JWT
│   │   ├── App.vue
│   │   └── main.js
│   └── .env                     # URL de l'API
├── QUICK_START.md               # Guide rapide pour obtenir les clés OAuth
├── OAUTH_SETUP.md               # Documentation complète OAuth
└── README.md                    # Ce fichier
```

---

## 🔒 Sécurité

### Bonnes pratiques implémentées :
- ✅ Mots de passe hashés avec bcrypt
- ✅ Tokens JWT avec expiration
- ✅ Variables d'environnement pour les secrets
- ✅ `.gitignore` pour les fichiers sensibles
- ✅ Validation des données côté backend
- ✅ CORS configuré
- ✅ Protection HTTPS recommandée en production

### ⚠️ Ne JAMAIS committer :
- `backend/.env` (contient les secrets OAuth)
- `node_modules/`
- Tokens ou mots de passe

---

## 🎯 Flux d'authentification OAuth

```
1. Utilisateur clique "Se connecter avec [Provider]"
   ↓
2. Redirection vers /auth/[provider] (backend)
   ↓
3. Passport redirige vers la page d'autorisation du provider
   ↓
4. Utilisateur autorise l'application
   ↓
5. Provider redirige vers /auth/[provider]/callback avec un code
   ↓
6. Passport échange le code contre un access token
   ↓
7. Récupération du profil utilisateur
   ↓
8. Création/recherche de l'utilisateur dans MongoDB
   ↓
9. Génération d'un JWT token
   ↓
10. Redirection vers le frontend avec le token
    ↓
11. Frontend stocke le token et affiche l'utilisateur connecté
```

---

## 📝 API Endpoints

### Authentification locale
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /auth/profile` - Profil utilisateur (protégé par JWT)

### OAuth Google
- `GET /auth/google` - Initier OAuth Google
- `GET /auth/google/callback` - Callback Google

### OAuth GitHub
- `GET /auth/github` - Initier OAuth GitHub
- `GET /auth/github/callback` - Callback GitHub

### OAuth Discord
- `GET /auth/discord` - Initier OAuth Discord
- `GET /auth/discord/callback` - Callback Discord

---

## 🛠️ Technologies utilisées

### Backend
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Passport.js** - Middleware d'authentification OAuth
  - `passport-google-oauth20`
  - `passport-github2`
  - `passport-discord`
- **jsonwebtoken** - Génération/vérification JWT
- **bcryptjs** - Hash des mots de passe
- **cors** - Cross-Origin Resource Sharing

### Frontend
- **Vue.js 3** - Framework JavaScript
- **Vue Router** - Navigation SPA
- **Axios** - Client HTTP
- **Vite** - Build tool

---

## 🐛 Dépannage

### Erreur "Client ID not found"
```bash
# Vérifiez votre fichier .env
# Redémarrez le serveur backend
cd backend
npm run dev
```

### Erreur "Redirect URI mismatch"
Vérifiez que les URLs de callback correspondent **exactement** :
- Dans votre fichier `.env`
- Dans la configuration du provider OAuth

### MongoDB connection error
```bash
# Démarrer MongoDB
mongod

# Vérifier la connexion
mongo
```

---

## 📚 Ressources

- [Guide rapide OAuth](./QUICK_START.md)
- [Documentation OAuth complète](./OAUTH_SETUP.md)
- [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps)
- [Discord OAuth Docs](https://discord.com/developers/docs/topics/oauth2)
- [Passport.js](http://www.passportjs.org/)
- [JWT.io](https://jwt.io/)

---

## 👨‍💻 Développé pour

**BUT Informatique S4 - R401**  
Projet de démonstration : Authentification JWT + OAuth Multi-Provider

---

## 📄 Licence

MIT License - Libre d'utilisation pour des fins éducatives
