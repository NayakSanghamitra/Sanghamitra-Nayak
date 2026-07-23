<template>
  <v-app>
    <!-- App Bar with Blur & Dynamic Elevation -->
    <v-app-bar color="surface" elevation="2" class="px-3">
      <!-- Brand Logo / Title -->
      <v-app-bar-title class="font-weight-bold text-h6 text-primary">
        <v-icon icon="mdi-bag-personal-outline" class="mr-2" />
        VELOCE COMMERCE
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Navigation Links -->
      <div class="d-none d-md-flex align-center ga-2">
        <v-btn to="/" variant="text" prepend-icon="mdi-home">Home</v-btn>
        <v-btn to="/about" variant="text" prepend-icon="mdi-information">About</v-btn>
        <v-btn to="/unstop" variant="text" prepend-icon="mdi-rocket-launch">Unstop</v-btn>
      </div>

      <v-divider vertical class="mx-3 my-3 d-none d-md-flex"></v-divider>

      <!-- Cart Button with Live Counter Badge -->
      <v-btn to="/cartpage" variant="tonal" color="primary" class="mr-2">
        <v-badge :content="cartTotal" color="error" floating>
          <v-icon icon="mdi-cart" />
        </v-badge>
        <span class="ml-3 d-none d-sm-inline">Cart</span>
      </v-btn>

      <!-- Theme Toggle Button -->
      <v-btn 
        icon 
        variant="text" 
        @click="toggleTheme" 
        :title="`Switch to ${isDark ? 'Light' : 'Dark'} Mode`"
      >
        <v-icon :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
      </v-btn>
    </v-app-bar>

    <!-- Main Content Container -->
    <v-main class="bg-background">
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>

    <!-- Professional Footer -->
    <v-footer class="text-center d-flex flex-column bg-surface pa-4 mt-auto">
      <div class="text-caption text-medium-emphasis">
        © {{ new Date().getFullYear() }} — <strong>Veloce Commerce</strong> | Portfolio Showcase
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useTheme } from 'vuetify'

const store = useStore()
const theme = useTheme()

const cartTotal = computed(() => store.getters.cartTotal)
const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}
</script>

