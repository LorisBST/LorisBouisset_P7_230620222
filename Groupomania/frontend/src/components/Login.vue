<script>
export default {
  name: 'Login'
}
</script>

<template>

  <div class="d-flex flex-column d-flex align-items-center" >
    <img class="img-fluid" style="height: 500px; height: 25rem;
    margin: -7rem; padding: 1rem;"
         src="/logo/GroupomaniaLogos/icon-left-font-monochrome-black.png"
         alt="Groupomania Logo (crossed planet)">
  </div>


  <!-- Pills navs -->
  <div class="d-flex flex-column d-flex align-items-center">
    <ul class="row d-flex justify-content-center nav nav-pills nav-justified mb-3 tab-content " id="ex1" role="tablist">
      <li class="nav-item pill-1" role="presentation">
        <a class="nav-link active d-flex align-items-center d-flex align-content-center" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
           aria-controls="pills-login" aria-selected="true" style=" justify-content: center">Se connecter</a>
      </li>
      <li class="nav-item pill-2" role="presentation">
        <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
           aria-controls="pills-register" aria-selected="false" style="" >Créer un compte</a>
      </li>
    </ul>
    <!-- Pills navs -->

    <!-- Pills content -->
    <div class="row d-flex justify-content-center tab-content">
      <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login" style="width: 23.5rem">
        <form>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="loginName" class="form-control" style="border: 1px solid lightgray"/>
            <label class="form-label" for="loginName">Adresse E-mail</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <input type="password" id="loginPassword" class="form-control" style="border: 1px solid lightgray"/>
            <label class="form-label" for="loginPassword">Mot de passe</label>
          </div>

          <!-- 2 column grid layout -->
          <div class="row mb-4">
            <div class="col-md-6 d-flex justify-content-center">
              <!-- Checkbox -->
              <div class="form-check mb-3 mb-md-0">
                <input class="form-check-input" type="checkbox" value="" id="loginCheck" style="background: black; border-color:#FD2D01"/>
                <label class="form-check-label" for="loginCheck"> Se souvenir de moi </label>
              </div>
            </div>
          </div>

          <!-- Submit button -->
          <button type="submit" id="btnLogin" class="btn btn-block mb-4" style="background: #FD2D01; color: white">Se connecter</button>
        </form>
      </div>
      <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register" style="width: 23.5rem">
        <form>

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="registerEmail" class="form-control" style="border: 0.5px solid lightgrey" />
            <label class="form-label" for="registerEmail" >Adresse E-mail</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <input type="password" id="registerPassword" class="form-control" style="border: 0.5px solid lightgrey" />
            <label class="form-label" for="registerPassword">Mot de passe</label>
          </div>
          <!-- Checkbox -->
          <div class="form-check d-flex justify-content-center mb-4">
            <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                   aria-describedby="registerCheckHelpText" style="background: black; border-color:#FD2D01"/>
            <label class="form-check-label" for="registerCheck" >
              J'ai lu et j'accèpte les conditions d'utilisations.
            </label>
          </div>

          <!-- Submit button -->
          <button type="submit" id="btnRegister" class="btn btn-block mb-3" style="background: #FD2D01; color: white">Créer un compte</button>
        </form>
      </div>
    </div>
  </div>
  <!-- Pills content -->

  <footer class="page-footer font-small blue">

    <!-- Copyright -->
    <div class="footer-copyright text-center py-3">© 2022 Copyright:
      <a href="/"> Groupomania.fr</a>
    </div>
    <!-- Copyright -->

  </footer>

</template>

<style>

</style>