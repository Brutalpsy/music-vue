<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <app-upload :addSong="addSong"></app-upload>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.mySongs') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <composition-item
              v-for="(song, index) in songs"
              :song="song"
              :key="song.id"
              :updateSong="updateSong"
              :index="index"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            ></composition-item>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from '@/components/Upload.vue';
import { songsCollection, auth } from '@/includes/firebase';
import CompositionItem from '@/components/CompositionItem.vue';
export default {
  name: 'manage',
  components: {
    AppUpload,
    CompositionItem
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false
    };
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modified_name = values.modified_name;
      this.songs[index].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = { ...document.data(), docId: document.id };
      this.songs.unshift(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
      return;
    }
    const leave = confirm('You have unsaved changes, are you sure you want to leave?');
    next(leave);
  }
};
</script>
