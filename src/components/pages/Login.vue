<template>
    <section class="pt-1 pb-5">
        <!-- Divisão do login -->
        <div id="login">
            <h3 class="text-center font-weight-bold pt-5 py-3">Login</h3>
            <p class="text-center text-danger" v-if="error">{{ error }}</p>
            <div class="container" id="login-container">
                <div class="row justify-content-center align-items-center" id="login-row">
                    <div class="card">
                        <div class="card-body">
                            <b-form @submit="validate">
                                <!-- E-mail -->
                                <b-form-group>                                    
                                    <b-form-text class="mb-2" for="userEmail"><icon name="envelope"></icon> Seu e-mail</b-form-text>
                                    <b-form-input type="email"
                                        id="userEmail"  
                                        v-model="email"
                                        placeholder="E-mail" required></b-form-input>                         
                                </b-form-group>
                                
                                <!-- Senha -->
                                <b-form-group>
                                    <b-form-text class="mb-2" for="userPassword"><icon name="lock"></icon> Sua senha</b-form-text>
                                    <b-form-input type="password"
                                        id="userPassword" 
                                        v-model="password"
                                        placeholder="Senha" required></b-form-input> 
                                </b-form-group>
    
                                <!-- Lembrar-me (Lembrete: o input checkbox deve vir antes do label, caso contrário, não funciona)-->
                                <div class="align-items-start d-flex flex-column">
                                    <b-form-checkbox id="loginFormRemember" v-model="remember"
                                        value="remember"
                                        unchecked-value="not_remember">
                                        Lembrar-me
                                    </b-form-checkbox>
                                </div>                        
    
                                <!-- Esqueceu a senha -->
                                <div class="d-flex flex-column align-items-center pt-4">                                                                                            
                                    <b-link @click="showModalForgotPass">
                                        Esqueceu a senha?
                                    </b-link>
                                </div>                                                       
    
                                <!-- Botão de login  -->
                                <div class="d-flex flex-column align-items-center mt-4 my-2">
                                    <b-btn class="btn btn-outline-dark my-2" type="submit">
                                        Fazer login
                                    </b-btn>                            
                                </div>
                            </b-form>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para a função esqueci a senha -->
        <b-modal hide-footer
            centered          
            size="lg"
            ref="modalForgotPass">    
            <h5 slot="modal-title">
                <Strong> Recuperação de senha </Strong>
            </h5>
            <div class="modal-body">
                <h6>Informe seu e-mail e enviaremos instruções para você redefinir sua senha.</h6>
                <hr class="separator">
                <b-form @submit="forgotPass">
                    <!-- E-mail -->
                    <b-form-group>                                    
                        <b-form-text class="mb-2" for="userEmail">E-mail</b-form-text>
                        <b-form-input type="email"
                            id="emailForgot"  
                            v-model="emailForgot" required></b-form-input>                         
                    </b-form-group>
                </b-form>
            </div>
            <div class="modal-footer mt-2">
                <b-row align-h="end">
                    <b-btn variant="dark mr-1" @click="hideModalForgotPass">Cancelar</b-btn>
                    <b-btn variant="success mr-1" @click="forgotPass">Enviar</b-btn>
                </b-row>  
            </div>
            
        </b-modal>
    </section>
</template>

<script>

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';

export default {
    name: "login",
    data() {
        return {
            // Variável para o e-mail do login
            email: '',

            // Variável para a senha do login
            password: '',

            // Variável para permitir a função de lembrar-me
            remember: false,

            // Variável que recebe o erro do back caso
            // haja algum erro na adição do currículo
            error: null,

            // Variável para controlar a exibição do modal de confirmação de remoção do currículo
            modalForgotPass: false,

            // Variável e-mail para a recuperação de senha
            emailForgot: '',
        }
    },
    methods: {
        // Método para intermediar a validação do formulário
        validate($event) {
            if(this.isValid) {
                this.login();
            }
            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },

        // Método para fazer o login
        login() {
            // Requisição POST para fazer o login
            API.post('/login2', {
                email: this.email,
                password: this.password
            }).then(response => {
                // Armazena o token recebido do back-end, este que é usado
                // para recuperar as informações presentes no back-end
                this.$store.commit('setAuthToken', response.data.data.token);

                console.log(this.$store.getters.authToken);

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
        },

        forgotPass () {
            // Requisição POST para recuperar a senha
            API.post('/forgotMyPass', {
                email: this.email
            }).then(response => {
                console.log("inseriu");
            }).catch(error => {
                this.error = error.response.data.message;
            });
        },

        // Método para exibir o modal de esqueci a senha
        showModalForgotPass () {
            this.$refs.modalForgotPass.show()
        },

        // Método para esconder o modal de esqueci a senha
        hideModalForgotPass () {
            this.$refs.modalForgotPass.hide()
        },
    },
    computed: {
        isValid() {
            return this.email && this.password.length > 4;
        }
    }
};
</script>