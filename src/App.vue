<script setup lang="ts">
import AppHeader from './components/Header.vue';
import AppSideMenu from './components/SideMenu.vue';
import AppFooter from './components/Footer.vue';
import { ref } from 'vue';

// 响应式状态来跟踪侧边菜单是否收起
const isSideMenuCollapsed = ref(false);

// 处理侧边菜单状态变化
const handleSideMenuCollapsedChange = (collapsed: boolean) => {
  isSideMenuCollapsed.value = collapsed;
};
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <div class="main-layout">
      <AppSideMenu @collapsed-change="handleSideMenuCollapsedChange" />
      <div class="main-content" :class="{ 'side-menu-collapsed': isSideMenuCollapsed }">
        <router-view />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  overflow-x: hidden; /* 防止整个页面横向滚动 */
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden; /* 防止容器横向滚动 */
}

.main-layout {
  display: flex;
  flex-grow: 1;
  min-height: calc(100vh - 120px); /* 根据header/footer高度调整 */
  width: 100%;
  overflow-x: hidden; /* 防止布局横向滚动 */
}

.main-content {
  flex: 1;
  overflow-x: hidden; /* 防止内容横向滚动 */
  min-width: 0; /* 修复flexbox溢出问题 */
  margin-left: 200px; /* 为侧边菜单留出空间 */
  margin-top: 60px; /* 为固定定位的Header留出空间 */
  transition: margin-left 0.3s ease; /* 与侧边菜单动画同步 */
}

/* 当侧边菜单收起时的样式 */
.main-content.side-menu-collapsed {
  margin-left: 75px;
}
</style>