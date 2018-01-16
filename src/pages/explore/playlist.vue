<template>
  <section class="wrapper">
    <h3 class="section-title">
      Recommended songs:
    </h3>

    <div class="results">
      <div class="results-section">
        <ul class="results-list">
          <li v-for="song in songs" :key="song.id">
            <list-item-card :title="song.name"
                            :image="song.album.imageUrl"
                            :isAdded="true">
            </list-item-card>
          </li>
        </ul>
      </div>
    </div>

    <div class="action-button-wrapper">
      <main-action-button @click="handleSavePlaylist" :disabled="shouldDisableCreatePlaylistButton">
        <span v-if="isSavingPlaylist">
          <icon name="spinner" style="margin-right: 0.5rem" pulse></icon>
          SAVING PLAYLIST
        </span>
        <span v-else-if="isPlaylistSaved">
          PLAYLIST SAVED
        </span>
        <span v-else>
          SAVE PLAYLIST
        </span>
      </main-action-button>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters, mapActions } from "vuex";
import ListItemCard from "@/components/list-item-card";
import MainActionButton from "@/components/main-action-button";

@Component({
  components: { ListItemCard, MainActionButton },
  computed: {
    ...mapGetters([
      "getSongById",
      "playlistSongIds",
      "userId",
      "isSavingPlaylist",
      "isPlaylistSaved"
    ])
  },
  methods: {
    ...mapActions(["savePlaylist"])
  }
})
export default class Playlist extends Vue {
  get songs() {
    return this.playlistSongIds.map(id => this.getSongById(id));
  }

  get shouldDisableCreatePlaylistButton() {
    return this.isSavingPlaylist || this.isPlaylistSaved;
  }

  handleSavePlaylist() {
    console.log("save playlist");
    this.savePlaylist({
      userId: this.userId,
      tracks: this.songs
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/vars";

.wrapper {
  height: 100%;
}

.results-section {
  margin-top: 40px;
}

.results-section-title {
  font-size: 1.25rem;
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
  display: flex;
  padding-bottom: 0.5rem;
  align-items: center;

  h4 {
    flex-grow: 1;
    margin: 0;
  }

  button {
    display: flex;
  }
}

.results-list {
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
}

.results-list-artist {
  width: 100%;
  flex-direction: row;

  .card-block {
    flex: 1;
  }
}

.action-button-wrapper {
  padding-top: 2rem;
  z-index: $z-index-modal-main-button;
}
</style>
