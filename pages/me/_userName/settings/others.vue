<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.otherSetting') }}
        </h2>

        <v-expansion-panels>
          <!-- Export ascents and projects -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('components.user.exportAscentsOrProject') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <export-ascents-or-projects-form />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Delete account -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('components.user.actionOnMyAccount') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <delete-user-form :user="user" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeleteUserForm from '@/components/users/forms/DeleteUserForm'
import ExportAscentsOrProjectsForm from '@/components/users/forms/ExportAscentsOrProjectsForm'

export default {
  components: { ExportAscentsOrProjectsForm, DeleteUserForm },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.otherSetting')
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
