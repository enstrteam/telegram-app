<template>
    <div class="coins-container">
      <img src="/BRAIN.svg" alt="" />
      <h1>{{ formatNumber(coins) }}</h1>
    </div>
    <p>+{{ formatNumber(coinsPerHour) }} в час</p>
    <div 
      class="coin-button" 
      :class="{ 'pressed': isPressed }" 
      @click="handleClick"
    >
      <img src="/coin.png" alt="Монетка" />
      <div class="coin-shadow">
        <img src="/coin-shadow.png" alt="" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    props: {
      coins: Number,
      coinsPerHour: Number,
    },
    setup(props, { emit }) {
      const isPressed = ref(false);
  
      // Handle coin tap
      const handleClick = () => {
        isPressed.value = true;
  
        // Emit the event to add coins
        tapCoin();
  
        setTimeout(() => {
          isPressed.value = false;
        }, 60);
      };
  
      const tapCoin = () => {
        emit("add-coins", 10);
      };
  
      const formatNumber = (value) => {
        return Math.floor(value).toLocaleString("ru-RU"); // Format number with commas
      };
  
      return {
        isPressed,
        handleClick,
        tapCoin,
        formatNumber,
      };
    },
  };
  </script>
  
  <style>
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
  
  .coin-button.pressed {
    transform: scale(0.95); 
  }
  
  .coin-shadow {
    position: absolute;
    top: 266px;
    left: 40px;
    z-index: 5;
  }
  </style>
  