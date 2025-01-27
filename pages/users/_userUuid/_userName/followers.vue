<template>
  <v-container>
    <spinner v-if="loadingFollowers" />

    <div v-if="!loadingFollowers">
      <v-row>
        <v-col
          v-for="(follower, index) in followers"
          :key="`follower-${index}`"
          class="col-12 col-md-6 col-lg-4"
        >
          <user-small-card class="mb-2" :user="recordToObject('User', follower)" />
        </v-col>
      </v-row>

      <loading-more
        :get-function="getSubscribes"
        :no-more-data="noMoreDataToLoad"
        :loading-more="loadingMoreData"
      />

      <p
        v-if="followers.length === 0 && !loadingFollowers"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.user.followersEmpty', { name: user.first_name }) }}
      </p>
    </div>
  </v-container>
</template>

<script>
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import { RecordToObjectHelpers } from '~/mixins/RecordToObjectHelpers'
import UserApi from '@/services/oblyk-api/UserApi'
import UserSmallCard from '@/components/users/UserSmallCard'
import Spinner from '@/components/layouts/Spiner'
import LoadingMore from '@/components/layouts/LoadingMore'

export default {
  components: { LoadingMore, Spinner, UserSmallCard },
  mixins: [LoadingMoreHelpers, RecordToObjectHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingFollowers: true,
      followers: []
    }
  },

  head () {
    return {
      title: this.userMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.userMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.userMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.userMetaDescription },
        { hid: 'og:url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  },

  computed: {
    userMetaTitle () {
      return this.$t('meta.user.follower.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription () {
      return this.$t('meta.user.follower.description', { name: (this.user || {}).first_name })
    },
    userMetaUrl () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path}/followers`
      }
      return ''
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', false)
    this.getSubscribes()
  },

  methods: {
    getSubscribes () {
      this.moreIsBeingLoaded()
      new UserApi(this.$axios, this.$auth)
        .followers(this.user.uuid, this.page)
        .then((resp) => {
          for (const follower of resp.data) {
            this.followers.push(follower)
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingFollowers = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
