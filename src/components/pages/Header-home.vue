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
                <b-navbar-nav>
                    <b-nav-item @click="redirectsobre" >Sobre</b-nav-item>
                </b-navbar-nav>
            </b-collapse>   
            
            
            


            <b-navbar-nav class="ml-auto">
                <div id="loginButton" >
                    <b-btn  variant="light" 
                        @click="redirectLogin"
                        v-if="!isLoggedIn"
                        >
                        Login
                    </b-btn>
                    <div v-else>
                        <b-nav-item-dropdown right>
                            <!-- Using button-content slot -->
                            <template slot="button-content">
                              <em>{{firstLetterUp ($store.getters.name) }}</em>
                            </template>
                            <b-dropdown-item href="#">Perfil</b-dropdown-item>
                            <b-dropdown-item @click="logout">Sair</b-dropdown-item>
                          </b-nav-item-dropdown>
                    </div>
                
                </div>
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
            // user_type = this.$store.getters.user_type;
            if(this.$store.getters.userType == 0) {
                this.$router.push('/portal-empresa');
            } else {
                this.$router.push('/portal-pessoa');
            }
            
        },
        redirectsobre () {
            
            
                this.$router.push('/sobre');
           
            
        },
        logout() {
            this.$store.commit('setAuthToken', null);
            this.$store.commit('setName', null);
            this.$store.commit('setuserType', null);
            
            this.$router.replace('/');

            // @todo: limpar tambem o nome da pessoa ou empresa
        },
        firstLetterUp (word) {
            return word[0].toUpperCase() + word.slice(1);
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.authToken;
        }
    }
};

</script>
