<script>
import { $fetch } from "ohmyfetch";

export default {
  name: "Home",
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
      comments: []
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
      location.reload()
    },
    async transformInput() {

    },

    async updateComment(commentId) {
      const userId = localStorage.getItem('userId')
      const response = await $fetch(`http://localhost:4200/api/comments/${commentId}`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,

        },
        body: {
          userId,
          message: this.postComment.message
        }
      })
      location.reload()
    },
    async getComment() {
      this.comments = await $fetch("http://localhost:4200/api/comments", {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
    },

    async deleteComment(commentId) {
      this.comments = await $fetch(`http://localhost:4200/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      location.reload()
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
    await this.deleteComment()
    await this.updateComment()
  },
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
      <label for="exampleFormControlTextarea1"></label>
      <textarea v-model="postComment.message" class="form-control" id="textAreaComment" rows="3"
                placeholder="🖊️ Écrivez un commentaire..."></textarea>
    </div>
    <!-- bouton post commentaire -->
    <div class="buttonPost">
      <button type="button" id="postButton" @click="pushComment" class="btn btn-primary">Poster</button>
    </div>
  </div>

  <div id="blockFakeComment" v-for="comment in comments">
    <div class="card" id="fakeComment">
      <div class="card-body">
        <div id="commentUserId">
          <img
              src="https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-6/269603898_3082552205347023_4398186156418495931_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=109&ccb=1-7&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_ohc=auEzTJ8sviQAX-nszwy&_nc_ht=scontent-mrs2-1.xx&oh=00_AT9w3OTWsinR0zUZnTltYEBf_yPHwYrIU0ntt_rqFrp_3g&oe=62DAED7D"
              alt="avatar" width="30"
              height="30"/>
          <div class="userIdDate">
            <p class="small">{{ this.userForm.fullname + " - " + this.userForm.service }}</p>
            <p style="font-size: 0.875em;">Le 22 juillet 2022</p>
          </div>
        </div>
        <div class="d-flex flex-column gap-1">
          <div class="">
            <p>{{ comment.message }}</p>
          </div>
          <div class="d-flex gap-2" id="likeEditDelete" style="margin-top: 1rem">
            <button class="btn btn-outline-danger" @click="deleteComment(comment._id)"><i class="bi bi-trash-fill"></i>
            </button>

            <button class="btn btn-outline-primary" @click="transformInput">✍️</button>  <!--  updateComment(comment._id) -->
            <button class="btn btn-outline-success" @click="likeMessage">👍</button>
          </div>
        </div>
      </div>
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
