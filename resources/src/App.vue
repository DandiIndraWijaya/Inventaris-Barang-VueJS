<template>
  <div id="app">
    <!-- navbar -->
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <a class="navbar-brand page-scroll" href="#home">Me</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link page-scroll"  href="#about">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link page-scroll"  href="#portofolio">Portofolio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link page-scroll"  href="#contact">Contact</a>
                </li>
            </ul>
        </div>
    </nav>
    <!-- akhir navbar -->

    <AdminMainPage />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import AdminMainPage from './components/AdminMainPage.vue'
import 'bootstrap/dist/css/bootstrap.css'


export default {
  name: 'App',
  components: {
    AdminMainPage
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
