<template>

  <div class="card shadow mb-5">
    <div class="card-header d-flex align-items-center">
      <div style="width: 30px">
        <img :src="comment.user.profilePicture" class="img-fluid rounded-circle" alt="...">
      </div>
      <div class="ms-3">
        {{ comment.user.fullname }} - <em>{{ comment.user.service }}</em>
      </div>
      <div class="ms-auto">
        <a href="" class="text-warning"><i class="bi bi-pencil-fill"></i>
        </a>
      </div>
      <div class="ms-2">
        <a href="" @click="deleteComment" class="text-danger"><i class="bi bi-file-earmark-excel-fill"></i></a>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text">
        {{ comment.message }}
      </p>
      <div class="card-img"> <img :src="comment.image" style="    width: 100%;"></div>
      <small class="text-muted">{{ comment.updatedAt }}</small>
    </div>
  </div>
</template>

<style>
</style>

<script>

import { $fetch } from "ohmyfetch";
// import moment from 'moment';


export default {
  name: "commentaire",
  props: ["comment","image"],
  data() {
    return {}
  },

  methods: {

    async updateComment() {
      const userId = localStorage.getItem('userId')
      const response = await $fetch(`http://localhost:4200/api/comments/${this.comment._id}`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,

        },
        body: {
          userId,
          message: this.postComment.message
        }
      })
      // location.reload()
    },
    async deleteComment() {
      await $fetch(`http://localhost:4200/api/comments/${this.comment._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })

    },

  },
}

</script>