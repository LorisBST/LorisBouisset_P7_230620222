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
        message: ""
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
          message: this.postComment.message
        }
      })
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
  },
  async mounted() {
    await this.getProfile()
    await this.getComment()
  },
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <!-- Avatar -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle d-flex align-items-center"
             href="#"
             id="navbarDropdownMenuLink"
             role="button"
             data-mdb-toggle="dropdown"
             aria-expanded="false">
            <img :src="this.userForm.profilePicture"
                 class="rounded-circle"
                 alt="User Picture"
                 style="width: 3rem;
    height: 3rem;  object-fit: cover"
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

  <!-- partie Bloc commentaire -->

  <div class="commentButtonBlock">
    <div class="form-group" id="commentBlock">
      <textarea v-model="postComment.message" class="form-control" id="textAreaComment" rows="3"
                placeholder="🖊️ Écrivez un commentaire..."></textarea>
    </div>
    <!-- bouton post commentaire -->
    <div class="buttonPost">
      <button type="button" id="postButton" @click="pushComment" class="btn btn-primary">Poster</button>
    </div>
  <div v-for="comment in comments">
    <comment :comment="comment"></comment>
    </div>
  </div>

</template>

<style>

#textAreaComment, #fakeComment {
  height: auto;
  width: 32rem;
}

.userIdDate {
  display: flex;
  flex-direction: column;
  line-height: 1rem;
}

#commentUserId {
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;
}

#textAreaComment:focus {
  outline: none !important;
  border: 1px solid cornflowerblue;
  box-shadow: 0 0 10px cornflowerblue;

}

::-webkit-input-placeholder {
  font-weight: bold;
}

#commentBlock, #blockFakeComment {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}

#likeEditDelete .btn {
  width: 3rem
}

.commentButtonBlock {
  display: grid;
  justify-items: end;
  justify-content: center;
}

@media only screen and (max-width: 767px) {
  .commentButtonBlock {
    display: block;
  }
}

</style>
