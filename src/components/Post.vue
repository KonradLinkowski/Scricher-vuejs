<template>
  <div class="card">
    <p v-if="isNameSpecified">{{ object.user.first_name }} {{ object.user.last_name }}</p>
    <p v-else>{{ object.user.email }}</p>
    <p>{{ object.message }}</p>
  </div>
</template>
<script>
export default {
  props: [
    'object'
  ],
  computed: {
    isNameSpecified: function() {
      return this.object.user.first_name && this.object.user.last_name;
    }
  },
}
</script>
