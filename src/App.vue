<template>
  <div id="app">
    <headerHome/>          
    
    <main>
      <home/>
    </main>
    
    <footerHome/>

  </div>
</template>

<script>

// Import dos componentes utilizados na página home
import Home from './components/pages/Home'
import HeaderHome from './components/pages/Header-home'
import FooterHome from './components/pages/Footer-home'

export default {
  name: 'app',
  components: {
    Home,
    HeaderHome,
    FooterHome
  }
}
</script>

<style lang="scss">
@import './assets/styles/variables';
@import './assets/styles/bootstrap';
</style>



