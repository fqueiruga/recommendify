<template>
  <section class="wrapper">
    <h3 class="section-title">
      Recommend me music based on:
    </h3>

    <div class="results">
      <div class="results-section" v-if="hasArtists">
        <div class="results-section-title">
          <h4>
            Artists
          </h4>

          <button type="button"
                  class="btn btn-primary"
                  @click="$emit('openSearch')">
            <icon name="plus"></icon>
          </button>
        </div>

        <ul class="results-list">
          <li v-for="artist in artists" :key="artist.id">
            <list-item-card :title="artist.name"
                            :image="artist.imageUrl"
                            :isAdded="true">
            </list-item-card>
          </li>
        </ul>
      </div>

      <div class="results-section" v-if="hasSongs">
        <div class="results-section-title">
          <h4>
            Songs
          </h4>

          <button type="button"
                  class="btn btn-primary"
                  @click="$emit('openSearch')">
            +
          </button>
        </div>

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
      <main-action-button @click="handleCreatePlaylist" :disabled="isGeneratingPlaylist">
        <span v-if="isGeneratingPlaylist">
          <icon name="spinner" style="margin-right: 0.5rem" pulse></icon>
          GENERATING A PLAYLIST FOR YOU
        </span>
        <span v-else>
          CREATE PLAYLIST
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
  methods: {
    ...mapActions(["generateSuggestedPlaylist"])
  },
  computed: {
    ...mapGetters([
      "getArtistById",
      "getSongById",
      "seeds",
      "isGeneratingPlaylist"
    ])
  }
})
export default class RecommendationResults extends Vue {
  get artists() {
    return this.seeds.artistIds.map(id => this.getArtistById(id));
  }

  get songs() {
    return this.seeds.songIds.map(id => this.getSongById(id));
  }

  get hasArtists() {
    return this.artists.length > 0;
  }

  get hasSongs() {
    return this.songs.length > 0;
  }

  handleCreatePlaylist() {
    this.generateSuggestedPlaylist(this.seeds);
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
}
</style>
