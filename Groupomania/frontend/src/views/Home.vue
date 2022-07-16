<script>
export default {
  name: "Home",
  methods : {
    logout(){
      localStorage.clear()
      this.$router.push('/login')

    }
  }
}
</script>

<template>

<nav class="navbar navbar-expand-lg navbar-light bg-light">

<div class="container-fluid">

  <ul class="navbar-nav">
    <!-- Avatar -->
    <li class="nav-item dropdown">
      <a
          class="nav-link dropdown-toggle d-flex align-items-center"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
      >
        <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
            class="rounded-circle"
            height="22"
            alt="Portrait of a Woman"
            loading="lazy"
        />
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li>
          <a class="dropdown-item" href="/profile">Mon profil</a>
        </li>
        <li>
          <a class="dropdown-item" @click="logout">Se déconnecter</a>
        </li>
      </ul>
    </li>
  </ul>
  <img src="/logo/GroupomaniaLogos/logo-no-background.png"
       height="56"
  />
  <div style="display: flex;
    justify-content: flex-end;">
    <input type="submit" @click="logout()" class="btn btn-danger px-4" value="Se déconnecter">
  </div>
</div>
</nav>
  </template>

  <style></style>
