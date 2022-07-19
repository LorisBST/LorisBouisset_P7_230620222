
<script>


import {$fetch} from 'ohmyfetch'

export default {
  name: "Profile",
  data() {
    return {
      userForm: {
        fullname:"",
        email: "",
        service: "",
        profilePicture: "",
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
    this.userForm.fullname = response.fullname
    this.userForm.email = response.email
    this.userForm.service = response.service
    // this.userProfile.profilePicture = response.profilePicture
  },
    editProfile(){
      this.$router.push('/editprofile');
    },
    logout(){
      localStorage.clear()
      this.$router.push('/login')

    },
    goHome(){
      this.$router.push('/home');
    },
  },
  async created() {
    await this.getProfile()
  },



}


</script>

<template>


  <div style="display: flex;
    justify-content: flex-end;">

    <a class="btn btn-danger" target="__blank" @click="logout"> se déconnecter <BootstrapIcon icon="door-open-fill" id="power" size="1rem" color="white" font-weight="bold"/></a>

  </div>

  <div style="display: flex;
    justify-content: flex-end;">
    <a class="btn btn-light" target="__blank" @click="goHome"> acceuil <BootstrapIcon icon="house-door-fill" id="house" size="1rem" color="black" gap="1rem" font-weight="bold"/></a>
  </div>
  <div class="container">
<div class="main-body">

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
            <img src="{{userForm.profilePicture}}" alt="Admin" class="rounded-circle" width="150">
            <div class="mt-3">
              <h4>{{userForm.fullname}}</h4>
              <p class="text-secondary mb-1">{{userForm.service}}</p>
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
              {{userForm.fullname}}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Adresse E-mail</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{userForm.email}}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">Service</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{userForm.service}}
            </div>
          </div>

          <hr>
          <div class="row">
            <div class="col-sm-12">
              <a class="btn btn-info" target="__blank" @click="editProfile">Modifier</a>
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
#power {
  font-weight: bold;
}

#house {
  position: relative;
  margin-left: 5px;
  top: -1px;
}

.btn-danger, .btn-light {
  width : 12rem
}
</style>