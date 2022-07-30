<template>
  <div id="blockFakeComment">
    <div class="card" id="fakeComment">
      <div class="card-body">
        <div id="commentUserId">
          <img
              :src="comment.user.profilePicture"
              alt="avatar" width="30"
              height="30"/>
          <div class="userIdDate">
            <p class="small">{{ comment.user.fullname + " - " + comment.user.service }}</p>
            <p style="font-size: 0.875em;">Le 22 juillet 2022</p>
          </div>
        </div>
        <div class="d-flex flex-column gap-1">
          <div class="">
            <p>{{ comment.message }}</p>
          </div>
          <div class="d-flex gap-2" id="likeEditDelete" style="margin-top: 1rem">
            <button class="btn btn-outline-danger" @click="deleteComment"><i class="bi bi-trash-fill"></i>
            </button>
            <button class="btn btn-outline-primary" @click="transformInput">✍️</button>
            <!--  updateComment(comment._id) -->
            <button class="btn btn-outline-success" @click="likeMessage">👍</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>

import { $fetch } from "ohmyfetch";
// const moment = from ('moment')

export default {
  name: "commentaire",
  props: ["comment"],
  data() {
    return {
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
      // location.reload()
    },

    // async transformInput() {
    //
    // },
  },
}

</script>