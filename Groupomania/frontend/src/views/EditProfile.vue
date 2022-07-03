<script>
export default {
  name: "EditProfile"
}
</script>

<template>
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
                  <p class="text-secondary mb-1">Full Stack Developer</p>
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
                  <input type="text" class="form-control" value="Prénom Nom">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Adresse E-mail</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" value="adressemail@email.com">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Service</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" value="Ressources humaines">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-9 text-secondary">
                  <input type="button" class="btn btn-primary px-4" value="Enregistrer">
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