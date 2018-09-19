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
                            v-model.trim="formCompany.name"
                            :state="!$v.formCompany.name.$invalid"
                            aria-describedby="inputCompanyNameFeedback"
                            placeholder="Digite o nome da empresa... *" required></b-form-input>

                        <b-form-invalid-feedback id="inputCompanyNameFeedback">
                            <p v-if="!$v.formCompany.name.required">
                                Preencha este campo.
                            </p> 
                            <p v-else-if="!$v.formCompany.name.maxLength">
                                O nome pode ter no máximo tamanho 50.
                            </p>                            
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- E-mail -->
                    <b-form-group description="Digite um e-mail no formato: nome@dominio.com"
                        label="E-mail"
                        label-for="companyEmail">
                        <b-form-input type="email" 
                            id="companyEmail"
                            v-model.trim="formCompany.email"
                            @input="delayTouch($v.formCompany.email)"
                            :state="!$v.formCompany.email.$invalid"
                            aria-describedby="inputCompanyEmailFeedback"
                            placeholder="Digite o email... *" required></b-form-input>
                        <b-form-invalid-feedback id="inputCompanyEmailFeedback">
                            <p v-if="!$v.formCompany.email.required">
                                Preencha este campo.
                            </p> 
                            <p v-else-if="!$v.formCompany.email.email">
                                Digite um e-mail válido.
                            </p>
                            <p v-else-if="!$v.formCompany.email.maxLength">
                                O e-mail pode ter no máximo tamanho 50.
                            </p> 
                            <p v-else-if="!$v.formCompany.email.isUnique">
                                Esse e-mail já é utilizado.
                            </p> 
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- CNPJ -->
                    <b-form-group description="Digite apenas os números"
                        label="CNPJ"
                        label-for="companyCnpj">
                        <b-form-input type="text"
                            id="companyCnpj"
                            v-model.trim="formCompany.identity"
                            :state="!$v.formCompany.identity.$invalid"
                            aria-describedby="inputCompanyCnpjFeedback"></b-form-input>

                        <b-form-invalid-feedback id="inputCompanyCnpjFeedback">
                            <p v-if="!$v.formCompany.identity.required">
                                Preencha este campo.
                            </p> 
                        </b-form-invalid-feedback>
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
import { required, minLength, between, maxLength, email } from 'vuelidate/lib/validators'

const touchMap = new WeakMap()

export default {
    name:"home",
    data () {
        return {
            modalRegCompShow: false,
            modalRegPerShow: false,
            // Todas as variáveis ficam no objeto formCompany 
            // para a validação adequada das informações da
            // empresa, e apenas com tudo certo é possível 
            // fazer o envio
            formCompany: {
                name: '',
                email: '',
                identity: '',
                user_type: '',
                password: '',                
            },
            
            // Todas as variáveis ficam no objeto formPerson 
            // para a validação adequada das informações da 
            // pessoa, e apenas com tudo certo é possível 
            // fazer o envio
            formPerson: {},
            name: '',
            email: '',
            identity: '',
            user_type: '',
            password: '',
            error: null,
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
        },

        delayTouch($v) {
            $v.$reset()
            if (touchMap.has($v)) {
                clearTimeout(touchMap.get($v))
            }
            touchMap.set($v, setTimeout($v.$touch, 1000))
        }
    },
    computed: {
        isValid() {
            // deve garantir que o formulário é valido
            return true;  
        },
    },
    // Validações feitas com o auxílio do Vuelidate
    validations: {
        formCompany: {
            name: {                
                required,
                maxLength: maxLength(50)
            },
            email: {
                required,
                email,
                maxLength: maxLength(50),
                // Função de validação para verificar se o e-mail
                // já está cadastrado em alguma conta
                isUnique(value) {
                    if(value === '') return true;

                    return  API.post('/isEmailUnique',{
                                email: value
                            }).then(response => {
                                console.log(response);
                                return true;
                            }).catch(() => {
                                return false
                            });                    
                },
            },
            identity: {
                required,
            }
        },
        
        
        // identity: {

        // },
        // user_type: {
        
        // },
        // password: {

        // },
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

form :invalid {
    background: white;
}
</style>
