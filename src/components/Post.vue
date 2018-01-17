<template>
  <div class="card">
    <router-link :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-if="isNameSpecified">{{ object.user.first_name }} {{ object.user.last_name }}</router-link>
    <router-link :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-else>{{ object.user.email }} </router-link>
    <p>{{ object.message }}</p>
    <p>{{ getTimeAndDate }}</p>
    <p v-if="canBeRemoved" @click="removePost">DELETE</p>
    <button @click.once="loadComments()" @click="showComments()">Show Comments</button>
    <div v-show="commentsShown">
      <a href="#" v-show="!noComments" @click.prevent="loadComments()">Load More</a>
      <span v-show="noComments">No more comments</span>
      <div class="container vert-cont" v-for="(item, index) in list" :key='item._id'>
        <Comment @comment-deleted="onCommentDeleted" :object="item" :index="index" />
      </div>
      <textarea v-model="message" placeholder="Comment me!" />
      <button @click="comment()">Comment</button>
    </div>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import Comment from './Comment'
import { getComments, sendComment, removePost } from '../util/api'
import { getUser } from '../util/auth'
import roles from '../util/roles'
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
    'object',
    'index'
  ],
  computed: {
    isNameSpecified: function() {
      return this.object.user.first_name && this.object.user.last_name;
    },
    getTimeAndDate: function() {
      return new Date(this.object.date).toLocaleDateString() + ' ' + new Date(this.object.date).toLocaleTimeString()
    },
    canBeRemoved: function() {
      let user = getUser()
      return user.role == roles.ADMIN || this.object.user._id == user._id
    }
  },
  methods: {
    showComments() {
      this.commentsShown = !this.commentsShown
    },
    loadComments() {
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
    removePost() {
      removePost(this.object._id)
      .then(result => {
        this.$emit("post-deleted", this.index)
      })
      .catch(err => {
        console.log(err)
      })
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
    onCommentDeleted(value) {
      this.list.splice(value)
    }
  },
  components: {
    InfiniteLoading,
    Comment
  }
}
</script>
