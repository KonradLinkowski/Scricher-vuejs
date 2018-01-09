<template>
  <div class="card">
    <p v-if="isNameSpecified">{{ object.user.first_name }} {{ object.user.last_name }}</p>
    <p v-else>{{ object.user.email }}</p>
    <p>{{ object.message }}</p>
    <p>{{ getTimeAndDate }}</p>
    <button @click.once="loadComments()" @click="showComments()">Show Comments</button>
    <div v-show="commentsShown">
      <span @click="loadComments()">Load More</span>
      <span v-show="noComments">No more comments</span>
      <div class="container vert-cont" v-for="item in list" :key='item._id'>
        <div class="card">
          <p v-if="hasName(item)">{{ item.user.first_name }} {{ item.user.last_name }}</p>
          <p v-else>{{ item.user.email }}</p>
          <p>{{ item.message }}</p>
          <p>{{ item.date }}</p>
        </div>
      </div>
      <textarea v-model="message" placeholder="Comment me!" />
      <button @click="comment()">Comment</button>
    </div>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import { getComments, sendComment } from '../util/api'
import { getUser } from '../util/auth'
export default {
  data() {
    return {
      list: [],
      message: null,
      noComments: false,
      commentsShown: false
    }
  },
  props: [
    'object'
  ],
  computed: {
    isNameSpecified: function() {
      console.log("test", this.object)
      return this.object.user.first_name && this.object.user.last_name;
    },
    getTimeAndDate: function() {
      return new Date(this.object.date).toLocaleDateString() + ' ' + new Date(this.object.date).toLocaleTimeString()
    },
  },
  methods: {
    showComments() {
      this.commentsShown = !this.commentsShown
    },
    loadComments() {
      console.log("test")
      getComments(this.object._id, {
        limit: 2,
        newest: this.list.length ? this.list[this.list.length - 1].date : undefined
      })
      .then(data => {
        console.log(data)
        if (data.length) {
          this.list = this.data.concat(this.list)
        } else {
          this.noComments = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    },

    hasName(item) {
      console.log(item)
      return item.user.first_name && item.user.last_name
    },
    comment() {
      sendComment(this.object._id, this.message)
      .then(data => {
        this.list.unshift(data)
        this.message = null
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  components: {
    InfiniteLoading,
  }
}
</script>
