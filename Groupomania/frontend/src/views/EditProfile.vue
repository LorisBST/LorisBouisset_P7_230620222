
<template>
  <div style="display: flex;
    justify-content: flex-end;">
    <input type="submit" @click="logout()" class="btn btn-danger px-4" value="Se déconnecter">
  </div>
  <div class="container">
    <div class="main-body" >

      <div class="row"

  style="
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;">

        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">

              <div class="d-flex flex-column align-items-center text-center">

                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">

                <i class="fas fa-camera fa-lg"

    style="
    position: relative;
    margin-top: -2rem;
    margin-left: 5rem;
    font-size: 1.2rem;
    box-shadow: 1px 1px 3px grey;
    background-color: var(--bs-gray-200);
    padding: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;">
                </i>

                <div class="mt-3">
                  <h4>Prénom Nom</h4>
                  <p>Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Nom complet</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="userProfile.fullname" placeholder="Prénom Nom">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Adresse E-mail</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="userProfile.email" disabled>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Service</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="userProfile.service" placeholder="Ressources humaines">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-9 text-secondary">
                  <input type="submit" @click="updateProfile(); goProfile()" class="btn btn-primary px-4" value="Enregistrer">
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
.fa-camera:hover{
  cursor:pointer;
  opacity: 75%;

}
</style>

<script>
import {$fetch} from "ohmyfetch";

export default {
  name: "EditProfile",
  data() {
    return {
      userProfile: {
        fullname: "",
        service: ""
      },

    }
  },
  methods: {
    async getProfile() {
      const urlProfile = `http://localhost:4200/api/auth/profile/${localStorage.getItem('userId')}`
      const response = await $fetch((urlProfile), {
        method:"GET",
        headers : {Authorization:`Token ${localStorage.getItem("token")}`}

      })
      this.userProfile.fullname = response.fullname
      this.userProfile.email = response.email
      this.userProfile.service = response.service
    },

    async updateProfile() {
      const userId = localStorage.getItem('userId')
      const response = await $fetch(`http://localhost:4200/api/auth/profile/${userId}`, {
        method: "PUT",
        headers: {Authorization: `Token ${localStorage.getItem("token")}`},
        body: {
          userId,
          fullname: this.userProfile.fullname,
          email: this.userProfile.email,
          service: this.userProfile.service

        }
      })
    },
    goProfile() {
      this.$router.push('/profile');


    },
    logout(){
      localStorage.clear()
      this.$router.push('/login')
    }

  },
  async created() {
    await this.getProfile()
  },
}


</script>
