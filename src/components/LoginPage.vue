<template>
  <article class="">
    <h1>Scricher</h1>
    <div class="">
      <div class="">
        <!--img src="https://vectr.com/konowy/i3Q2IXrnWA.png?width=1280&height=1280&select=i3Q2IXrnWApage0"-->
      </div>
      <div class="wrapper">
        <Login />
        <Register />
      </div>
    </div>
  </article>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'

export default {
    name: 'MainPage',
    data() {
        return {

        }
    },
    components: {
        Login,
        Register
    }
}
</script>
<style scoped>
</style>
