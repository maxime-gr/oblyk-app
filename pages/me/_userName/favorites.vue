<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-favorite-tabs :user="currentUser" />
      <v-container>
        <router-view :user="currentUser" />
      </v-container>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import Gym from '@/models/Gym'
import Crag from '@/models/Crag'
import UserFavoriteTabs from '@/components/users/layouts/UserFavoriteTabs'

export default {
  components: {
    UserFavoriteTabs,
    Spinner
  },
  mixins: [CurrentUserConcern],

  data () {
    return {
      loadingGyms: true,
      loadingCrags: true,
      gyms: [],
      crags: []
    }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.favorites')
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
    this.getFavoriteGyms()
    this.getFavoriteCrags()
  },

  methods: {
    getFavoriteGyms () {
      this.loadingGyms = true
      new CurrentUserApi(this.$axios, this.$auth)
        .favoriteGyms()
        .then((resp) => {
          for (const gym of resp.data) {
            this.gyms = new Gym({ attributes: gym })
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingGyms = false
        })
    },

    getFavoriteCrags () {
      this.loadingCrags = true
      new CurrentUserApi(this.$axios, this.$auth)
        .favoriteCrags()
        .then((resp) => {
          for (const crag of resp.data) {
            this.crags = new Crag({ attributes: crag })
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingCrags = false
        })
    }
  }
}
</script>
