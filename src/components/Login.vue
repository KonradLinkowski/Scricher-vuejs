<template>
  <div class="card">
    <h2>Already with us? Log in!</h2>
    <form class="form-user" @submit.prevent="login()">
      <label for="email">Email</label>
      <input type="text" id="login_email" name="email" placeholder="user@exmaple.com">

      <label for="password">Password</label>
      <input type="password" id="login_password" name="password" placeholder="password">
    
      <input type="submit" value="Log in">
    </form>
  </div>
</template>
<script>
import { login, test } from '../util/auth'
export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    login() {
      test();
      login(email, password);
    }
  }
}
</script>
