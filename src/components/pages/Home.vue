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
            hide-footer
            centered
            title="Cadastro de Empresas"
            size="lg"
            ref="modalRegCompany">                  
        
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de empresa, contém: nome, email, cnpj, senha e tipo de usuário(empresa = 0) -->
                <b-form id="companyForm">
                    <!-- Nome -->
                    <b-form-group>
                        <b-form-text for="companyName"> Nome da empresa </b-form-text>                      
                        <b-form-input type="text" 
                            id="companyName"
                            v-model="name"
                            placeholder="Digite o nome da empresa... *" required></b-form-input>         
                    </b-form-group>

                    <!-- E-mail -->
                    <b-form-group description="Digite um e-mail no formato: nome@dominio.com">
                        <b-form-text for="companyEmail"> E-mail da empresa </b-form-text>
                        <b-form-input type="email" 
                            id="companyEmail"
                            v-model="email"
                            placeholder="Digite o email... *" required></b-form-input>                    
                    </b-form-group>

                    <!-- CNPJ -->
                    <b-form-group>
                        <b-form-text for="companyCnpj"> CNPJ da empresa </b-form-text>
                        <b-form-input type="text"
                            id="companyCpf"
                            v-model="identity"
                            placeholder="Digite o CNPJ da empresa... *" required></b-form-input>
                    </b-form-group>

                    <!-- Senha -->
                    <b-form-group description="A senha deve possuir no mínimo">
                        <b-form-text for="companyPassword"> Senha </b-form-text>
                        <b-form-input type="password"
                            id="companyPassword"
                            v-model="password"
                            placeholder="Digite a senha... *" required></b-form-input> 
                    </b-form-group>

                    <!-- Modal footer (Quando há o clique no botão enviar a variável user_type recebe 0) -->
                    <div class="modal-footer">              
                        <b-btn variant="outline-danger" @click="hideModalCompany">Fechar</b-btn>
                        <b-btn variant="outline-success" @click="user_type = 0 , sendInfo()">Enviar</b-btn>
                    </div>
                </b-form>
            </div>
        </b-modal>

        <!-- Modal do cadastro de pessoas -->
        <b-modal class="text-dark w-50 float-left"
            hide-footer
            centered
            title="Cadastro de Pessoas"
            size="lg"
            ref="modalRegPerson">   

            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de pessoa, contém: nome, email, cpf, senha e tipo de usuário(pessoa = 1) -->
                <b-form id="personForm">
                    
                    <!-- Nome -->
                    <b-form-group>
                        <b-form-text for="personName"> Nome </b-form-text>
                        <b-form-input type="text"
                            id="personName"
                            v-model="name"
                            placeholder="Digite o seu nome... *" required></b-form-input>                        
                    </b-form-group>

                    <!-- E-mail -->
                    <b-form-group description="Digite um e-mail no formato: nome@dominio.com">
                        <b-form-text for="personEmail"> E-mail </b-form-text>
                        <b-form-input type="email"
                            id="personEmail"
                            v-model="email"
                            placeholder="Digite o seu email... *" required></b-form-input>                        
                    </b-form-group>

                    <!-- CPF -->
                    <b-form-group>
                        <b-form-text for="personCpf"> CPF </b-form-text>
                        <b-form-input type="text" 
                            id="personCpf"
                            v-model="identity"
                            placeholder="Digite o seu CPF... *" required></b-form-input>                        
                    </b-form-group>

                    <!-- Senha -->
                    <b-form-group description="A senha deve possuir no mínimo">
                        <b-form-text for="personPassword"> Senha </b-form-text>
                        <b-form-input type="password" 
                            id="personPassword"
                            v-model="password"
                            placeholder="Digite uma senha... *" required></b-form-input>
                    </b-form-group>

                    <!-- Modal footer (Quando há o clique no botão enviar a variável user_type recebe 1) -->
                    <div class="modal-footer">              
                        <b-btn variant="outline-danger" @click="hideModalPerson">Fechar</b-btn>
                        <b-btn variant="outline-success" @click="user_type = 1 , sendInfo()">Enviar</b-btn>
                    </div>
                </b-form>
            </div>    
        </b-modal>
    </b-container>
</template>

<script>

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';

export default {
    name:"home",
    data () {
    return {
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
    // Método para enviar as informações para o cadastro
    sendInfo: function() {      
        if(this.isValid()){
            // Requisição POST para logar na plataforma
            API.post('/newAccount', {
                name: this.name,
                email: this.email,
                identity: this.identity,
                user_type: this.user_type,
                password: this.password
            }).then(response => {
                // Se o usuário é uma empresa (user_type = 0) redireciona para o portal da empresa
                if(response.data.data.user_type == 0) {
                    this.$router.push('/portal-empresa');
                }

                // Se o usuário é uma pessoa (user_type = 1) redireciona para o portal de pessoa
                if(response.data.data.user_type == 1) {
                    this.$router.push('/portal-pessoa');
                }
            }).catch(error => {
                this.error = error.response.data.message;
            });
        }

        // $.post('/newAccount', {
        //     name: this.name,
        //     email: this.email,
        //     identity: this.identity,
        //     user_type: this.user_type,
        //     password: this.password
        // }, null, 'json').then(r => {
        //     console.log(r);
        // }, err => {
        //     console.log(err.responseJSON);
        // });              
    },
    showModalCompany () {
      this.$refs.modalRegCompany.show()
    },
    hideModalCompany () {
      this.$refs.modalRegCompany.hide()
    },
    showModalPerson () {
      this.$refs.modalRegPerson.show()
    },
    hideModalPerson () {
      this.$refs.modalRegPerson.hide()
    }
  },
  computed: {
      isValid() {
        // deve garantir que o formulário é valido
        return true;  
      }
  }
}




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
        // sendInfo() {
        //     if(!this.isValid()){
        //         alert("Preencha todos os campos!!!");
        //     }
  
        //     $.post('/newAccount', {
        //         name: this.name,
        //         email: this.email,
        //         identity: this.identity,
        //         user_type: this.user_type,
        //         password: this.password
        //     }, null, 'json').then(r => {
        //         console.log(r);
        //     }, err => {
        //         console.log(err.responseJSON);
        //     });
        // },
        // isValid() {
        //     return  this.name && 
        //             this.email && 
        //             this.identity && 
        //             this.password;
        // }
//     },
//     computed: {
        
//     }
// });
</script>