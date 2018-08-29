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
                <!-- Formulário de currículo, contém: área, curso, arquivo, instituto, ano de formação, id de usuário e habilidades-->
                <b-form id="curriculumForm" @submit="validateCurriculum">
                    <!-- Área -->
                    <b-form-group>
                        <b-form-text for="curriculumArea"> Área </b-form-text>                                          
                        <b-form-select id="curriculumArea" v-model="area">
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
                        <b-form-file v-model="file" :state="Boolean(file)" placeholder="Anexe um currículo..."></b-form-file>
                        <div class="mt-3"><b-form-text class="font-weight-bold">Arquivo selecionado: {{file && file.name}}</b-form-text></div>
                        <!-- <input type="file" class="form-control-file"
                            id="curriculumFile"
                            v-on:change="onFileSelected"
                            required>  -->
                    </b-form-group>

                    <!-- Instituição de ensino -->
                    <b-form-group>
                        <b-form-text for="curriculumInstitute"> Instituição de ensino </b-form-text>
                        <b-form-input type="text" 
                            id="curriculumInstitute"        
                            v-model="course"
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

                    <!-- Habilidades -->
                    <b-form-group>
                        <b-form-text for="habilitiesTags"> Principais habilidades </b-form-text>
                        <tags-input input-class="form-control"
                            element-id="habilitiesTags"
                            v-model="habilities"
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
            file: null,
            institute: '',
            graduateYear: '',
            habilities: []
        }
    },
    methods: {
        // Método para intermediar a validação do formulário
        validateCurriculum($event) {
            if(this.isValid) {
                alert("passou aqui");
                //this.addCurriculum;
            }
            // Previne o recarregamento da página (ou seja, que o evento de submit aconteça)
            $event.preventDefault();
        },
        // Método para adicionar um currículo
        addCurriculum() {
            // Requisição POST para adicionar um currículo
            API.post('/addCurriculum', {
                area: this.area,   
                course: this.course,
                file: this.file,
                institute: this.institute,
                graduateYear: this.graduateYear,
                habilities: this.habilities
            }).then(response => {
                // Armazena o token recebido do back-end, este que é usado
                // para recuperar as informações presentes no back-end
                this.$store.commit('setAuthToken', response.data.data.token);
                
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
        showModalCurriculum () {
            this.$refs.modalRegCurriculum.show()
        },
        hideModalCurriculum () {
            this.$refs.modalRegCurriculum.hide()
        },
    },
    computed: {
        isValid() {
            return this.email && this.password.length > 4;
        }
    }
};
</script>
