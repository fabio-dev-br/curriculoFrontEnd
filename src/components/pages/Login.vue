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
                                    <b-form-text for="userEmail"><icon name="envelope"></icon> Seu e-mail</b-form-text>
                                    <b-form-input type="email"
                                        id="userEmail"  
                                        v-model="email"
                                        placeholder="E-mail" required></b-form-input>                         
                                </b-form-group>
                                
                                <!-- Senha -->
                                <b-form-group>
                                    <b-form-text for="userPassword"><icon name="lock"></icon> Sua senha</b-form-text>
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
                                    <a href="">Esqueceu a senha?</a>                                
                                </div>                                                            
    
                                <!-- Botão de login - ao clicar chama a função no loginCurriculo.js para fazer o login -->
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
    </section>
</template>
<script>

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';

export default {
    name: "login",
    data() {
        return {
            email: '',
            password: '',
            remember: false,
            error: null
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
        }
    },
    computed: {
        isValid() {
            return this.email && this.password.length > 4;
        }
    }
};
</script>