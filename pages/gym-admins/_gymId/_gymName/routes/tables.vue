<template>
  <v-container fluid>
    <gym-routes-table :gym="gym" />
  </v-container>
</template>

<script>
import GymRoutesTable from '@/components/gymRoutes/GymRouteTable'

export default {
  components: { GymRoutesTable },
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
