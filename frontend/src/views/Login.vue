<template>
  <div class="container">
    <h1>🔐 Connexion</h1>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="jean.dupont@example.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          placeholder="Votre mot de passe"
          required
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>

    <div class="link">
      Pas encore de compte ? <router-link to="/register">S'inscrire</router-link>
    </div>

    <div class="divider">
      <span>OU</span>
    </div>

    <div class="oauth-buttons">
      <button @click="signInWithGoogle" type="button" class="oauth-btn google-btn">
        <svg class="oauth-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Se connecter avec Google
      </button>

      <button @click="signInWithGithub" type="button" class="oauth-btn github-btn">
        <svg class="oauth-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        Se connecter avec GitHub
      </button>

      <button @click="signInWithDiscord" type="button" class="oauth-btn discord-btn">
        <svg class="oauth-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
        </svg>
        Se connecter avec Discord
      </button>
    </div>

    <div class="jwt-info">
      <h3>💡 Démo JWT</h3>
      <p>
        ✅ Après connexion, un <strong>Access Token</strong> JWT est stocké<br>
        ✅ Ce token est envoyé dans le header <code>Authorization: Bearer ...</code><br>
        ✅ Le serveur vérifie le token sans consulter de session
      </p>
    </div>
  </div>
</template>

<script>
import { authService } from '../services/api'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null,
      success: null,
      loading: false
    }
  },
  mounted() {
    // Afficher un message d'erreur si OAuth a échoué
    const error = this.$route.query.error
    if (error === 'google_auth_failed') {
      this.error = 'Échec de l\'authentification Google'
    } else if (error === 'github_auth_failed') {
      this.error = 'Échec de l\'authentification GitHub'
    } else if (error === 'discord_auth_failed') {
      this.error = 'Échec de l\'authentification Discord'
    } else if (error === 'token_generation_failed') {
      this.error = 'Erreur lors de la génération du token'
    }
  },
  methods: {
    async handleLogin() {
      this.error = null
      this.success = null
      this.loading = true

      try {
        const response = await authService.login(this.form)
        this.success = response.message

        // Rediriger vers home après connexion réussie
        setTimeout(() => {
          this.$router.push('/home')
        }, 1000)
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la connexion'
      } finally {
        this.loading = false
      }
    },
    signInWithGoogle() {
      // Redirection vers le backend qui initie OAuth
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
    },
    signInWithGithub() {
      // Redirection vers le backend qui initie OAuth GitHub
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`
    },
    signInWithDiscord() {
      // Redirection vers le backend qui initie OAuth Discord
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/discord`
    }
  }
}
</script>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
  color: #666;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ddd;
}

.divider span {
  padding: 0 1rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.oauth-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.oauth-btn:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.oauth-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Google Button */
.google-btn {
  background: white;
  color: #3c4043;
  border-color: #dadce0;
}

.google-btn:hover {
  background: #f8f9fa;
  border-color: #d2d4d6;
}

/* GitHub Button */
.github-btn {
  background: #24292e;
  color: white;
  border-color: #24292e;
}

.github-btn:hover {
  background: #1b1f23;
}

/* Discord Button */
.discord-btn {
  background: #5865F2;
  color: white;
  border-color: #5865F2;
}

.discord-btn:hover {
  background: #4752C4;
}

.jwt-info {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f0f7ff;
  border-left: 4px solid #2563eb;
  border-radius: 4px;
}

.jwt-info h3 {
  margin: 0 0 0.75rem 0;
  color: #1e40af;
  font-size: 1.1rem;
}

.jwt-info p {
  margin: 0;
  color: #1e3a8a;
  line-height: 1.6;
  font-size: 0.95rem;
}
</style>
