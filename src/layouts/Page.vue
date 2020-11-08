<template>
  <transition name="view" mode="out-in">
    <router-view></router-view>
  </transition>
</template>
<style scoped>
.view-enter-active,
.view-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.view-enter-active {
  transition-delay: 0.3s;
}
.view-enter {
  opacity: 0;
}
.view-enter-to {
  opacity: 1;
}
.view-leave {
  opacity: 1;
}
.view-leave-to {
  opacity: 0;
}
</style>
