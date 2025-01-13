<template>
  <div class="header">
    <div class="power-user-container">
      <div class="power-container">
        <img src="/power.svg" alt="logo" />
        <p>{{ power }} / {{ maxpower }}</p>
      </div>
      <a href="#" class="user-icon-link">
        <img src="/icon-user.svg" alt="User Icon" class="user-icon" />
      </a>
    </div>

    <div class="progress-bars">
      <!-- Прогресс-бар силы -->
      <div class="progress-bar power-bar">
        <div
          class="progress-bar-inner power-gradient"
          :style="{ width: powerPercent + '%' }"
        ></div>
      </div>

      <!-- Новый прогресс-бар уровня -->
      <div class="progress-bar">
        <div class="ellipses-container">
          <div class="ellipses-wrapper" ref="ellipsesWrapper">
            <div
              v-for="(filled, index) in levelEllipses"
              :key="index"
              class="ellipse"
              :class="{ filled: filled }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Прогресс-бар линии уровня -->
      <div class="progress-bar level-bar">
        <div
          class="progress-bar-inner level-filled"
          :style="{
            width:
              currentStage === totalStages
                ? '100%'
                : `calc(${levelBarWidth}% - 6px)`,
          }"
        ></div>
      </div>
    </div>
    <div class="level-container">
      <p>
        Уровень {{ levelName  }}
      </p>
      <p> {{ currentStage }} из {{ totalStages }}</p>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

export default {
  props: {
    power: Number,
    maxpower: Number,
    levelName: String,
    currentStage: Number,
    totalStages: Number,
    containerWidth: Number,
  },
  setup(props) {
    const powerPercent = computed(() => {
      return (props.power / props.maxpower) * 100;
    });

    const levelPercent = computed(() => {
      return (props.currentStage / props.totalStages) * 100;
    });

    const ellipsesCount = computed(() => {
      const ellipseWidth = 6;
      const gap = 4;
      return Math.floor((props.containerWidth - gap) / (ellipseWidth + gap)) + 1;
    });

    const levelEllipses = computed(() => {
      const filledCount = Math.round(
        (levelPercent.value / 100) * ellipsesCount.value
      );
      return Array.from({ length: ellipsesCount.value }, (_, i) => i < filledCount);
    });

    const levelBarWidth = computed(() => {
      const filledEllipses = levelEllipses.value.filter(Boolean).length;
      const totalEllipses = ellipsesCount.value - 1;
      return (filledEllipses / totalEllipses) * 100;
    });

    return {
      powerPercent,
      levelPercent,
      ellipsesCount,
      levelEllipses,
      levelBarWidth,
    };
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
}

.power-user-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.power-container {
  display: flex;
  align-items: center;
  margin-left: 15px;
  gap: 8px;
  margin-bottom: 10px;
}

.power-container p {
  font-family: "Poppins";
  font-size: 16px;
  line-height: 110%;
  font-weight: 500;
  background: linear-gradient(188.95deg, #e7ff11 6.4%, #1b9406 92.87%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.user-icon-link {
  margin-right: 20px;
}

.user-icon {
  width: 24px;
  height: 24px;
}

.progress-bars {
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
}

.power-bar {
  width: 100%;
  height: 3px;
  background: #555;
  position: relative;
}

.power-gradient {
  height: 100%;
  background: linear-gradient(188.95deg, #e7ff11 6.4%, #1b9406 92.87%);
}

.ellipses-wrapper {
  width: calc(100% + 4px);
  margin-left: -2px;
  display: flex;
  justify-content: space-between;
}

.ellipse {
  width: 6px;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.ellipse.filled {
  background: #fcbe23;
}

.level-bar {
  width: 100%;
  height: 3px;
  background: #555;
  position: relative;
}

.level-filled {
  height: 3px;
  background: #fcbe23;
}

.level-container {
  display: flex;
  justify-content: space-between;
  padding: 3px 20px 0 20px;
}

.level-container p {
  font-family: 'Rubik';
  font-size: 12px;
  line-height: 110%;
  font-weight: 500;
  color: #fcbe23;
}

</style>
