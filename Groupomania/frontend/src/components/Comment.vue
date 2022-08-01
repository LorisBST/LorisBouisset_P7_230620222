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
        <a v-if="!editing" href="" class="text-warning" @click.prevent="changeState"><i class="bi bi-pencil-fill"></i>
        </a>
      </div>
      <div class="ms-2">
        <a v-if="!editing" href="" @click.prevent="deleteComment" class="text-danger"><i class="bi bi-file-earmark-excel-fill"></i></a>
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
    return {
      editing: false,
      fullname: "",
      service: "",
      message: "",
      image:""

    }
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
            comment: this.comment.message,
            image: this.comment.image,
            updatedAt : this.comment.updatedAt
        }
      })
    },
    async deleteComment() {
      await $fetch(`http://localhost:4200/api/comments/${this.comment._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
    },
    changeState() {
      this.editing = !this.editing
    },
    // async mounted() {
    //   await updateComment()
    // },
  },

}

</script>