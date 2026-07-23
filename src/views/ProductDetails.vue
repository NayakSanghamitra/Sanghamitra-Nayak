<template>
  <v-container class="py-10">
    <v-row justify="center" align="center" v-if="product">
      <!-- Product Image Section -->
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-card class="pa-6 rounded-xl elevation-6 border-accent" width="100%" max-width="450">
          <v-img
            :src="product.image"
            :alt="product.title"
            height="380"
            contain
            class="rounded-lg"
          ></v-img>
        </v-card>
      </v-col>

      <!-- Product Details Info -->
      <v-col cols="12" md="6" class="pl-md-8">
        <v-chip
          color="primary"
          variant="tonal"
          size="small"
          class="text-uppercase font-weight-bold mb-3"
        >
          {{ product.category }}
        </v-chip>

        <h1 class="text-h4 font-weight-bold mb-3 text-white">
          {{ product.title }}
        </h1>

        <!-- Star Rating -->
        <div class="d-flex align-center mb-4" v-if="product.rating">
          <v-rating
            :model-value="product.rating.rate"
            color="amber-accent-4"
            active-color="amber-accent-4"
            half-increments
            readonly
            density="compact"
            size="small"
          ></v-rating>
          <span class="text-caption grey--text text-lighten-1 ml-2">
            ({{ product.rating.rate }} / 5)
          </span>
        </div>

        <v-divider class="mb-4"></v-divider>

        <!-- Price -->
        <div class="text-h3 font-weight-black text-emerald mb-6">
          ${{ product.price }}
        </div>

        <!-- Description -->
        <div class="mb-6">
          <h3 class="text-subtitle-1 font-weight-bold text-grey-lighten-1 mb-1">
            Description
          </h3>
          <p class="text-body-1 text-grey-lighten-2 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <!-- Action Button -->
        <v-btn
          color="primary"
          size="x-large"
          prepend-icon="mdi-cart-plus"
          block
          elevation="4"
          class="rounded-lg font-weight-bold"
          @click="addToCartAndRedirect(product)"
        >
          Add to Cart
        </v-btn>
      </v-col>
    </v-row>

    <!-- Fallback if Product Not Found -->
    <v-row justify="center" v-else>
      <v-col cols="12" class="text-center py-12">
        <v-icon icon="mdi-alert-circle-outline" size="64" color="warning" class="mb-4"></v-icon>
        <h2 class="text-h5 text-white mb-4">Product Not Found</h2>
        <v-btn color="primary" variant="outlined" to="/">Back to Shop</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "ProductDetails",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const products = computed(() => store.state.products || []);
    const productId = Number(route.params.id);

    const product = computed(() =>
      products.value.find((p) => p.id === productId)
    );

    const addToCart = (product) => {
      store.dispatch("addToCart", product);
    };

    const addToCartAndRedirect = (product) => {
      addToCart(product);
      router.push("/cartpage");
    };

    return {
      product,
      addToCart,
      addToCartAndRedirect,
    };
  },
};
</script>

<style scoped>
.border-accent {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.text-emerald {
  color: #4caf50;
}

.leading-relaxed {
  line-height: 1.6;
}
</style>
