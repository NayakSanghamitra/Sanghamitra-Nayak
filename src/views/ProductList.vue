<template>
  <div>
    <!-- Hero Banner Carousel -->
    <v-carousel
      height="320"
      show-arrows="hover"
      cycle
      hide-delimiter-background
      class="mb-8"
    >
      <v-carousel-item
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
        cover
      >
        <div class="d-flex fill-height align-center justify-center bg-black-50">
          <div class="text-center px-4">
            <h1 class="text-h3 font-weight-black text-white mb-2">Summer Collection '26</h1>
            <p class="text-subtitle-1 text-grey-lighten-2 mb-4">Up to 40% off on flagship tech & fashion</p>
            <v-btn color="primary" size="large" rounded="lg" elevation="3">Explore Catalog</v-btn>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <!-- Controls & Filter Bar -->
      <v-row class="mb-6 align-center">
        <!-- Category Filter Chips -->
        <v-col cols="12" md="8">
          <v-chip-group v-model="selectedCategory" selected-class="text-primary" mandatory>
            <v-chip value="all" filter variant="outlined">All Products</v-chip>
            <v-chip
              v-for="cat in categories"
              :key="cat"
              :value="cat"
              filter
              variant="outlined"
              class="text-capitalize"
            >
              {{ cat }}
            </v-chip>
          </v-chip-group>
        </v-col>

        <!-- Sorting Selector -->
        <v-col cols="12" md="4" class="d-flex justify-md-end">
          <v-select
            v-model="sortBy"
            :items="sortOptions"
            density="compact"
            variant="outlined"
            label="Sort By"
            hide-details
            rounded="lg"
            max-width="200"
          ></v-select>
        </v-col>
      </v-row>

      <!-- Loading State -->
      <v-row v-if="loading">
        <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="4" lg="3">
          <v-skeleton-loader type="card, article"></v-skeleton-loader>
        </v-col>
      </v-row>

      <!-- Product Grid -->
      <v-row v-else-if="filteredProducts.length > 0">
        <v-col
          v-for="product in filteredProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            elevation="2"
            rounded="xl"
            class="fill-height d-flex flex-column hover-elevate transition-ease"
          >
            <div class="pa-4 text-center position-relative">
              <v-chip
                size="x-small"
                color="secondary"
                class="position-absolute text-capitalize"
                style="top: 12px; left: 12px; z-index: 2;"
              >
                {{ product.category }}
              </v-chip>
              
              <v-img
                :src="product.image"
                height="200"
                contain
                class="mb-2"
              ></v-img>
            </div>

            <v-card-item>
              <v-card-title class="text-subtitle-1 font-weight-bold text-truncate">
                {{ product.title }}
              </v-card-title>
              <div class="d-flex align-center mt-1" v-if="product.rating">
                <v-rating
                  :model-value="product.rating.rate"
                  color="amber"
                  density="compact"
                  size="small"
                  half-increments
                  readonly
                ></v-rating>
                <span class="text-caption text-medium-emphasis ml-1">
                  ({{ product.rating.count }})
                </span>
              </div>
            </v-card-item>

            <v-card-text class="mt-auto">
              <div class="text-h5 font-weight-black text-primary">
                ${{ product.price }}
              </div>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0 ga-2">
              <v-btn
                :to="`/products/${product.id}`"
                variant="outlined"
                color="secondary"
                block
                rounded="lg"
                class="mb-2"
              >
                View Details
              </v-btn>
              <v-btn
                color="primary"
                variant="flat"
                block
                rounded="lg"
                prepend-icon="mdi-cart-plus"
                @click="addToCart(product)"
              >
                Add To Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Empty State -->
      <v-row v-else justify="center" class="py-12">
        <v-col cols="12" class="text-center">
          <v-icon icon="mdi-magnify-remove" size="64" color="medium-emphasis" class="mb-4"></v-icon>
          <h3 class="text-h5 font-weight-bold">No Products Found</h3>
          <p class="text-body-2 text-medium-emphasis">Try clearing your search query or filters.</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const selectedCategory = ref('all')
const sortBy = ref('featured')

const sortOptions = [
  { title: 'Featured', value: 'featured' },
  { title: 'Price: Low to High', value: 'price-asc' },
  { title: 'Price: High to Low', value: 'price-desc' },
  { title: 'Rating', value: 'rating' }
]

const loading = computed(() => store.state.loading || false)
const products = computed(() => store.state.products || [])
const searchQuery = computed(() => store.state.searchQuery || '')

const categories = computed(() => {
  const cats = products.value.map(p => p.category)
  return [...new Set(cats)]
})

const filteredProducts = computed(() => {
  let list = [...products.value]

  // Search Filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }

  // Category Filter
  if (selectedCategory.value !== 'all') {
    list = list.filter(p => p.category === selectedCategory.value)
  }

  // Sorting
  if (sortBy.value === 'price-asc') list.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list.sort((b, a) => b.price - a.price)
  if (sortBy.value === 'rating') list.sort((b, a) => (b.rating?.rate || 0) - (a.rating?.rate || 0))

  return list
})

const addToCart = (product) => {
  store.dispatch('addToCart', product)
}

onMounted(() => {
  if (products.value.length === 0) {
    store.dispatch('fetchProducts')
  }
})
</script>
