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
                <li class="nav-item" v-if="!loggedIn">
                  <router-link :to="{ path: '/login'}">Login</router-link>
                </li>
                 <li class="nav-item" v-if="loggedIn">
                  <router-link :to="{ path: '/loggout'}">Logout</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <!-- akhir navbar -->

    <router-view></router-view>
  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


export default {
  name: 'App',
  components: {
  },
  data: function(){
    return {
      riwayat: true,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
  
}


</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#riwayat{
  background-color: white;
  color: skyblue;
}

#cari:target{
  background-color: white;
  color: skyblue;
}

router-link{
  padding: 0;
}

.logo{
  border-bottom: solid white 1px;
  padding: 5px;
}

.sidenav {
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: skyblue;
  overflow-x: hidden;
  padding-top: 20px;
  margin-top: 50px;
}


.menu-button font{
  margin-left: 5px;
}

.menu .menu-button{
  color: white;
  margin: 0;
  display: block;
  padding-left: 15px;
  padding-top: 7px;
  padding-bottom: 4px;
  text-decoration: none;
}

.menu-button:hover{
  background-color: white;
  color: skyblue;
  cursor: pointer;
}

@media screen and (max-width: 950px) {
  .sidenav{
    width: 50px;
  }
}


</style>
