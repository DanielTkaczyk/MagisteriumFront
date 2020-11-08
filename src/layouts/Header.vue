<template>
  <div>
    <b-button id="button-center" v-b-toggle.sidebar-1>menu</b-button>
    <b-sidebar id="sidebar-1" title="Menu" shadow>
      <div class="px-3 py-2">
        <p>
          Manipulator rehabilitacyjny
        </p>
        <b-button-group class="btn-group" vertical>
          <router-link to="/home"
            ><b-button> Ekran główny </b-button></router-link
          >
          <router-link to="/manipulator-orders">
            <b-button>Zlecenia </b-button></router-link
          >
          <router-link to="/history"
            ><b-button>Histria zleceń </b-button></router-link
          >
        </b-button-group>
        <b-button-group
          class="btn-group px-3 py-2"
          id="bottom"
          vertical
        >
          <b-img :src="image" fluid thumbnail></b-img>
          <router-link to="/info">
            <b-button class="button-info"
              >Informacje
            </b-button></router-link
          >
          <router-link to="/signin">
            <b-button @click="logout()" id="button-logout"
              >Wyloguj
            </b-button></router-link
          >
        </b-button-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { BButton, BSidebar, BImg, VBToggle } from 'bootstrap-vue';
import image from '../assets/logo.png';

export default {
  data: function() {
    return {
      image: image,
    };
  },
  components: {
    BButton,
    BSidebar,
    BImg,
  },
  directives: {
    VBToggle,
  },
  methods: {
    logout() {
      window.localStorage.removeItem('token');
    },
  },
};
</script>

<style>
#button-center {
  position: absolute;
  left: 0;
  top: 0;
  margin: 26px;
  width: 220px;
  border-radius: 5px;
  text-transform: uppercase;
  background-color: rgb(0, 97, 142);
}

.btn-group {
  width: 100%;
}
.btn-group a {
  width: 100%;
}

.btn-group button {
  width: 100%;
  background-color: rgb(0, 97, 142);
  margin: 6px 0;
}

button {
  background-color: rgb(0, 97, 142);
}
button a {
  color: white;
}
button a:hover {
  text-decoration: none;
  color: white;
}

#bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 18px;
}

#bottom img {
  background-color: transparent;
  border: none;
  margin-bottom: 15px;
}

#button-logout {
  background-color: brown;
}
</style>
