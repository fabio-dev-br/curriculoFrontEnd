<template>
    <b-container>
        <!-- Seção contendo o botão de cadastro de interesses -->
        <section class="pt-2 pb-3">
            <b-container>
                <b-row>
                    <b-col>
                        <b-card>
                            <b-row>
                                <b-col sm="1">
                                    <icon name="search"></icon>                                    
                                </b-col>
                                <b-col>
                                    <b-form-input type="search" @keyup.enter="search"
                                    placeholder="Pesquise algo..."></b-form-input>
                                </b-col>
                            </b-row>
                        </b-card>                        
                    </b-col>
                    <b-col sm="4">
                        <div class="mt-3">                    
                            <b-col>
                                <!-- Botão para abrir o modal de cadastro de interesses -->
                                <b-button class="btn btn-lg btn-primary" @click="showModalInterests"> 
                                    Cadastro de interesses
                                </b-button>   
                            </b-col>                    
                        </div>
                    </b-col>
                </b-row>                                        
            </b-container>            
        </section>
        <!-- Seção de exibição dos interesses existentes -->
        <section class="mb-3">
            <div v-if="divInterests">
                <b-card-group deck>
                    <b-card header-tag="header">
                        <h2 slot="header">Meus interesses</h2>
                        <ul id="interestsList">
                            <li v-for="interest in displayInterests">
                                <!-- A manipulação dentro do link é para deixar a primeira
                                letra do interesse maiúscula -->
                                <b-link href="#">{{ interest[0].toUpperCase() + interest.slice(1) }}</b-link>
                            </li>
                        </ul>
                    </b-card>
                </b-card-group>
                
            </div>
                
        </section>


        <!-- Modal do cadastro de interesses -->
        <b-modal class="text-dark w-50 float-left"
            hide-footer
            centered
            title="Cadastro de Interesses"
            size="lg"
            ref="modalRegInterests">    
                    
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de interesses, contém: interesses -->
                <b-form id="interestsForm" @submit="validateInterests">

                    <!-- Habilidades / Foi colocado um limite de 3 habilidades -->
                    <b-form-group description="Digite os interesses" label-size="lg">
                        <b-form-text for="interestsTags"> Interesses </b-form-text>
                        <tags-input input-class="form-control"
                            element-id="interestsTags"
                            v-model="interests"
                            :limit = 3
                            placeholder="Digite um interesse"></tags-input> 
                    </b-form-group>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <b-btn variant="outline-danger" @click="hideModalInterests">Fechar</b-btn>
                        <b-btn variant="outline-success" type="submit">Enviar</b-btn>
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
    name: "portalEmpresa",
    data() {
        return {
            modalRegInterests: false,
            interests: [
                'smart grid'                
            ],
            error: null,
            divInterests: false,
            displayInterests: null
        }
    },
    methods: {
        // Método para intermediar a validação do formulário
        validateInterests($event) {
            if(this.isValid) {            
                this.addInterests();
            }

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },
        // Método para adicionar interesses
        addInterests() {
            // O token  do usuário é recuperado e adicionado ao header da 
            // requisição para enviá-lo ao back-end
            API.token = this.$store.getters.authToken;

            // Requisição POST para adicionar um currículo            
            API.post('/addInterests', {
                interests: this.interests
            }).then(response => {
                // Esse log de console é utilizado para utilizar o response declarado
                // e, assim, o warning, referente à não utilização, não ocorrer na compilação 
                console.log(response.data.code);
                
                // Recarrega a página
                this.$router.go();
            }).catch(error => {
                this.error = error.response.data.message;
            });
        },
        showModalInterests () {
            this.$refs.modalRegInterests.show()
        },
        hideModalInterests () {
            this.$refs.modalRegInterests.hide()
        },
    },
    computed: {
        isValid() {
            // Fazer a validação posteriormente
            return true;
        }
    },
    created: function () {
            // O token  do usuário é recuperado e adicionado ao header da 
            // requisição para enviá-lo ao back-end
            API.token = this.$store.getters.authToken;
            
            // Requisição POST para fazer o login
            API.get('/searchInt')
            .then(response => {
                this.displayInterests = response.data.data;
                this.divInterests = true;
            }).catch(error => {
                this.error = error.response.data.message;
            });
        }
};
</script>

<style>
.badge-light {
    color: #f8ffff;
    background-color: #4a5f5d;
}

.tags-input-remove:before, .tags-input-remove:after {
    content: '';
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    background: #eaee20;
    height: 2px;
    margin-top: -1px;
}
</style>
