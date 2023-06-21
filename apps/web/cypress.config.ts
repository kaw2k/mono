import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8888',
    setupNodeEvents(on, config) {},
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  env: {
    VERSES_E2E_TEST_EMAIL: 'kwelch12+test@gmail.com',
    VERSES_E2E_TEST_PASSWORD: 'Pass1234!',
    NEXT_PUBLIC_FIREBASE_VERSES_API_KEY:
      'AIzaSyCH91UWBsIDPisl7Fm7su8xQR7PcQkRI7w',
    NEXT_PUBLIC_FIREBASE_VERSES_AUTH_DOMAIN:
      'bhaktivedanta-learning.firebaseapp.com',
    NEXT_PUBLIC_FIREBASE_VERSES_PROJECT_ID: 'bhaktivedanta-learning',
    NEXT_PUBLIC_FIREBASE_VERSES_STORAGE_BUCKET:
      'bhaktivedanta-learning.appspot.com',
    NEXT_PUBLIC_FIREBASE_VERSES_MESSAGING_SENDER_ID: '345137634545',
    NEXT_PUBLIC_FIREBASE_VERSES_APP_ID:
      '1:345137634545:web:7713509a90f8e60e245d50',
    NEXT_PUBLIC_FIREBASE_VERSES_MEASUREMENT_ID: 'G-GSMSXNYR95',
  },
})
