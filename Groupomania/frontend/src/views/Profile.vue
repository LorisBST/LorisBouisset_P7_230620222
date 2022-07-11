<script>
import { $fetch } from 'ohmyfetch'
import { mapGetters } from "vuex"
export default {
  name: "Profile",
  data() {
    return {
      userId: "",
      userForm: {
        fullname: "",
        email: "",
        service: ""
      },
    }
  },

  methods: {
    async getProfile() {
      const urlProfile = `http://localhost:4200/api/auth/profile/${this.userId}`
      const response = await $fetch((urlProfile), {
        method: "GET",
        headers: { Authorization: `Token ${localStorage.getItem("token")}` }

      })
      this.userForm.fullname = response.fullname
      this.userForm.email = response.email
      this.userForm.service = response.service
    },
    logout() {
      this.$store.commit("clearUserId")
      localStorage.clear()
      this.$router.push('/login')

    },
  },
  computed : {...mapGetters(["getUserId"])},
  async mounted() {
    this.userId = this.getUserId
    await this.getProfile()
  },


}


</script>


<template>
  <div style="display: flex;
    justify-content: flex-end;">
    <input type="submit" @click="logout()" class="btn btn-danger px-4" value="Se déconnecter">
  </div>
  <div class="container">
    <div class="main-body">

      <!-- Breadcrumb -->
      <!--  <nav aria-label="breadcrumb" class="main-breadcrumb">-->
      <!--    <ol class="breadcrumb">-->
      <!--      <li class="breadcrumb-item"><a href="index.html">Home</a></li>-->
      <!--      <li class="breadcrumb-item"><a href="javascript:void(0)">User</a></li>-->
      <!--      <li class="breadcrumb-item active" aria-current="page">User Profile</li>-->
      <!--    </ol>-->
      <!--  </nav>-->
      <!-- /Breadcrumb -->

      <div class="row gutters-sm"

           style="
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;">

        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle"
                     width="150">
                <div class="mt-3">
                  <h4>{{ userForm.fullname }}</h4>
                  <p class="text-secondary mb-1">{{ userForm.service }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Prénom Nom</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ userForm.fullname }}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Adresse E-mail</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ userForm.email }}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Service</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ userForm.service }}
                </div>
              </div>

              <hr>
              <div class="row">
                <div class="col-sm-12">
                  <a class="btn btn-info " target="__blank" href="http://localhost:3000/editprofile">Modifier</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
</style>