<template>
  <v-container v-if="gym">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }} {{ gym.name }}
        </h2>
        <gym-form :gym="gym" submit-methode="put" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymConcern } from '~/concerns/GymConcern'
import { SessionConcern } from '~/concerns/SessionConcern'
import { ProtectedGymConcern } from '~/concerns/ProtectedGymConcern'
import GymForm from '~/components/gyms/forms/GymForm'

export default {
  components: { GymForm },
  mixins: [GymConcern, SessionConcern, ProtectedGymConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.gym || {}).name })
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
