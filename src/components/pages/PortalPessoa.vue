<template>
    <b-container>
        <!-- Seção contendo o botão de cadastro de currículo -->
        <section class="pt-2 pb-3">
            <div class="container">
                <div class="row text-left mt-5">
                    <b-col>
                        <!-- Botão para abrir o modal de cadastro de currículo -->
                        <b-button class="btn btn-lg btn-primary" @click="showModalCurriculum"> 
                            Cadastro de currículo
                        </b-button>    
                    </b-col>
                </div>
            </div>
        </section>

        <!-- Modal do cadastro de empresas -->
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
            modalRegCurriculum: false,
            area: null,   
            course: '',
            file: '',
            institute: '',
            graduateYear: '',
            habilities: [
                'smart grid'                
            ],
            error: null
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
                // e o warning não ocorrer na compilação 
                console.log(response.data.code);
                
                // Recarrega a página
                //this.$router.go();
            });
        },
        showModalCurriculum () {
            this.$refs.modalRegCurriculum.show()
        },
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

<style scoped>
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
