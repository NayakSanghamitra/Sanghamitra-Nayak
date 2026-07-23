<template>
  <v-app>
    <!-- Top Navigation Bar -->
    <v-app-bar color="surface" elevation="1" class="px-md-4">
      <!-- Brand Logo / Title -->
      <v-app-bar-title class="font-weight-black text-h6 text-primary cursor-pointer" @click="$router.push('/')">
        <v-icon icon="mdi-lightning-bolt" color="amber-accent-3" class="mr-1" />
        VELOCE
      </v-app-bar-title>

      <!-- Global Search Bar -->
      <v-responsive max-width="400" class="mx-4 d-none d-sm-flex">
        <v-text-field
          v-model="searchQuery"
          density="compact"
          variant="solo-filled"
          placeholder="Search products, brands, categories..."
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          flat
          rounded="lg"
          @update:model-value="onSearch"
        ></v-text-field>
      </v-responsive>

      <v-spacer></v-spacer>

      <!-- Navigation Actions -->
      <div class="d-flex align-center ga-1">
        <v-btn to="/" variant="text" prepend-icon="mdi-storefront-outline">Shop</v-btn>

        <!-- Cart Button -->
        <v-btn to="/cartpage" variant="tonal" color="primary" class="ml-1">
          <v-badge :content="cartTotal" color="error" floating :model-value="cartTotal > 0">
            <v-icon icon="mdi-cart-outline" />
          </v-badge>
          <span class="ml-2 d-none d-sm-inline">Cart</span>
        </v-btn>

        <!-- Theme Toggle -->
        <v-btn
          icon
          variant="text"
          @click="toggleTheme"
          :title="`Switch to ${isDark ? 'Light' : 'Dark'} Mode`"
        >
          <v-icon :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Main App Content -->
    <v-main class="bg-background">
      <router-view />
    </v-main>

    <!-- Production Footer -->
    <v-footer class="bg-surface border-t py-8 mt-12">
      <v-container>
        <v-row class="text-caption text-medium-emphasis">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <div class="text-subtitle-2 font-weight-bold text-high-emphasis mb-1">
              VELOCE COMMERCE
            </div>
            High-Performance Vue 3 E-Commerce Storefront
          </v-col>
          <v-col cols="12" md="6" class="text-center text-md-right">
            © {{ new Date().getFullYear() }} Veloce Commerce. All rights reserved.
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useTheme } from 'vuetify'

const store = useStore()
const theme = useTheme()
const searchQuery = ref('')

const cartTotal = computed(() => store.getters.cartTotal || 0)
const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

const onSearch = (val) => {
  store.commit('SET_SEARCH_QUERY', val || '')
}
</script>
