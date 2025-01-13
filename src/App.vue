<template>
  <div class="container" ref="container">
    <Header
      :power="power"
      :levelName="levelName"
      :maxpower="maxpower"
      :currentStage="currentStage"
      :totalStages="totalStages"
      :containerWidth="containerWidth"
    />
    <div class="body">
      <router-view :coins="coins" :coinsPerHour="coinsPerHour" @add-coins="addCoins"></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    const power = ref(5000);
    const maxpower = ref(10000);
    const levelName = ref("Посейдон");
    const currentStage = ref(6);
    const totalStages = ref(12);
    const coins = ref(100000000);
    const coinsPerHour = ref(56948);
    const containerWidth = ref(0);
    const container = ref(null);

    // Function to update the container width
    const updateContainerWidth = () => {
      if (container.value) {
        containerWidth.value = container.value.offsetWidth;
      }
    };

    // Function to add coins
    const addCoins = (amount) => {
      coins.value += amount;
    };

    // Timer to increment coins per hour
    onMounted(() => {
      setInterval(() => {
        coins.value += coinsPerHour.value / 3600;
      }, 1000);
      updateContainerWidth();
      window.addEventListener("resize", updateContainerWidth);
    });

    // Cleanup the event listener before component is destroyed
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateContainerWidth);
    });

    return {
      power,
      maxpower,
      levelName,
      currentStage,
      totalStages,
      coins,
      coinsPerHour,
      containerWidth,
      container,
      addCoins,
    };
  },
};
</script>

<style>
#app {
  text-align: center;
  color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items:center;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
}

.body {
  flex: 1;
  text-align: center;
}
</style>
