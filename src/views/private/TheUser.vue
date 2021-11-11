<template>
 
    <div class="card">
      <h1 class="title-card">Bem vindo, {{ usuario }}</h1>
      <button class="btn" @click="logout">Deslogar</button>
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
.btn {
  background-color: #f34273;
}
</style>
