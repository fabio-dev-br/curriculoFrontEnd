<template>
  <b-container class="p-3">
    <!-- Seção de boa-vindas na página home -->
    <b-col>
        <section class="welcome-section d-flex align-items-center">
            <div class="container text-center">
                <h1>Bem-vindo ao Currículo Incit</h1>  
            </div>
        </section>
    </b-col>
    <b-col>
        <!-- Para lembrar: user_type = 0 para empresa e user_type = 1 para pessoa -->
        <!-- Seção contendo os botões de cadastro -->
        <section class="pt-2 pb-3">
            <div class="container">
                <div class="row text-center">
                    <div class="col-sm mt-4">

                        <!-- Botão para abrir o modal de cadastro de empresas -->
                        <b-button class="btn btn-lg btn-primary" @click="showModalCompany"> 
                          Cadastro de empresas 
                        </b-button>
                    </div>
                    <div class="col-sm mt-4">
                    
                        <!-- Botão para abrir o modal de cadastro de pessoas -->
                        <b-button class="btn btn-lg btn-primary" @click="showModalPerson">
                          Cadastro de pessoas
                        </b-button>
                    </div>
                </div>
            </div>
        </section>
    </b-col>
    
    <!-- Modal do cadastro de empresas -->
    <b-modal class="text-dark w-50 float-left"
      cancel-title="Cancelar"
      centered
      title="Cadastro de Empresas"
      size="lg"
      v-model="modalRegCompShow"
      ok-title="Enviar"
      @click="user_type = 0 , sendInfo()">                  
      
      <!-- Modal body -->
      <div class="modal-body">

          <!-- Formulário de empresa, contém: nome, email, cnpj, senha e tipo de usuário(empresa = 0) -->
          <form>
              <div class="form-group">
                  <label for="companyName"> Nome da empresa </label>                        
                  <input type="text" class="form-control bg-transparent"
                      id="companyName"
                      v-model="name"
                      placeholder="Digite o nome da empresa... *" required>
                  <p class="help-block text-danger"></p>
              </div>
              <div class="form-group">
                  <label for="companyEmail"> E-mail da empresa </label>
                  <input type="email" class="form-control bg-transparent"
                      id="companyEmail"
                      aria-describedby="emailHelp"
                      v-model="email"
                      placeholder="Digite o email... *" required>
                  <p class="help-block text-danger"></p>
                  <small class="form-text text-muted" id="emailHelp"> Digite um e-mail no formato: nome@dominio.com </small>
              </div>
              <div class="form-group">
                  <label for="companyCnpj"> CNPJ da empresa </label>
                  <input type="text" class="form-control bg-transparent"
                      id="companyCpf"
                      v-model="identity"
                      placeholder="Digite o CNPJ da empresa... *" required>
                  <p class="help-block text-danger"></p>
              </div>
              <div class="form-group">
                  <label for="companyPassword"> Senha </label>
                  <input type="password" class="form-control bg-transparent"
                      id="companyPassword"
                      aria-describedby="passwordHelp"
                      v-model="password"
                      placeholder="Digite a senha... *" required>
                  <p class="help-block text-danger"></p>
                  <small class="form-text text-muted" id="passwordHelp"> A senha deve possuir no mínimo  </small>
              </div>
              <!-- Modal footer -->
              <div class="modal-footer">              
                  <b-btn variant="outline-danger" @click="hideModalPerson">Fechar</b-btn>
                  <b-btn variant="outline-success" @click="user_type = 0 , sendInfo()">Enviar</b-btn>
              </div>
          </form>
      </div>
    </b-modal>

    <!-- Modal do cadastro de pessoas -->
    <b-modal class="text-dark w-50 float-left"
      hide-footer
      centered
      title="Cadastro de Pessoas"
      size="lg"
      ref="modalRegPerShow"      
      @click="user_type = 1 , sendInfo()">   

      <!-- Modal body -->
      <div class="modal-body">

          <!-- Formulário de pessoa, contém: nome, email, cpf, senha e tipo de usuário(pessoa = 1) -->
          <form id="personForm">
              
              <!-- Nome -->
              <div class="form-group">
                  <label for="personName"> Nome </label>
                  <input type="text" class="form-control bg-transparent"
                      id="personName"
                      v-model="name"
                      placeholder="Digite o seu nome... *" required>
                  <p class="help-block text-danger"></p>
              </div>

              <!-- E-mail -->
              <div class="form-group">
                  <label for="personEmail"> E-mail </label>
                  <input type="email" class="form-control bg-transparent"
                      id="personEmail"
                      aria-describedby="emailHelp"
                      v-model="email"
                      placeholder="Digite o seu email... *" required>
                  <p class="help-block text-danger"></p>
                  <small class="form-text text-muted" id="emailHelp"> Digite um e-mail no formato: nome@dominio.com </small>
              </div>

              <!-- CPF -->
              <div class="form-group">
                  <label for="personCpf"> CPF </label>
                  <input type="text" class="form-control bg-transparent"
                      id="personCpf"
                      v-model="identity"
                      placeholder="Digite o seu CPF... *" required>
                  <p class="help-block text-danger"></p>
              </div>

              <!-- Senha -->
              <div class="form-group">
                  <label for="personPassword"> Senha </label>
                  <input type="password" class="form-control bg-transparent"
                      id="personPassword"
                      aria-describedby="passwordHelp"
                      v-model="password"
                      placeholder="Digite uma senha... *" required>
                  <p class="help-block text-danger"></p>
                  <small class="form-text text-muted" id="passwordHelp"> A senha deve possuir no mínimo  </small>
              </div>
              <!-- Modal footer -->
              <div class="modal-footer">              
                <b-btn variant="outline-danger" @click="hideModalPerson">Fechar</b-btn>
                <b-btn variant="outline-success" @click="user_type = 0 , sendInfo()">Enviar</b-btn>
              </div>
          </form>
      </div>    
    </b-modal>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      themeColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      modalRegCompShow: false,
      modalRegPerShow: false,
      name: '',
      email: '',
      identity: '',
      user_type: '',
      password: ''
    }
  },
  methods: {
    sendInfo: function() {
      alert("teste");
    },
    showModalCompany () {
      this.$refs.modalRegCompShow.show()
    },
    hideModalCompany () {
      this.$refs.modalRegCompShow.hide()
    },
    showModalPerson () {
      this.$refs.modalRegPerShow.show()
    },
    hideModalPerson () {
      this.$refs.modalRegPerShow.hide()
    }
  }
}



// Instância para tratar do modal que abrange o cadastro da empresa na plataforma
// var companyModal = new Vue({
//     el: '#companyModal',
//     data: {
//         name: '',
//         email: '',
//         identity: '',
//         user_type: '',
//         password: ''
//     },
//     methods: {
//         sendInfo() {
//             if(!this.isValid()){
//                 alert("Preencha todos os campos!!!");
//             }
  
//             $.post('/newAccount', {
//                 name: this.name,
//                 email: this.email,
//                 identity: this.identity,
//                 user_type: this.user_type,
//                 password: this.password
//             }, null, 'json').then(r => {
//                 console.log(r);
//             }, err => {
//                 console.log(err.responseJSON);
//             });
//         },
//         isValid() {
//             return  this.name && 
//                     this.email && 
//                     this.identity && 
//                     this.password;
//         }
//     },
//     computed: {
        
//     }
// });
</script>