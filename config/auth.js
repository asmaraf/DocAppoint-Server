const { betterAuth } = require('better-auth');
const { mongodbAdapter } = require('better-auth/adapters/mongodb');
const mongoose = require('mongoose');

const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection),
  secret: process.env.AUTH_SECRET || 'docappoint_auth_secret_2026',
  basePath: '/api/auth',
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://doc-appoint-client-nu.vercel.app',
    ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(url => url.trim()) : [])
  ],
  
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    }
  },
  
  plugins: [],
  
  callbacks: {
    async onSignUpComplete(user) {
      console.log('[Auth]: User signed up:', user.email);
    },
    async onSignInComplete(user) {
      console.log('[Auth]: User signed in:', user.email);
    }
  }
});

module.exports = auth;
