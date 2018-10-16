<!-- Componente de header da página home -->
<template>
    <header>
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="/">CurriculoIncit</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item @click="redirecthome">Início</b-nav-item>
                </b-navbar-nav>
            </b-collapse>                                

            <b-navbar-nav class="ml-auto">
                <div id="loginButton" >
                    <b-btn  v-if="loggedIn" variant="light" @click="redirectLogin">Login</b-btn>  
                   

                    
                    <b-btn  v-if="loggedIn"><router-link :to="{ name: 'logout' }">Logout</router-link></b-btn>                   
                </div>
                <b-nav-item >BEM VINDO : </b-nav-item>
               
            </b-navbar-nav>
            
        </b-navbar>
    </header>
</template>

<script>
export default {
    name: "headerHome",
    methods: {
        redirectLogin () {
            this.$router.push('/login');
        },
        redirecthome () {
            if(user_type == 0) {
                this.$router.push('/portal-empresa');
            } else (user_type == 1) {
                this.$router.push('/portal-pessoa');
            }
        }
    },
    computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }  
};

</script>
