<template>
  <div class="card">
    <router-link :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-if="isNameSpecified">{{ object.user.first_name }} {{ object.user.last_name }}</router-link>
    <router-link :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-else>{{ object.user.email }} </router-link>
    <p>{{ object.message }}</p>
    <p>{{ getTimeAndDate }}</p>
    <button @click.once="loadComments()" @click="showComments()">Show Comments</button>
    <div v-show="commentsShown">
      <a href="#" v-show="!noComments" @click.prevent="loadComments()">Load More</a>
      <span v-show="noComments">No more comments</span>
      <div class="container vert-cont" v-for="item in list" :key='item._id'>
        <div class="comment">
          <router-link :to="{ path: '/' + item.user._id, params: { user: item.user } }" v-if="hasName(item)">{{ item.user.first_name }} {{ item.user.last_name }}</router-link>
          <router-link :to="{ path: '/' + item.user._id, params: { user: item.user } }" v-else>{{ item.user.email }}</router-link>
          <p>{{ item.message }}</p>
          <span>{{ getCommentTimeAndDate(item) }}</span>
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
      return this.object.user.first_name && this.object.user.last_name;
    },
    getTimeAndDate: function() {
      return new Date(this.object.date).toLocaleDateString() + ' ' + new Date(this.object.date).toLocaleTimeString()
    },
  },
  methods: {
    getCommentTimeAndDate(item) {
      return new Date(item.date).toLocaleDateString() + ' ' + new Date(item.date).toLocaleTimeString()
    },
    showComments() {
      this.commentsShown = !this.commentsShown
    },
    loadComments() {
      console.log("list lenght", this.list.length ? this.list[0].date : undefined)
      getComments(this.object._id, {
        limit: 3,
        newest: this.list.length ? this.list[0].date : undefined
      })
      .then(data => {
        if (data.length) {
          this.list = data.concat(this.list)
        } else {
          this.noComments = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    },

    hasName(item) {
      return item.user.first_name && item.user.last_name
    },
    comment() {
      sendComment(this.object._id, this.message)
      .then(data => {
        this.list.push(data)
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
