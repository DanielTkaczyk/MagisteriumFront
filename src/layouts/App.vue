<template>
  <div>
    <app-header v-if="checkRoute()"></app-header>
    <app-page></app-page>
    <app-footer v-if="checkRoute()"></app-footer>
  </div>
</template>

<script>
import Footer from './Footer';
import Header from './Header';
import Page from './Page';
export default {
  name: 'app',
  components: {
    appFooter: Footer,
    appHeader: Header,
    appPage: Page,
  },
  methods: {
    checkRoute() {
      const routes = [
        'ManipulatorOrders',
        'AddManipulatorOrder',
        'Home',
        'History',
        'Info',
      ];
      if (routes.includes(this.$route.name)) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
.max-width-1800 {
  max-width: 1800px;
  margin-right: auto;
  margin-left: auto;
  justify-content: center;
}
a {
  color: black;
}
a:hover {
  text-decoration: none;
  color: black;
}
#error {
  border-color: rgb(252, 22, 22);
  border-width: 3px;
  box-shadow: 0px 0px 10px 3px rgba(255, 0, 0, 1);
}
</style>
