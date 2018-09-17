<template>
    <b-container>
        <!-- Seção para a alteração de senha -->
        <section class="pt-2 pb-3">            
            <b-card>
                <!-- Formulário para alteração de senha -->
                <b-form id="changePasswordForm" @submit="validatePassword">
                    <b-container slot="header">
                        <h4 class="mb-3" slot="header"> Redefinição de senha </h4>
                        
                        <!-- Senha -->
                        <b-form-group 
                            label="Senha"
                            label-for="userPassword"
                            :invalid-feedback="invalidPassword"
                            :state="statePassword">
                            <b-form-input type="password"
                                id="userPassword"
                                v-model="password" required></b-form-input> 
                        </b-form-group>

                        <!-- Confirmação de senha -->
                        <b-form-group 
                            label="Confirmação de senha"
                            label-for="confirmPassword"
                            :invalid-feedback="invalidConfirmPassword"
                            :state="stateConfirmPassword">
                            <b-form-input type="password"
                                id="confirmPassword"
                                v-model="confirmPassword" required></b-form-input> 
                        </b-form-group>                                                
                    </b-container>   
                    <b-row class="mr-3" align-h="end">
                        <b-btn variant="success" type="submit">Enviar</b-btn>
                    </b-row>
                    
                </b-form>                
            </b-card>
        </section>

        <!-- Modal expirou tempo do hash -->
        <b-modal hide-footer
            hide-header-close
            centered
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"            
            size="md"
            ref="modalExpiration">    
            <h3 slot="modal-title"><strong>Ocorreu um erro...</strong></h3>    
            <!-- Modal body -->
            <b-row>
                <b-col>
                    O tempo para a alteração da senha expirou, 
                    faça uma outra requisição para alterar a senha. 
                </b-col>                
            </b-row>                            
            <b-row class="mt-2" align-h="center">
                <b-button variant="primary" @click="redirectLogin">
                    Voltar
                </b-button>
            </b-row>
        </b-modal>          

        <!-- Modal de sucesso -->
        <b-modal hide-footer
            centered
            title="Sucesso"
            size="lg"
            ref="modalSuccess">    
                    
            <!-- Modal body -->
            <div class="modal-body">
                123
            </div>
        </b-modal>               
        
        <!-- Modal de erro -->
        <b-modal hide-footer
            centered
            title="Algum erro ocorreu"
            size="lg"
            ref="modalError">    
                    
            <!-- Modal body -->
            <div class="modal-body">
                321
            </div>
        </b-modal> 


    </b-container>
</template>

<script>

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';
import axios from 'axios';

export default {
    name: "changeMyPass",
    data() {
        return {
            // Variável para controlar a exibição do modal de sucesso na troca da senha
            modalSuccess: false,

            // Variável para controlar a exibição do modal se algum erro aconteceu na troca da senha
            modalError: false,

            // Variável para controlar a exibição do modal informando
            // se o hash ainda é válido
            modalExpiration: false,

            // Variável senha
            password: '',

            // Variável confirmação de senha
            confirmPassword: '',

            // Variável que recebe o erro do back caso
            // haja algum erro na adição de interesses
            errorChangePass: null,
        }
    },
    methods: {
        // Método para intermediar a validação do formulário
        validatePassword($event) {
            if(this.isValid) {            
                this.changePassword();
            }

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para adicionar interesses
        changePassword() {
            // Recupera os parâmetros provenientes da URL
            
            // Requisição POST para adicionar interesses           
            // API.post('/addInterests', {
            //     interests: this.interests
            // }).then(response => {
            //     // Esse log de console é utilizado para utilizar o response declarado
            //     // e, assim, o warning, referente à não utilização, não ocorrer na compilação 
            //     console.log(response.data.code);
                
            //     // Recarrega a página
            //     this.$router.go();
            // }).catch(error => {
            //     this.errorAddInterest = error.response.data.message;
            // });
        },

        // Redirecionar para a página de login
        redirectLogin() {
            this.$router.push('/login');
        },

        // Método que mostra o modal de sucesso na troca da senha
        showModalSuccess () {
            this.$refs.modalSuccess.show()
        },

        // Método para esconder o modal de sucesso na troca da senha
        hideModalSuccess () {
            this.$refs.modalSuccess.hide()
        },

        // Método que mostra o modal de sucesso na troca da senha
        showModalError () {
            this.$refs.modalError.show()
        },

        // Método para esconder o modal de sucesso na troca da senha
        hideModalError () {
            this.$refs.modalError.hide()
        },

        // Método que mostra o modal informando se o hash ainda é válido
        showModalExpiration () {
            this.$refs.modalExpiration.show()
        },

        // Método para esconder o modal informando se o hash ainda é válido
        hideModalExpiration () {
            this.$refs.modalExpiration.hide()
        },

        // Verifica se a senha é válida
        validPassword: function (password) {
            var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
            return re.test(password);
        },

        // Verifica se a senha de confirmação é a mesma
        validConfirmPassword: function (confirmPassword, password) {
            if(confirmPassword == password) {
                return true;
            } else {
                return false;
            }
        },
    },
    
    computed: {
        isValid() {
            // Fazer a validação posteriormente
            return true;
        },

        // Função para determinar o estado do input da senha
        statePassword() {
            return this.validPassword(this.password) ? true : false;
        },

        // Função para determinar o estado do input da confirmação
        // da senha
        stateConfirmPassword() {
            return this.validConfirmPassword(this.confirmPassword, this.password) ? true : false;
        },

        // Função responsável por mostrar a mensagem
        // se o input de senha não é válido
        invalidPassword() {
            // A senha deve possuir tamanho de no mínimo 5
            if (this.password.length < 5) {
                return 'O tamanho mínimo da senha é 5'
            } else if(this.validPassword()) {
                return '';                
            } else {
                return 'A senha deve possuir no mínimo uma letra maiúscula, uma letra minúscula e um número'
            }        
        },

        // Função responsável por mostrar a mensagem
        // se o input de confirmação de senha não é válido
        invalidConfirmPassword() {
            if (this.validConfirmPassword(this.confirmPassword, this.password)) {
                return '';
            } else {
                return "Digite a mesma senha";
            }
        },
    },
    
    // Função para verificar se o hash vindo não expirou
    created: function () {                
        let uri = this.$route.query.key;

        // Requisição GET para verificar o hash
        axios.get('http://localhost:3000/verifyHashChangePass', {
            params: {
                key: uri
            }                
        },
        {'Content-Type': 'application/x-www-form-urlencoded'},)
        .then(response => {
            console.log(response.data.code);                        
        }).catch(error => {
            this.showModalExpiration();
            this.errorChangePass = error.response.data.message;
        });     
    },
};
</script>

<style>

.tag-format {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 500;
    line-height: 0.5;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    padding: .4rem .25rem;
    background: #fff;
    border: 1px solid transparent;
    background: #a3abb3;
    border-radius: .25rem;
    border-color: #dbdbdb;
}  

.header-gradient{
    border-radius: 4px;
    background: linear-gradient(to right, #a3abb3 20%, #ffffff  80%);
}

.tags-input span {
    color: #ffffff;
    background-color: #ffc107;
}

.tags-input-remove:before, .tags-input-remove:after {
    content: '';
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    background: #000000;
    height: 2px;
    margin-top: -1px;
}
</style>
