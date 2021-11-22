<template>
  <div class="card">
    <h1 class="title-card">Configurações de {{ usuario }}</h1>
    <button class="btn" @click="goBack">Voltar</button>
  </div>
</template>

<script>
export default {
  name: "TheConfigurations",

  data() {
    return {
      usuario: null,
    };
  },

  beforeMount() {
    this.usuario = localStorage.getItem("token");
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>
