<template>
    <b-container>
        <!-- Seção contendo o campo de pesquisa e o botão de cadastro de currículo -->
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
                    <b-col md="2">
                        <div class="mt-3">                    
                            <b-col>
                                <!-- Botão para abrir o modal de cadastro de currículo -->
                                <b-button class="btn btn-lg btn-primary" @click="showModalCurriculum"> 
                                    Cadastro de currículo
                                </b-button>    
                            </b-col>                    
                        </div>
                    </b-col>
                </b-row>                                        
            </b-container>            
        </section>
        <section>
                <b-container>
                    <h1 v-if="ifResults">
                        Resultados
                    </h1>
                </b-container>
        </section>
        

        <!-- Modal de cadastro de currículo -->
        <b-modal class="text-dark w-50 float-left"
            hide-footer
            centered
            title="Cadastro de Currículo"
            size="lg"
            ref="modalRegCurriculum">    
                    
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de currículo, contém: área, curso, arquivo, instituto, ano de formação, id de usuário e habilidades -->
                <b-form id="curriculumForm" @submit="validateCurriculum">
                    <!-- Área -->
                    <b-form-group>
                        <b-form-text for="curriculumArea"> Área </b-form-text>                                          
                        <b-form-select id="curriculumArea" v-model="area" required>
                            <template slot="first">
                                <option :value="null" disabled> Escolha a área maior de atuação... *</option>
                            </template>                            
                            <option value="exatas"> Exatas </option>
                            <option value="humanas"> Humanas </option>
                            <option value="biologicas"> Biológicas </option>
                        </b-form-select>
                    </b-form-group>

                    <!-- Curso -->
                    <b-form-group>
                        <b-form-text for="curriculumCourse"> Curso </b-form-text>
                        <b-form-input type="text" 
                            id="curriculumCourse"        
                            v-model="course"
                            placeholder="Digite o curso de formação... *" required></b-form-input>
                    </b-form-group>

                    <!-- Arquivo de currículo -->
                    <b-form-group>
                        <b-form-file v-model="file" id="file"
                            placeholder="Anexe um currículo..." required></b-form-file>
                        <div class="mt-3"><b-form-text class="font-weight-bold">Arquivo selecionado: {{file && file.name}}</b-form-text></div>
                    </b-form-group>

                    <!-- Instituição de ensino -->
                    <b-form-group>
                        <b-form-text for="curriculumInstitute"> Instituição de ensino </b-form-text>
                        <b-form-input type="text" 
                            id="curriculumInstitute"        
                            v-model="institute"
                            placeholder="Digite o instituto de formação... *" required></b-form-input>
                    </b-form-group>

                    <!-- Ano de formação -->
                    <b-form-group>
                        <b-form-text for="curriculumGradYear"> Ano de formação </b-form-text>
                        <b-form-input type="text" 
                            id="curriculumGradYear"        
                            v-model="graduateYear"
                            placeholder="yyyy *" required></b-form-input>
                    </b-form-group>

                    <!-- Habilidades / Foi colocado um limite de 3 habilidades -->
                    <b-form-group description="Digite no máximo 3 habilidades" label-size="lg">
                        <b-form-text for="habilitiesTags"> Principais habilidades </b-form-text>
                        <tags-input input-class="form-control"
                            element-id="habilitiesTags"
                            v-model="habilities"
                            :limit = 3
                            placeholder="Digite uma habilidade"></tags-input> 
                    </b-form-group>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <b-btn variant="outline-danger" @click="hideModalCurriculum">Fechar</b-btn>
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
    name: "portalPessoa",
    data() {
        return {
            // Variável para controlar a exibição do modal
            modalRegCurriculum: false,

            // Variável para a área de atuação (exatas, biológicas ou humanas)
            area: null,   

            // Variável para o curso 
            course: '',

            // Variável para o arquivo de currículo
            file: '',

            // Variável para o instituto de formação
            institute: '',

            // Variável para o ano de formação
            graduateYear: '',

            // Variável para a adição de habilidades
            habilities: [
                'smart grid'                
            ],

            // Variável que recebe o erro do back caso
            // haja algum erro na adição do currículo
            error: null,

            // Variável que controla a exibição da 
            // div de resultados da busca
            ifResults: false,
            
            // Variável que recebe os resultados 
            // da pesquisa
            results: null
        }
    },
    methods: {
        // Método para intermediar a validação do formulário
        validateCurriculum($event) {
            if(this.isValid) {            
                this.addCurriculum();
            }

            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },
        // Método para adicionar um currículo
        addCurriculum() {
            // O token  do usuário é recuperado e adicionado ao header da 
            // requisição para enviá-lo ao back-end
            API.token = this.$store.getters.authToken;

            // O objeto formData é instaciado apenas dentro do trecho de código ao
            // qual ele pertence, através da instrução let
            let formData = new FormData();

            formData.append('area', this.area);
            formData.append('course', this.course);
            formData.append('file', this.file);
            formData.append('institute', this.institute);
            formData.append('graduate_year', this.graduateYear);
            for (var i = 0; i < this.habilities.length; i++) {
                formData.append('habilities[]', this.habilities[i]);
            }
            
            // Requisição POST para adicionar as informações do currículo
            // e o arquivo de currículo
            API.postFile('/addCurriculum', formData).then(response => {
                // Esse log de console é utilizado para utilizar o response declarado
                // e, assim, o warning, referente à não utilização, não ocorrer na compilação 
                console.log(response.data.code);
                
                // Recarrega a página
                //this.$router.go();
            });
        },
        // Método que mostra o modal para adicionar currículos
        showModalCurriculum () {
            this.$refs.modalRegCurriculum.show()
        },
        // Método para esconder o modal de adicionar currículos
        hideModalCurriculum () {
            this.$refs.modalRegCurriculum.hide()
        }
    },
    computed: {
        isValid() {
            // Fazer a validação posteriormente
            return true;
        }
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
