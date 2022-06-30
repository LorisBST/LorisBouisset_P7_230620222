<script>
import LoginVue from "./components/Login.vue"
export default {
  name: "App",
  components: {
    LoginVue
  }
}
</script>

<template>
  <LoginVue />
</template>

<style>

body { font-weight: bold;
  font-family: "lato",serif!important;}

#tab-register, #tab-login, #btnRegister, #btnLogin { font-weight: bold;
  font-family: "lato", serif!important;}


.nav-pills .pill-1 .nav-link:not(.active) {
  background-color: darkgrey!important;
  color: black;
}

.nav-pills .pill-2 .nav-link:not(.active) {
  background-color: darkgrey!important;
}

.nav-pills .pill-1 .nav-link {
  background-color: #FD2D01!important;
  color: white;
}

.nav-pills .pill-2 .nav-link {
  background-color: #FD2D01!important;
  color: white;
}
</style>
