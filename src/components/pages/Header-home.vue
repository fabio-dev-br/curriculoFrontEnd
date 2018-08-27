<!-- Componente de header da página home -->
<template>
    <header>
        <b-container class="p-5">
            <nav class="navbar navbar-expand-sm navbar navbar-dark bg-dark position-fixed fixed-top">
                    <a class="navbar-brand" href="/">CurriculoIncit</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Início</a>
                            </li>
                        </ul>
                    </div>            
        
                    <!-- <template v-if="seen" id="loginButton"> -->
                    <div id="loginButton" >
                        <b-link href='/login' type="button" 
                            class="btn btn-outline-dark my-2 my-sm-0"                                            
                            v-on:click="avisa()">
                            Login
                        </b-link>
                    </div>
                    <!-- </template> -->
                </nav>
        </b-container>
    </header>
</template>

<script>

</script>