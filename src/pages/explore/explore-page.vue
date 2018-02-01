<template>
  <div class="page">
    <div class="title-wrapper">
      <h1 class="page-title">
        MUSIC SUGGESTIONS
      </h1>
    </div>

    <div class="wrapper">
        <recommendation-results v-if="hasSeeds"
                                @openSearch="toggleSearch">
        </recommendation-results>
        <no-recommendation-seeds @startAdding="toggleSearch"
                                 v-else>
        </no-recommendation-seeds>
    </div>

    <modal :show="showSearch" @close="toggleSearch">
      <search></search>
    </modal>

    <modal :show="showPlaylist" @close="resetRecommendationState">
      <playlist></playlist>
    </modal>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters, mapActions } from "vuex";
import Modal from "@/components/modal";
import Search from "./search";
import NoRecommendationSeeds from "./no-recommendation-seeds";
import RecommendationResults from "./recommendation-results";
import Playlist from "./Playlist";

@Component({
  components: {
    Search,
    Modal,
    NoRecommendationSeeds,
    RecommendationResults,
    Playlist
  },
  computed: { ...mapGetters(["showSearch", "hasSeeds", "showPlaylist"]) },
  methods: {
    ...mapActions([
      "openSearch",
      "closeSearch",
      "resetRecommendationState",
      "loadProfile"
    ])
  }
})
export default class ExplorePage extends Vue {
  mounted() {
    this.loadProfile();
  }

  toggleSearch() {
    if (this.showSearch) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/mixins/_gradients.scss";
@import "../../styles/vars";

.page {
  background-color: $light-gray;
  display: flex;

  justify-content: space-between;
  flex: 1;
  height: 100%;
  flex-direction: column;
}

.wrapper {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: auto;
  padding: 16px;
  flex-grow: 1;
}

.title-wrapper {
  background-color: $primary;
  padding: 20px;
  display: flex;
  justify-content: center;
  min-height: 150px;
}

.page-title {
  color: $white;
  text-align: center;
}
</style>
