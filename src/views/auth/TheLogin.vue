<template>
  <div class="card" @keyup.enter="submitLogin">
    <h1 class="title-card">Login</h1>

    <transition name="fade">
      <div class="mensagem" :class="[mensagem.tipo]" v-if="mensagem.ativa">
        <div class="fechar" @click="mensagem.ativa = false">x</div>
        {{ mensagem.conteudo }}
      </div>
    </transition>

    <div class="input-group">
      <label class="title">Usuário</label>
      <input class="input" type="text" v-model="form.usuario" />
    </div>

    <div class="input-group">
      <label class="title">Senha</label>
      <input class="input" type="password" v-model="form.senha" />
    </div>

    <div class="input-group">
      <button type="submit" class="btn" @click="submitLogin">Logar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheAuth",

  data() {
    return {
      form: {
        usuario: null,
        senha: null,
      },
      mensagem: {
        ativa: false,
        conteudo: null,
        tipo: null,
      },
    };
  },

  methods: {
    exibirMensagem(conteudo, tipo) {
      this.mensagem.ativa = true;
      this.mensagem.conteudo = conteudo;
      this.mensagem.tipo = tipo;
    },

    submitLogin() {
      if (!this.form.usuario || !this.form.senha) {
        this.exibirMensagem("Usuário ou senha não informados", "erro");
        return;
      }

      this.exibirMensagem("Usuário logado com sucesso!", "sucesso");
      localStorage.setItem("token", this.form.usuario);

      setTimeout(() => {
        this.$router.push({ name: "User" });
      }, 1000);
    },
  },
};
</script>

<style scoped>
.card > .mensagem {
  margin-bottom: 1.5rem;
  width: 100%;
  padding: 0.75rem 1em;
  border-radius: 0.75rem;
  color: #fff;
  position: relative;
}
.card > .mensagem.erro {
  background-color: #f34273;
}
.card > .mensagem.sucesso {
  background-color: #548ca8;
}

.card > .mensagem > .fechar {
  position: absolute;
  right: 0.65rem;
  top: -0.05rem;
  cursor: pointer;
}

.input-group {
  width: 100%;
  position: relative;
  margin-bottom: 0.5rem;
}

.input-group > .title {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.input-group > .input {
  width: 100%;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  transition: box-shadow 0.2s;
}

.input-group > .input:focus {
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.2);
}

.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>