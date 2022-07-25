<template>
  <div style="display: flex;
    justify-content: flex-end;">
    <input type="submit" @click="logout()" class="btn btn-danger px-4" value="Se déconnecter">
  </div>
  <div class="container">
    <div class="main-body">
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
                  <div>
                    <input id="file" class="inputfile" type="file"  accept="image/*" v-on:change="onChange"/>
                    <label for="file" class="label-file"><i class="fas fa-camera fa-lg"></i></label>
                  </div>


                <img v-if="this.userProfile.profilePicture" :src="this.userProfile.profilePicture"
                     id="ProfilePic" alt="User Profile Picture" width="110"
                     class="rounded-circle p-1 bg-primary" style="   object-fit: cover;
  width: 110px;
  height: 110px;"/>
                <img v-else="userProfile.profilePicture" is="null" src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                     id="ProfilePicPlaceholder" alt="User Profile Picture Placeholder"
                     class="rounded-circle p-1 bg-primary" width="110"/>
                <div class="mt-3">
                  <h4>{{ userProfile.fullname }}</h4>
                  <p>{{ userProfile.service }}</p>
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
                  <input type="text" class="form-control" v-model="userProfile.service"
                         placeholder="Ressources humaines">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-9 text-secondary">
                  <input type="submit" @click="updateProfile()
                  ; goProfile()
" class="btn btn-primary px-4"
                         value="Enregistrer">
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

/*#ProfilePic {*/
/*  width: 12rem*/
/*}*/




.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}


.rounded-circle {
  width: 8rem;
  height: 8rem;
  border-radius: 50% !important;
}

/*.fa-camera {*/
/*  position: relative;*/
/*  overflow: hidden;*/
/*}*/

.fa-camera {
  opacity: 70%;
  margin-left: 4rem;
  margin-top: -2rem;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: darkgrey;
  border-radius: 50%;
  border: none;
  position: relative;
  top: 8rem;
  right: -1rem;
}

.fa-camera:hover {
  opacity: 100%;
  transition: opacity 350ms;
}

.btn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}

.fa-camera:hover {
  cursor: pointer;
}
</style>
<script>
import { $fetch } from "ohmyfetch";

export default {
  name: "EditProfile",
  data() {
    return {
      userProfile: {
        fullname: "",
        email: "",
        service: "",
        profilePicture: null
      },
    }
  },
  methods: {
    async getProfile() {
      const urlProfile = `http://localhost:4200/api/auth/profile/${localStorage.getItem('userId')}`
      const response = await $fetch((urlProfile), {
        method: "GET",
        headers: { Authorization: `Token ${localStorage.getItem("token")}` }

      })
      this.userProfile.profilePicture = response.profilePicture
      this.userProfile.fullname = response.fullname
      this.userProfile.email = response.email
      this.userProfile.service = response.service
    },
    async updateProfile() {
      const userId = localStorage.getItem('userId')
      const response = await $fetch(`http://localhost:4200/api/auth/profile/${userId}`, {
        method: "PUT",
        headers: { Authorization: `Token ${localStorage.getItem("token")}` ,
          // 'Content-Type': 'multipart/form-data'
        },
        body: {
          userId,
          profilePicture: this.userProfile.profilePicture,
          fullname: this.userProfile.fullname,
          email: this.userProfile.email,
          service: this.userProfile.service
        }
      })
    },
    goProfile() {
      this.$router.push('/profile');
    },
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
    onChange(e) {
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.userProfile.profilePicture = e.target.result
      }
    },

  },
  async created() {
    await this.getProfile()
  },
}


</script>
