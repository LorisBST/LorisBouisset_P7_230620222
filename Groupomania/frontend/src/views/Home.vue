<template>
  <!--  Navbar-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <!-- Avatar -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"
             role="button" data-mdb-toggle="dropdown" aria-expanded="false">
            <img :src="this.userForm.profilePicture" class="rounded-circle" alt="User Picture" style="width: 3rem;
    height: 3rem;  object-fit: cover"/>
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
      <!--      Logo Groupomania -->
      <img src="/logo/GroupomaniaLogos/logo-no-background.png" height="56"/>
      <div style="display: flex;
    justify-content: flex-end;">
        <input type="submit" @click="logout()" class="btn btn-danger px-4" value="Se déconnecter">
      </div>
    </div>
  </nav>

  <!-- partie Bloc commentaire -->
  <div class="container-md mt-4">

    <div class="col-lg-7 offset-lg-2">
      <div class="card shadow mb-4">
        <div class="card-header d-flex flex-row justify-content-between align-items-center">
          Nouveau commentaire
          <div class="justify-content-end">
            <input id="file" type="file" accept="image/*" class="visually-hidden" v-on:change="onChange">
            <label for="file" class="text-primary"><i class="bi bi-image"></i></label>
          </div>
        </div>
        <div class="card-body">
          <form action="">
            <div class="mb-3">
              <textarea
                  v-model="postComment.message" class="form-control" id="new-comment" rows="5"
                  placeholder="🖊️ Écrivez un commentaire...">
              </textarea>
              <img v-if="this.postComment.image" :src="this.postComment.image"
                   id="ProfilePic" alt="User Profile Picture" width="110"
                   class="" style=" margin-top: 1rem; "/>
            </div>
            <div class="d-flex">
              <button @click.prevent="pushComment" class="ms-auto btn btn-primary">POSTER</button>
            </div>
          </form>
        </div>
      </div>
      <!--      .slice().reverse()-->
      <div v-for="comment in comments">
        <comment :comment="comment"></comment>

      </div>
    </div>
  </div>

</template>

<script>
import { $fetch } from "ohmyfetch";
import Comment from "../components/Comment.vue"

export default {
  name: "Home",
  components: {
    Comment
  },
  data() {
    return {
      userForm: {
        fullname: "",
        email: "",
        service: "",
        profilePicture: null,
      },
      postComment: {
        message: "",
        image: null,
        updatedAt: ""
      },
      comments: [],
      // reply: []
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
    async pushComment() {
      const userId = localStorage.getItem('userId')
      const response = await $fetch("http://localhost:4200/api/comments", {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: {
          userId,
          message: this.postComment.message,
          image: this.postComment.image,
          updatedAt: this.postComment.updatedAt
        }
      })
      this.comments.unshift(response)
      this.postComment.message = ""
    },
    async getComment() {
      this.comments = await $fetch("http://localhost:4200/api/comments", {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
    },
    async getProfile() {
      const urlProfile = `http://localhost:4200/api/auth/profile/${localStorage.getItem('userId')}`
      const response = await $fetch((urlProfile), {
        method: "GET",
        headers: { Authorization: `Token ${localStorage.getItem("token")}` }
      })
      this.userForm.fullname = response.fullname
      this.userForm.email = response.email
      this.userForm.service = response.service
      this.userForm.profilePicture = response.profilePicture
    },
    onChange(e) {
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.postComment.image = e.target.result
      }
    },
  },
  async mounted() {
    await this.getProfile()
    await this.getComment()
  },
}
</script>

<style>
</style>