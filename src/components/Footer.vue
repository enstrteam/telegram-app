<template>
  <div class="footer">
    <div class="menu">
      <div 
        class="menu-item" 
        v-for="(item, index) in menuItems" 
        :key="item.name"
        :class="{ active: isActive(item.name) }"
      >
        <router-link :to="item.path" class="menu-link">
          <img :src="isActive(item.name) ? item.activeIcon : item.icon" class="menu-icon" />
          <p class="menu-label" :class="{ active: isActive(item.name) }">{{ item.label }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    const menuItems = [
      { name: 'Домой', label: 'Домой', icon: '/menu/home-icon.webp', activeIcon: '/menu/home-icon-active.webp', path: '/' },
      { name: 'Бустеры', label: 'Бустеры', icon: '/menu/booster-icon.webp', activeIcon: '/menu/booster-icon-active.webp', path: '/boosters' },
      { name: 'Рефералы', label: 'Рефералы', icon: '/menu/referral-icon.webp', activeIcon: '/menu/referral-icon-active.webp', path: '/referrals' },
      { name: 'Задания', label: 'Задания', icon: '/menu/tasks-icon.webp', activeIcon: '/menu/tasks-icon-active.webp', path: '/tasks' },
      { name: 'Призы', label: 'Призы', icon: '/menu/award-icon.webp', activeIcon: '/menu/award-icon-active.webp', path: '/awards' },
    ];

    const isActive = (menuItemName) => {
      return route.path === getPathForMenuItem(menuItemName);
    };

    const getPathForMenuItem = (menuItemName) => {
      const item = menuItems.find(item => item.name === menuItemName);
      return item ? item.path : '';
    };

    return {
      menuItems,
      isActive,
      getPathForMenuItem,
    };
  }
};
</script>

<style>

.footer {
  position: fixed; 
  bottom: 0;       
  left: 0;         
  width: 100%;     
  padding: 50px 0 10px;
  background-image: url("/bg-footer.png");
  background-size: unset;
  background-position: bottom right;
  background-repeat: repeat-x;
  z-index: 15; 
  display: flex;
  justify-content: space-around;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 0 25px;
}

.menu-link {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-icon {
  height: 46px;
}

.menu-label {
  margin-top: 4px; 
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: white; 
  opacity: 0.5;
}

.menu-label.active {
  opacity: 0.8;
}
</style>
