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

// Import da página home
import FooterHome from './components/pages/Footer-home'
import Home from './components/pages/Home'
import HeaderHome from './components/pages/Header-home'

export default {
  name: 'app',
  components: {
    FooterHome,
    Home,
    HeaderHome
  }
}
</script>

<style lang="scss">
  @import './assets/styles/variables';
  @import './assets/styles/bootstrap';
  @import "./../node_modules/@voerro/vue-tagsinput/dist/style.css";
</style>



