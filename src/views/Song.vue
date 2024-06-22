<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="newSong(song)"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i
            class="fas"
            :class="{
              'fa-play': !isPlayingCurrentSong(song),
              'fa-pause': isPlayingCurrentSong(song)
            }"
          ></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(1, 'currency') }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $tc('song.commentCount', song.comment_count, {
              count: song.comment_count
            })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            v-if="comment_show_alert"
            :class="comment_alert_varient"
            class="text-white text-center font-bold p-4 mb-4"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button
              type="submit"
              :disabled="comment_in_submittion"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <app-comment
        v-for="comment in sortedComments"
        :comment="comment"
        :key="comment.id"
      ></app-comment>
    </ul>
  </main>
</template>

<script>
import { commentsCollection, songsCollection, auth } from '@/includes/firebase';
import useUserStore from '@/stores/user';
import usePlayerStore from '@/stores/player';
import { mapStores, mapState, mapActions } from 'pinia';
import AppComment from '@/components/Comment.vue';

export default {
  name: 'Song',
  components: {
    AppComment
  },
  computed: {
    ...mapStores(useUserStore),
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapState(usePlayerStore, ['playing', 'isPlayingCurrentSong']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort == '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    async addComment({ comment }, { resetForm }) {
      this.comment_in_submittion = true;
      this.comment_show_alert = true;
      this.comment_alert_varient = 'bg-blue-500';
      this.comment_alert_message = 'Please wait! Your comment is being submitted.';

      await commentsCollection.add({
        content: comment,
        songId: this.$route.params.id,
        userName: auth.currentUser.displayName,
        datePosted: new Date().toString(),
        uid: auth.currentUser.uid
      });

      this.song.comment_count += 1;
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count
      });

      this.comment_in_submittion = false;
      this.comment_alert_varient = 'bg-green-500';
      this.comment_alert_message = 'Comment added!';
      resetForm();

      await this.getComments();
    },
    async getComments() {
      const commentsSnapshot = await commentsCollection
        .where('songId', '==', this.$route.params.id)
        .get();
      this.comments = [];

      commentsSnapshot.forEach((doc) => {
        this.comments.push({ ...doc.data(), docId: doc.id });
      });
    }
  },
  data() {
    return {
      sort: '1',
      song: {},
      comments: [],
      schema: {
        comment: 'required|min:3|max:250'
      },
      comment_in_submittion: false,
      comment_show_alert: false,
      comment_alert_varient: 'bg-blue-500',
      comment_alert_message: 'Please wait! Your comment is being submitted.'
    };
  },
  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();

    if (!docSnapshot.exists) {
      this.$router.push({
        name: 'home'
      });
      return;
    }
    this.song = docSnapshot.data();

    await this.getComments();

    const { sort } = this.$route.query;
    this.sort = sort === '1' || sort === '2' ? sort : '1';
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal
        }
      });
    }
  }
};
</script>
