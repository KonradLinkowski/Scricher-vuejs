<template>
  <div>
      <button @click="logout()" />
  </div>
</template>
<script>
import { logout } from '../util/auth'
export default {
  name: 'LoginPage',
  methods: {
    logout() {
      logout()
    }
  }
}
</script>