<template>
  <div class="body">
    <div class="coins-container">
      <img src="/BRAIN.svg" alt="" />
      <h1>{{ formatNumber(coins) }}</h1>
    </div>
    <p>+{{ formatNumber(coinsPerHour) }} в час</p>
    <div class="coin-button" @click="tapCoin">
      <img src="/coin.png" alt="Монетка" />
      <div class="coin-shadow">
        <img src="/coin-shadow.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coins: Number,
    coinsPerHour: Number,
  },
  methods: {
    tapCoin() {
      this.$emit("add-coins", 10);
    },
    formatNumber(value) {
      return Math.floor(value).toLocaleString("ru-RU"); // Округляет вниз и форматирует
    },
  },
};
</script>

<style>
.body {
  flex: 1;
  text-align: center;
}

.coins-container {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-bottom: 15px;
}

h1 {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 44px;
  line-height: 110%;
  letter-spacing: -0.05em;
  display: inline-block;
  z-index: 1;
  background: linear-gradient(360deg, #fee156 18.75%, #fcbc21 87.5%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

p {
  font-size: 18px;
  color: #d8d8d8;
}

.coin-button {
  margin: 0 auto;
  cursor: pointer;
  position: relative;
}

.coin-button img {
  width: 335px;
  z-index: 10;
}

.coin-shadow {
  position: absolute;
  top: 266px;
  left: 40px;
  z-index: 5;
}


</style>
