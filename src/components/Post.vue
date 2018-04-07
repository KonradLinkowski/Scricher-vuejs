<template>
  <article class="post">
    <router-link class="username" :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-if="isNameSpecified">{{ object.user.first_name }} {{ object.user.last_name }}</router-link>
    <router-link class="username" :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-else>{{ object.user.email }} </router-link>
    <p class="message">{{ object.message }}</p>
    <span class="date">{{ getTimeAndDate }}</span>
    <button class="delete-btn" v-if="canBeRemoved" @click="removePost">DELETE</button>
    <button class="load-btn" @click.once="loadComments()" @click="showComments()">{{ commentsShown ? 'Hide' : 'Show'}} Comments</button>
    <div class="comments" v-show="commentsShown">
      <a class="loadmore-btn" href="#" v-show="!noComments" @click.prevent="loadComments()">Load More</a>
      <!--<span v-show="noComments">No more comments</span>-->
      <Comment @comment-deleted="onCommentDeleted" v-for="(item, index) in list" :key='item._id' :object="item" :index="index" />
      <textarea class="message" v-model="message" placeholder="Comment me!" />
      <button class="submit-btn" @click="comment()">Comment</button>
    </div>
  </article>
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
        console.error(error);window.alert(error.data);
      })
    },
    removePost() {
      removePost(this.object._id)
      .then(result => {
        this.$emit("post-deleted", this.index)
      })
      .catch(err => {
        console.error(err);window.alert(err.data);
      })
    },
    comment() {
      sendComment(this.object._id, this.message)
      .then(data => {
        this.list.push(data)
        this.message = null
      })
      .catch(err => {
        console.error(err);window.alert(err.data);
      })
    },
    onCommentDeleted(value) {
      this.list.splice(value, 1)
    }
  },
  components: {
    InfiniteLoading,
    Comment
  }
}
</script>
<style scoped>
.post {
  margin: 10px 0 20px 0;
}

.post > .message {
  overflow-wrap: break-word;
  font-size: 1.1rem;
  margin: 3px 0 3px 0;
}

.date-container {
  display: flex;
  margin-bottom: 10px;
}

.date {
  color: var(--green-color);
  font-size: 0.8rem;
}

.username {
  color: var(--orange-color);
  text-decoration: none;
}

.load-btn {
  color: var(--red-color);
  border-color: var(--red-color);
  border-style: solid;
  border-width: 1px;
  background-color: inherit;
  padding: 5px;
  border-collapse: collapse;
  display: block;
  margin: 5px 0 5px 0;
}

.delete-btn {
  color: var(--red-color);
  border-color: var(--red-color);
  border-style: solid;
  border-width: 1px;
  background-color: inherit;
  font-size: 0.8rem;
}

.comments {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}

.comments .message {
  font-size: 1.0rem;
  color: var(--blue-color);
  resize: none;
  height: 3rem;
  background: var(--background-color);
  border-color: var(--green-color);
  padding: 10px;
  margin-top: 10px;
}

.comments .submit-btn {
  align-self: flex-end;
  flex: 0;
  color: var(--red-color);
  border-color: var(--red-color);
  border-style: solid;
  border-width: 2px;
  background-color: inherit;
  padding: 10px;
}
.comments .loadmore-btn {
  align-self: flex-start;
  flex: 0;
  text-decoration: none;
  color: var(--red-color);
  border-color: var(--red-color);
  border-style: solid;
  border-width: 1px;
  background-color: inherit;
  padding: 2px;
  margin-top: 5px;
}
</style>
