<template>
  <div id="app" data-app app-data="true">
    <v-app>
      <page-header />
        <main>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
    name: 'app',
    components: {
      PageHeader
    }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.danger-alert {
  color: red;
}
</style>
