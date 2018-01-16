<template>
  <section class="section">
    <h3 class="section-title">
      Find inspirations:
    </h3>

    <div class="input-group search-bar-group">
      <input class="form-control search-bar-input"
              type="search"
              placeholder="Search"
              v-model="searchText"
              @keyup.enter="handleSearch" />

      <button class="btn btn-secondary search-bar-button"
              type="button"
              @click="handleSearch">
        <icon name="search"></icon>
      </button>
    </div>

    <div class="results" v-if="hasSearchResults">
      <article class="results-section" v-if="hasArtists">
        <h4 class="results-section-title">
          Artists
        </h4>

        <ul class="results-list">
          <li v-for="artist in artists" :key="artist.id">
            <list-item-card :title="artist.name"
                            :image="artist.imageUrl">
              <div slot="actions">
                <button type="button"
                        class="btn card-action"
                        :class="{ 'btn-primary': !isSeedArtist(artist.id), 'btn-danger': isSeedArtist(artist.id) }"
                        @click="isSeedArtist(artist.id) ? handleRemoveSeed('artist', artist.id) : handleAddSeed('artist', artist.id)">
                  <icon name="times" v-if="isSeedArtist(artist.id)"></icon>
                  <icon name="plus" v-else></icon>
                </button>
              </div>
            </list-item-card>
          </li>
        </ul>
      </article>

      <article class="results-section" v-if="hasSongs">
        <h4 class="results-section-title">
          Songs
        </h4>

        <ul class="results-list">
          <li v-for="song in songs" :key="song.id">
            <list-item-card :title="song.name"
                            :image="song.album.imageUrl">
              <div slot="actions">
                <button type="button"
                        class="btn card-action"
                        :class="{ 'btn-primary': !isSeedSong(song.id), 'btn-danger': isSeedSong(song.id) }"
                        @click="isSeedSong(song.id) ? handleRemoveSeed('song', song.id) : handleAddSeed('song', song.id)">
                  <icon name="times" v-if="isSeedSong(song.id)"></icon>
                  <icon name="plus" v-else></icon>
                </button>
              </div>
              <div slot="info">
                <small>{{song.album.name}}</small>
                <small class="text-muted">{{song.artists[0].name}}</small>
              </div>
            </list-item-card>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters, mapActions } from "vuex";
import ListItemCard from "@/components/list-item-card";
import { isBlank } from "@/utils/StringUtils";

@Component({
  components: { ListItemCard },
  computed: {
    ...mapGetters([
      "searchSongIds",
      "searchArtistIds",
      "hasSearchResults",
      "getArtistById",
      "getSongById",
      "isSeedArtist",
      "isSeedSong"
    ])
  },
  methods: {
    ...mapActions(["searchAsync", "addSeed", "removeSeed"])
  }
})
export default class Search extends Vue {
  data() {
    return {
      searchText: ""
    };
  }

  get artists() {
    return this.searchArtistIds.map(id => this.getArtistById(id));
  }

  get songs() {
    return this.searchSongIds.map(id => this.getSongById(id));
  }

  get hasArtists() {
    return this.artists.length > 0;
  }

  get hasSongs() {
    return this.songs.length > 0;
  }

  handleSearch(event) {
    if (isBlank(this.searchText)) return;
    this.searchAsync({ query: this.searchText }).then(
      () => (this.searchText = "")
    );
  }

  handleAddSeed(type, id) {
    console.log("on add");
    this.addSeed({ id, type });
  }

  handleRemoveSeed(type, id) {
    console.log("on remove");
    this.removeSeed({ id, type });
  }
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/mixins/_gradients.scss";
@import "../../styles/vars";

$gradientStart: #0097a7;
$gradientEnd: #009688;

.section {
  flex: 1;
}

.search-bar-button {
  margin-left: 0.5rem;
}

.section-title {
  margin-bottom: 16px;
}

.results {
  // margin-top: 40px;
}

.results-section {
  margin-top: 40px;
}

.results-section-title {
  font-size: 1.25rem;
  border-bottom: 1px solid black;
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

  button {
    display: flex;
  }
}

.results-list-artist {
  width: 100%;
  flex-direction: row;

  .card-block {
    flex: 1;
  }
}
</style>
