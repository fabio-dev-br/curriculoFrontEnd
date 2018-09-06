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
                </b-row>                                        
            </b-container>            
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

        <!-- Seção de exibição dos interesses existentes -->
        <section class="mb-3">
            <div v-if="divInterests">
                <b-card-group deck>
                    <b-card header-tag="header">
                        <b-row slot="header">
                            <b-col>
                                <h2 slot="header">Meus interesses</h2>
                            </b-col>
                            <b-col sm="2" v-if="!alterToRemoveInterests">
                                <b-row>
                                    <b-col class="mt-2">
                                        <!-- Botão para abrir o modal de cadastro de interesses -->
                                        <b-button class="btn btn-sm bg-warning border-warning" @click="showModalInterests"> 
                                            <icon name="plus"></icon>
                                        </b-button>           
                                    </b-col>
                                    <b-col class="mt-2">
                                        <!-- Botão para preparar para a remoção de interesses -->
                                        <b-button class="btn btn-sm bg-warning border-warning" @click="prepareRemove"> 
                                            <icon name="minus"></icon>
                                        </b-button>
                                    </b-col>                                    
                                </b-row>                                
                            </b-col>
                        </b-row>                                                
                        <ul id="interestsList">
                            <!-- Template que é mostrado inicialmente no carregamento da página
                            e redireciona para uma pesquisa dos currículos relacionados ao interesse 
                            em questão                             -->
                            <template v-if="showInterests">
                                <li v-for="interest in displayInterests" :key="interest.id">
                                    <!-- A manipulação dentro do link é para deixar a primeira
                                    letra do interesse maiúscula -->
                                    <b-link @click.prevent="search(interest.value)">
                                        {{ interest.text[0].toUpperCase() + interest.text.slice(1) }}
                                    </b-link>
                                </li>                                
                            </template>

                            <!-- Template que prepara a interface para a remoção de interesses, é acionado pelo botão com ícone minus -->
                            <template v-else>
                                <b-form-group >
                                    <div><strong>Selecione os interesses que deseja deletar: </strong></div>                                    
                                    
                                    <!-- Checkbox-group pega o vetor já preparado (text e value), quando os interesses são recuperados
                                    do back-end, e mostra -->
                                    <b-form-checkbox-group id="interestsSelected" name="interests"
                                        v-model="selected" 
                                        :options="displayInterests" stacked>
                                    </b-form-checkbox-group>                                    
                                </b-form-group>                                
                            </template>                            
                        </ul>
                        <div slot="footer" v-if="alterToRemoveInterests">
                            <b-row align-h="end" class="mr-2">
                                <!-- Botão para cancelar a remoção dos interesses -->
                                <b-button class="btn btn-sm btn-danger text-light" @click="prepareRemove"> 
                                    Cancelar
                                </b-button>

                                <!-- Pequena distância entre os dois botões -->
                                <div class="mr-1"></div>

                                <!-- Botão para confirmar a remoção dos interesses -->
                                <b-button class="btn btn-sm btn-warning text-light" @click="removeInterests"> 
                                    Confirmar
                                </b-button>        
                            </b-row>                            
                        </div>
                    </b-card>
                </b-card-group>                
            </div>                
        </section>

        <!-- Seção de exibição do resultado da busca -->
        <section class="mb-3">
            <div v-if="divSearch">
                <b-card-group deck>
                    <b-card header-tag="header">
                        <b-row slot="header">
                            <b-col>
                                <h2 slot="header">Resultados - {{ headerSearch }} </h2>
                            </b-col>
                            <b-row align-h="end" class="mr-2">
                                <!-- Botão para fechar a seção de busca -->
                                <b-button class="btn btn-sm btn-danger text-light" @click="hideSearchSection"> 
                                    <icon name="window-close"></icon>
                                </b-button>       
                            </b-row> 
                        </b-row>                                                
                        <ul id="searchList">                            
                            <template v-if="showCurricula">
                                <li v-for="curriculum in curricula" :key="curriculum.id">
                                    

                                </li>                                
                            </template>

                            <!-- Template para exibir que não existem resultados -->
                            <template v-else>                                
                                <div><strong>Não existem currículos com a habilidade desejada</strong></div>                                                                                                        
                            </template>                            
                        </ul>
                        <div slot="footer" v-if="alterToRemoveInterests">
                                                       
                        </div>
                    </b-card>
                </b-card-group>                
            </div>                
        </section>
    </b-container>
