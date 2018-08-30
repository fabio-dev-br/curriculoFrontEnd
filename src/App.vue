<template>
  <div id="app">
    
    <!-- Header -->
    <headerHome/>          
    
    <!-- Main -->
    <main>
      <router-view></router-view>
    </main>
    
    <!-- Footer -->
    <footerHome/>

  </div>
</template>

<script>

// Import das páginas da plataforma
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import HeaderHome from './components/pages/Header-home'
import FooterHome from './components/pages/Footer-home'

export default {
  name: 'app',
  components: {
    Login,
    Home,
    HeaderHome,
    FooterHome
  }
}
</script>

<style lang="scss">
  @import './assets/styles/variables';
  @import './assets/styles/bootstrap';
  @import "./../node_modules/@voerro/vue-tagsinput/dist/style.css";
</style>



