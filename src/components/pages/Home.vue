<template>
    <!-- Seção de boa-vindas na página home -->    
    <section>
        <section class="welcome-section d-flex align-items-center">
            <b-container class="text-center text-dark">
                <h1>Bem-vindo ao Currículo Incit</h1>  
            </b-container>
        </section>
        <b-container class="p-3">                        
            <!-- Para lembrar: user_type = 0 para empresa e user_type = 1 para pessoa -->
            <!-- Seção contendo os botões de cadastro -->
            <section class="p-3">                        
                <b-row class="text-center">
                    <b-col class="mt-3">
                        <!-- Botão para abrir o modal de cadastro de empresas -->
                        <b-btn variant="outline-dark" size="lg" @click="showModalCompany"> 
                            Cadastro de empresas 
                        </b-btn>
                    </b-col>
                    <b-col class="mt-3">
                        <!-- Botão para abrir o modal de cadastro de pessoas -->
                        <b-btn variant="outline-dark" size="lg" @click="showModalPerson">
                            Cadastro de pessoas
                        </b-btn>
                    </b-col>
                </b-row>                        
            </section>            
        </b-container>

        <!-- Modal do cadastro de empresas -->
        <b-modal class="text-dark w-50 float-left"
            hide-footer
            :centered="true"
            title="Cadastro de Empresas"
            size="lg"
            ref="modalRegCompany">                  
        
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de empresa, contém: nome, email, cnpj, senha e tipo de usuário(empresa = 0) -->
                <b-form id="companyForm" @submit="validateCompany">
                    <!-- Nome -->
                    <b-form-group id="inputGroupCompanyName"
                        label="Nome"
                        label-for="companyName">                        
                        <b-form-input id="companyName"
                            type="text"                             
                            v-model.trim="name"
                            :state="!$v.name.$invalid"                            
                            aria-describedby="inputCompanyNameFeedback"
                            placeholder="Digite o nome da empresa... *" required></b-form-input>                        
                    </b-form-group>
                    <b-form-invalid-feedback id="inputCompanyNameFeedback">
                            This is a required field and must be at least 3 characters
                    </b-form-invalid-feedback>
                    
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
                        <b-btn variant="outline-success" type="submit">Enviar</b-btn>
                    </div>
                </b-form>
            </div>
        </b-modal>

        <!-- Modal do cadastro de pessoas -->
        <b-modal class="text-dark w-50 float-left"
            hide-footer
            :centered="true"
            title="Cadastro de Pessoas"
            size="lg"
            ref="modalRegPerson">   

            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de pessoa, contém: nome, email, cpf, senha e tipo de usuário(pessoa = 1) -->
                <b-form id="personForm" @submit="validatePerson">                    
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
                        <b-btn variant="outline-success" type="submit">Enviar</b-btn>
                    </div>
                </b-form>
            </div>    
        </b-modal>
    </section>
</template>

<script>
    // O comentário na linha de baixo desbilita os warnings
/* eslint-disable */

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';

// Import das funções utilizadas do Vuelidate
import { required, minLength, between } from 'vuelidate/lib/validators'

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
            password: '',
            error: null
    }
    },
    methods: {
        // Método para intermediar a validação do formulário de empresa
        validateCompany($event) {            
            if(this.isValid) {
                this.user_type = 0;
                this.sendInfo();
            }
            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },
        // Método para intermediar a validação do formulário de pessoa
        validatePerson($event) {
            if(this.isValid) {
                this.user_type = 1;
                this.sendInfo();
            }
            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },
        // Método para enviar as informações para o cadastro
        sendInfo() {      
            // Requisição POST para cadastrar na plataforma
              
            API.post('/newAccount', {
                name: this.name,
                email: this.email,
                identity: this.identity,
                user_type: this.user_type,
                password: this.password
            }).then(response => {
                // Esse log de console é utilizado para utilizar o response declarado
                // e o warning não ocorrer na compilação 
                // console.log(response.data.code);

                // Redireciona para o login em caso de sucesso
                this.$router.push('/login');                
            }).catch(error => {
                this.error = error.response.data.message;
            }); 
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
    },
    // Validações feitas com o auxílio do Vuelidate
    validations: {
        name: {
            required,
            minLength: minLength(6)
        },
        email: {

        },
        identity: {

        },
        user_type: {
        
        },
        password: {

        },
    }
};

</script>

<style>

.welcome-section {
    background-color: rgba(253, 223, 49, 0.952);
}
  
.welcome-section {
    min-height: 300px;
}
  
@media (min-width: 576px) {
    .welcome-section {
        min-height: 400px;
    }
}
  
@media (min-width: 768px) {
    .welcome-section {
        min-height: 550px;
    }
}

</style>
