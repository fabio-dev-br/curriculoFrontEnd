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
                            label-for="password"                        
                            description="A senha deve possuir no mínimo">
                            <b-form-input type="password"
                                id="userPassword"
                                v-model="password" required></b-form-input> 
                        </b-form-group>

                        <!-- Confirmação de senha -->
                        <b-form-group 
                            label="Confirmação de senha"
                            label-for="confirmPassword"
                            :invalid-feedback="invalidConfirmPassword"
                            :state="state">
                            <b-form-input type="password"
                                id="confirmPassword"
                                v-model="confirmPassword" required></b-form-input> 
                        </b-form-group>
                        <b-btn variant="success" type="submit">Enviar</b-btn>
                        
                    </b-container>   
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
    },
    
    computed: {
        isValid() {
            // Fazer a validação posteriormente
            return true;
        },

        // Função para validar a confirmação de senha
        invalidConfirmPassword() {
            return '1';
        },

        // Função para determinar o estado do input da senha
        state() {
            
        }
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
