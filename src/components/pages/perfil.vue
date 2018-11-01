

<template>
<div>
        <b-table striped hover :items="items" :fields="fields"></b-table>
    <br>
    <b-button @click="showModalalterar">Alterar</b-button>
    <b-modal hide-footer
            :centered="true"
            title="Cadastro de Interesses"
            size="lg"
            ref="modalRegalterar">    
                    
            <!-- Modal body -->
            <div class="modal-body">
                <!-- Formulário de interesses, contém: interesses -->
                <b-form id="interestsForm" @submit="redirectInterests">

                    <!-- Habilidades / Não foi colocado um limite -->
                    <b-form-group 
                        label="Interesses *"
                        label-for="interestsTags">

                        <tags-input 
                            input-class="form-control-tags-input"
                            element-id="interestsTags"
                            v-model="formInterests.interests"
                            :validate="validateInterests"
                            placeholder="Digite um interesse"></tags-input> 
                    </b-form-group>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <b-btn variant="outline-danger" @click="hideModalalterar">Fechar</b-btn>
                        <b-btn :disabled="$v.formInterests.$invalid" variant="outline-success" type="submit">Enviar</b-btn>
                    </div>  
                </b-form>
            </div>
        </b-modal>        
  </div>
  

</template>
  <script>
 export default {
  data () {
    return {
        modalRegalterar: false,
        slide: 0,
        sliding: null,
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [ 'Nome', 'Email', 'Tipo' ],
      items: [
        { isActive: true, Tipo: this.$store.getters.userType, Nome:this.$store.getters.name, Email: '' }
      ]
    }
  
},
    methods: {
        showModalalterar () {
            this.$refs.modalRegalterar.show()
        },
        hideModalalterar () {
            this.$refs.modalRegalterar.hide()
        },
    }
  }
  
  </script>
  <!-- carousel-1.vue -->