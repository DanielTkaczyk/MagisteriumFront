<template>
  <div class="mainContainer max-width-1800">
    <div class="smallContainer">
      <div class="register">
        <div style="text-align:center; padding: 0px 10px 0px 10px;">
          Projekt stworzony na potrzeby pracy magisterskiej pt. "Układ
          sterowania dla manipulatora rehabilitacyjnego stawu
          kolanowego".
        </div>
      </div>
      <div class="login-content">
        <img src="@/assets/logo.png" />
        <br />
        <form class="fields form" @submit="handleSubmit">
          <div class="input-container">
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="name"
              placeholder="login"
            />
            <i class="fas fa-user"></i>
          </div>
          <div class="input-container">
            <input
              v-model="pass"
              type="password"
              class="form-control"
              id="pass"
              placeholder="hasło"
            />
            <i class="fas fa-lock"></i>
          </div>
          <button type="submit" class="btnSubmit">Zaloguj</button>
        </form>
        <div
          v-if="loginData.error"
          class="alert alert-danger"
          role="alert"
        >
          {{ loginData.error }}
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Login',
  created() {},
  computed: {
    ...mapGetters({
      loginData: 'login/getLoginData',
    }),
  },
  data: function() {
    return {
      name: '',
      pass: '',
      error: '',
    };
  },
  methods: {
    ...mapActions({
      login: 'login/login',
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.login({ name: this.name, password: this.pass });
    },
  },
};
</script>

<style scoped>
.mainContainer {
  display: flex;
  justify-content: center;
  height: 90vh;
  width: 100%;
}
.smallContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: inherit;
  box-shadow: 18px 13px 30px -23px rgba(0, 0, 0, 0.75);
}
.register {
  flex: 1;
  background: rgb(221, 221, 221);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
}
.login-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  height: inherit;
}
.fields {
  width: 40%;
  align-content: center;
}
.input-container {
  padding-bottom: 15px;
  position: relative;
}
.input-container input[type='text'] {
  padding-left: 40px;
}
.input-container input[type='password'] {
  padding-left: 40px;
}
.input-container i {
  position: absolute;
  left: 0;
  top: 8px;
  padding: 3px 15px;
}
.form-control {
  border-radius: 1.5rem;
}
.btnSubmit {
  border: none;
  outline-style: none;
  border-radius: 1.5rem;
  padding: 1%;
  width: 100%;
  cursor: pointer;
  background: #5cb85c;
  color: #fff;
}
.btnRegister {
  border: none;
  outline-style: none;
  border-radius: 1.5rem;
  padding: 1%;
  width: 40%;
  cursor: pointer;
  background: #5cb85c;
  color: #fff;
}
h1 {
  color: white;
}
img {
  width: 30%;
  height: auto;
}
p {
  text-align: right;
  font-size: 0.9em;
  margin-top: 5px;
  font-weight: 700;
}
p:hover {
  cursor: pointer;
}
.alert {
  border-radius: 1.5em;
}
@media (max-width: 1800px) {
  .smallContainer {
    margin: 30px;
  }
}
@media (max-width: 1300px) {
  .smallContainer {
    flex-direction: column-reverse;
  }
  .login-content {
    width: 100%;
  }
  .register {
    width: 100%;
  }
  h1 {
    text-align: center;
  }
  p {
    text-align: center;
  }
}
@media (max-width: 600px) {
  .fields {
    width: 80%;
  }
  .btnRegister {
    width: 80%;
  }
  img {
    width: 60%;
    height: auto;
  }
  .smallContainer {
    margin: 0px;
  }
  .alert {
    width: 99%;
  }
}
</style>
