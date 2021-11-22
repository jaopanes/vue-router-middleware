<template>
  <div class="card">
    <h1 class="title-card">Bem vindo, {{ usuario }}</h1>

    <div class="btn btn-config">
      <router-link to="/user/configurations">Configurações</router-link>
    </div>

    <button class="btn btn-login" @click="logout">Deslogar</button>
  </div>
</template>

<script>
export default {
  name: "TheUser",

  data() {
    return {
      usuario: null,
    };
  },

  beforeMount() {
    this.usuario = localStorage.getItem("token");
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.btn-login {
  background-color: #f34273;
}

.btn-config {
  text-align: center;
}
</style>
