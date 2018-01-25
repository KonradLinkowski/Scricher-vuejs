<template>
  <div class="navbar">
    <router-link :to="{ path: '/'}">Main Page</router-link>
    <router-link :to="{ path: '/' + user._id, params: { user: user } }">{{ username }}</router-link>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { getUser, logout } from '../util/auth'
export default {
  data() {
    return {
      user: getUser()
    }
  },
  computed: {
    username: function() {
      if (this.user.first_name && this.user.last_name) {
        return this.user.first_name + this.user.last_name
      } else {
        return this.user.email
      }
    }
  },
  methods: {
    logout() {
      logout()
    }
  }
}
</script>