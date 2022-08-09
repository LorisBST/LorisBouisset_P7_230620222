<template>

  <div class="card shadow mb-5" v-if="!deleted">
    <div class="card-header d-flex align-items-center">
      <div style="width: 30px">
        <img :src="comment.user.profilePicture" class="img-fluid rounded-circle" alt="..." style=" width: 1.8rem;
    height: 1.8rem;
    object-fit: cover;">
      </div>
      <div class="ms-3">
        {{ comment.user.fullname }} - <em>{{ comment.user.service }}</em>
      </div>
      <div class="ms-auto">
        <a v-if="!editing && (localUserId === comment.user._id || userForm.admin === true) " href="" class="text-warning"
           @click.prevent="changeState"><i class="bi bi-pencil-fill"></i></a>
        <a v-else></a>
      </div>
      <div class="ms-2">
        <a v-if="!editing && (localUserId === comment.user._id || userForm.admin === true) " href=""
           @click.prevent="deleteComment" class="text-danger"><i
            class="bi bi-file-earmark-excel-fill"></i></a>
        <a v-else></a>
      </div>
    </div>
    <div v-if="editing" class="card-body">
      <textarea class="form-control" rows="8" v-model="comment.message"></textarea>
      <div class="d-flex mt-2">
        <button class="ms-auto btn btn-sm btn-primary" @click.prevent="updateComment">Enregistrer</button>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text">
        {{ comment.message }}
      </p>
      <div class="card-img"><img :src="comment.image" style="width: 100%;"></div>
      <small class="text-muted">{{ formatDate }} – {{ comment.usersLiked.length }}
        <a v-if="comment.usersLiked.includes(localUserId)" href="#" class="text-decoration-none"
           @click.prevent="unlike"><i
            class="bi bi-hand-thumbs-up-fill"></i></a>
        <a v-else href="#" class="text-decoration-none" @click.prevent="like"><i
            class="bi bi-hand-thumbs-up"></i></a>
      </small>
    </div>
  </div>

</template>

<style>
</style>

<script>
import { $fetch } from "ohmyfetch";


export default {
  name: "commentaire",
  props: ["comment", "image", "userForm"],
  data() {
    return {
      editing: false,
      deleted: false,
    }
  },

  computed: {
    formatDate() {
      return (new Date(this.comment.createdAt)).toLocaleString()
    },
    localUserId() {
      return localStorage.getItem('userId')
    },
  },

  methods: {

    async like() {
      const userId = localStorage.getItem('userId')
      if (!this.comment.usersLiked.includes(userId)) {
        await $fetch(`http://localhost:4200/api/comments/${this.comment._id}/like`, {
          method: "POST",
          headers: { Authorization: `Token ${localStorage.getItem("token")}`, },
          body: { userId, like: 1 }
        })
        this.comment.usersLiked.push(userId)
      }
    },

    async unlike() {
      const userId = localStorage.getItem('userId')
      if (this.comment.usersLiked.includes(userId)) {
        await $fetch(`http://localhost:4200/api/comments/${this.comment._id}/like`, {
          method: "POST",
          headers: { Authorization: `Token ${localStorage.getItem("token")}`, },
          body: { userId, like: -1 }
        })
        this.comment.usersLiked = this.comment.usersLiked.filter(user => user !== userId)
      }
    },

    async updateComment() {
      const userId = localStorage.getItem('userId')
      const response = await $fetch(`http://localhost:4200/api/comments/${this.comment._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: {
          userId,
          message: this.comment.message,
          image: this.comment.image,
        }
      })
      this.changeState()
    },

    async deleteComment() {
      await $fetch(`http://localhost:4200/api/comments/${this.comment._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      this.deleted = true
    },

    changeState() {
      this.editing = !this.editing
    },
  },
}


</script>