<template>
  <div>
    <v-text-field
      v-model="query"
      :prepend-inner-icon="mdiMapSearch"
      :label="$t('components.searchPlace.placeholder')"
      :loading="searching"
      filled
      rounded
      dense
      hide-details
      @keyup="search()"
      @click:clear="onSearch = false"
    />

    <v-list
      v-if="results.length > 0 && resultVisible"
      class="rounded-xl mt-3"
      rounded
    >
      <v-list-item-group>
        <v-list-item
          v-for="(result, index) in results"
          :key="`results-${index}`"
          dense
          @click="emitObject(result)"
        >
          <v-list-item-content>
            <v-list-item-title class="text-truncate">
              <strong>{{ result.city }}</strong> -
              <span v-if="result.postCode">{{ result.postCode }},</span> {{ result.regions }} {{ result.country }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mdiMapSearch } from '@mdi/js'
import OsmNominatim from '~/services/osm-nominatim'

export default {
  name: 'SearchPlaceLocalisation',

  props: {
    value: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      mdiMapSearch,
      query: null,
      searching: false,
      onSearch: false,
      resultVisible: true,
      previousQuery: null,
      results: [],
      osmApi: null
    }
  },

  methods: {
    search () {
      if (this.previousQuery === this.query) {
        this.searching = false
        return
      }

      this.osmApi = new OsmNominatim(this.$axios) || this.osmApi
      // Cancel old request
      this.osmApi.cancelSearch()

      this.previousQuery = this.query
      this.onSearch = true
      this.searching = true

      if (this.searchTimeOut) {
        clearTimeout(this.searchTimeOut)
        this.searchTimeOut = null
      }

      this.searchTimeOut = setTimeout(() => {
        this.osmApi
          .search(this.query)
          .then((resp) => {
            this.resultVisible = true
            this.results = []
            for (const result of resp.data) {
              this.results.push({
                lat: result.lat,
                lng: result.lon,
                city: result.address.city || result.address.landuse || result.address.village || result.address.town || result.address.municipality || result.address.county || result.address.country,
                regions: result.address.county || result.address.state || result.address.region,
                postCode: result.address.postcode,
                country: result.address.country
              })
            }
          })
          .finally(() => {
            this.searching = false
          })
      }, 500)
    },

    emitObject (result) {
      this.resultVisible = false
      this.$emit('input', result)
    }
  }
}
</script>
