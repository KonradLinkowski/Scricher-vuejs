<template>
  <div class="card">
    <h2>Sign in!</h2>
    <form class="form-user" @submit.prevent="register()">
      <label class="label" for="email">Email</label>
      <input class="input" v-model="email" type="text" id="email" name="email" placeholder="user@exmaple.com" required pattern=".+@.+[.].+">

      <label class="label" for="password">Password</label>
      <input class="input" v-model="password" type="password" id="password" name="password" placeholder="password" required>

      <label class="label" for="fname">First Name</label>
      <input class="input" v-model="fname" type="text" id="fname" name="fname" placeholder="Firstname">

      <label class="label" for="text">Last Name</label>
      <input class="input" v-model="lname" type="text" id="lname" name="lname" placeholder="Lastname">
    
      <input class="submit-btn" type="submit" value="Register">
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
      register(this.email, this.password, this.fname, this.lname)
    }
  }
}
</script>
<style scoped>
.form-user {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.label {
  color: var(--red-color);
}

.input {
  padding: 10px;
  margin: 5px 0;
  color: var(--yellow-color);
  height: 2.3rem;
  background-color: var(--background-color);
  border: 1px solid var(--green-color);
}

.input::placeholder {
  color: var(--green-color);
}

.submit-btn {
  color: var(--yellow-color);
  background: var(--background-color);
  border: 1px solid var(--yellow-color);
  padding: 5px;
}

.submit-btn:hover {
  color: var(--background-color);
  background: var(--yellow-color);
  cursor: pointer;
}
</style>
