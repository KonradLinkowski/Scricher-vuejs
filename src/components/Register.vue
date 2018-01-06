<template>
  <div class="card">
    <h2>Don't have an account? Sign in!</h2>
    <form class="form-user" @submit.prevent="register()">
      <label for="email">Email</label>
      <input v-model="email" type="text" id="email" name="email" placeholder="user@exmaple.com" required>

      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" name="password" placeholder="password" required>

      <label for="fname">First Name</label>
      <input v-model="fname" type="text" id="fname" name="fname" placeholder="Firstname">

      <label for="text">Last Name</label>
      <input v-model="lname" type="text" id="lname" name="lname" placeholder="Lastname">
    
      <input type="submit" value="Register">
    </form>
  </div>
</template>
<script>
import { register } from '../util/auth.js'
export default {
  data() {
    return {
      email: null,
      password: null,
      fname: null,
      lname: null
    }
  },
  methods: {
    register() {
      register(this.email, this.password, this.fname, this.lname);
    }
  }
}
</script>