</template>

<script>

// Imports necessários para fazer a requisição ao servidor
import API from '../../services/ApiService';

export default {
    name: "portalEmpresa",
    data() {
        return {
            // Variável para controlar a exibição do modal
            modalRegInterests: false,

            // Variável para a adição de interesses
            interests: [
                'smart grid'                
            ],

            // Variável que recebe o erro do back caso
            // haja algum erro na adição de interesses
            errorAddInterest: null,

            // Variável para controlar a exibição da div de 
            // interesses
            divInterests: false,

            // Variável que recebe os interesses existentes 
            // da empresa, para visualização
            displayInterests: null,

            // Variável para controlar a exibição do botão de 
            // remover existente no footer
            alterToRemoveInterests: false,

            // Variável para alternar a exibição da página entre
            // os interesses existentes e a interface de remoção deles
            showInterests: true,

            // Variável que recebe o erro do back caso
            // haja algum erro na remoção de interesses
            errorRemoveInterest: null,

            // Variável contendo os interesses selecionados
            selected: [],

            // Váriável para exibir a div de resultados da busca
            divSearch: false,

            // Variável para exibir os currículos encontrados
            showCurricula: false,

            // Cabeçalho dos resultados
            headerSearch: null,

            // Currículos encontrados
            curricula: null,

            // Variável que recebe o erro do back caso
            // haja algum erro na busca de interesses
            errorSearchInterest: null,
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

            // Requisição POST para adicionar interesses           
            API.post('/addInterests', {
                interests: this.interests
            }).then(response => {
                // Esse log de console é utilizado para utilizar o response declarado
                // e, assim, o warning, referente à não utilização, não ocorrer na compilação 
                console.log(response.data.code);
                
                // Recarrega a página
                this.$router.go();
            }).catch(error => {
                this.errorAddInterest = error.response.data.message;
            });
        },

        // Método que mostra o modal para adicionar interesses
        showModalInterests () {
            this.$refs.modalRegInterests.show()
        },

        // Método que esconde o modal para adicionar interesses
        hideModalInterests () {
            this.$refs.modalRegInterests.hide()
        },

        // Método que prepara a página para a remoção de interesses
        prepareRemove () {
            this.showInterests = !this.showInterests;
            this.alterToRemoveInterests = !this.alterToRemoveInterests;            
        },

        // Método que remove os interesses selecionados
        removeInterests () {
            // Requisição POST para adicionar um currículo            
            API.post('/deleteInterests', {
                interests: this.selected
            }).then(response => {
                // Esse log de console é utilizado para utilizar o response declarado
                // e, assim, o warning, referente à não utilização, não ocorrer na compilação 
                console.log(response.data.code);
                
                // Recarrega a página
                this.$router.go();
            }).catch(error => {
                this.errorRemoveInterest = error.response.data.message;
            });
        },

        // Método que busca os currículos relacionados com 
        // o interesse selecionado através do link
        search (value) {
            // Requisição GET para buscar currículos relacionados ao interesse dado
            API.get('/searchCurByInt', {
                interests: value
            }).then(response => {
                // Esse log de console é utilizado para utilizar o response declarado
                // e, assim, o warning, referente à não utilização, não ocorrer na compilação 
                console.log(response.data.code);
                // Variável currícula recebe os resultados da pesquisa no back-end
                this.curricula = response.data.data.curricula;                
            }).catch(error => {
                this.errorSearchInterest = error.response.data.message;
            });
            this.divSearch = !this.divSearch;
        },

        // Método para esconder a seção de resultados da busca
        hideSearchSection () {
            this.divSearch = !this.divSearch;
        }
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
            // auxInterests é um vetor que auxilia na organização dos dados
            // , provenientes do back-end, de maneira que na parte de remoção 
            // o check-box-group é montado automaticamente (text e value)
            var auxInterests = [];            
            response.data.data.forEach(element => {                
                auxInterests = auxInterests.concat(
                    {text: element, value: element}
                );
                this.displayInterests = auxInterests;
            });            
            this.divInterests = true;
        }).catch(error => {
            this.error = error.response.data.message;
        });
    }
};
</script>

<style>
.badge-light {
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
