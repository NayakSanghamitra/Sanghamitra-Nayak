<template>
  <div>
    <!-- Hero / Header Banner -->
    <v-sheet rounded="lg" color="surface-variant" class="pa-8 mb-8 text-center border">
      <h1 class="text-h3 font-weight-bold mb-2">Explore Next-Gen Gear</h1>
      <p class="text-subtitle-1 text-medium-emphasis mb-4">
        Curated high-performance electronics, apparel, and lifestyle products.
      </p>
      <v-chip color="primary" variant="outlined" prepend-icon="mdi-check-decagram">
        FakeStoreAPI Integrated
      </v-chip>
    </v-sheet>

    <!-- Loading Skeleton -->
    <v-row v-if="loading">
      <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader type="card, article" />
      </v-col>
    </v-row>

    <!-- Product Grid -->
    <v-row v-else>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          elevation="2"
          hover
          class="d-flex flex-column fill-height rounded-lg border"
        >
          <!-- Product Image -->
          <v-img
            :src="product.image"
            height="220"
            cover
            class="bg-white pa-4"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary" />
              </div>
            </template>
          </v-img>

          <v-card-item class="pt-4">
            <v-chip size="x-small" color="secondary" class="mb-2 text-uppercase">
              {{ product.category }}
            </v-chip>
            <v-card-title class="text-subtitle-1 font-weight-bold text-truncate">
              {{ product.title }}
            </v-card-title>
          </v-card-item>

          <v-card-text class="flex-grow-1">
            <div class="d-flex align-center mb-2">
              <v-rating
                :model-value="product.rating?.rate || 4"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              />
              <span class="text-caption text-medium-emphasis ml-2">
                ({{ product.rating?.count || 0 }})
              </span>
            </div>
            <div class="text-h6 font-weight-bold text-primary">
              ${{ product.price }}
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-3">
            <v-btn
              :to="`/products/${product.id}`"
              variant="text"
              color="secondary"
              size="small"
            >
              Details
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="flat"
              prepend-icon="mdi-cart-plus"
              size="small"
              @click="addToCart(product)"
            >
              Add To Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const loading = ref(true)

const products = computed(() => store.state.products)

onMounted(async () => {
  if (products.value.length === 0) {
    await store.dispatch('setProducts')
  }
  loading.value = false
})

const addToCart = (product) => {
  store.dispatch('addToCart', product)
}
</script>
