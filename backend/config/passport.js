const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const { 
  findUserByGoogleId, 
  createUserFromGoogle,
  findUserByGithubId,
  createUserFromGithub,
  findUserByDiscordId,
  createUserFromDiscord
} = require('../models/User');

// =============================================================================
// Configuration de la stratégie Google OAuth 2.0
// =============================================================================
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // Récupérer la référence à la base de données
      const db = req.app.locals.db;
      
      // Chercher l'utilisateur par googleId
      let user = await findUserByGoogleId(db, profile.id);
      
      if (!user) {
        // Créer l'utilisateur si il n'existe pas encore
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        const picture = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
        const name = profile.displayName || 'Utilisateur Google';
        
        user = await createUserFromGoogle(db, {
          googleId: profile.id,
          email,
          name,
          picture
        });
      }
      
      // Retourner l'utilisateur authentifié
      return done(null, user);
    } catch (error) {
      console.error('Erreur lors de l\'authentification Google:', error);
      return done(error, null);
    }
  }
));

// =============================================================================
// Configuration de la stratégie GitHub OAuth
// =============================================================================
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email'],
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const db = req.app.locals.db;
      
      // Chercher l'utilisateur par githubId
      let user = await findUserByGithubId(db, profile.id);
      
      if (!user) {
        // Extraire l'email (GitHub peut retourner plusieurs emails)
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        const picture = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
        const name = profile.displayName || profile.username || 'Utilisateur GitHub';
        const username = profile.username;
        
        user = await createUserFromGithub(db, {
          githubId: profile.id,
          email,
          name,
          username,
          picture
        });
      }
      
      return done(null, user);
    } catch (error) {
      console.error('Erreur lors de l\'authentification GitHub:', error);
      return done(error, null);
    }
  }
));

// =============================================================================
// Configuration de la stratégie Discord OAuth
// =============================================================================
passport.use(new DiscordStrategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email'],
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const db = req.app.locals.db;
      
      // Chercher l'utilisateur par discordId
      let user = await findUserByDiscordId(db, profile.id);
      
      if (!user) {
        const email = profile.email || null;
        const name = profile.username || 'Utilisateur Discord';
        const discriminator = profile.discriminator;
        
        // Discord avatar URL
        let picture = null;
        if (profile.avatar) {
          picture = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
        }
        
        user = await createUserFromDiscord(db, {
          discordId: profile.id,
          email,
          name,
          discriminator,
          picture
        });
      }
      
      return done(null, user);
    } catch (error) {
      console.error('Erreur lors de l\'authentification Discord:', error);
      return done(error, null);
    }
  }
));

// ⚠️ PAS de serializeUser/deserializeUser car on utilise JWT (stateless)
// Ces fonctions sont uniquement pour les sessions

module.exports = passport;

