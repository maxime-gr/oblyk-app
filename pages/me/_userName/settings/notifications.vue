<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.notificationSetting') }}
        </h2>
        <newsletter-subscribe-switch-form :user="user" />
        <p class="mt-2">
          <u>
            {{ $t('components.user.emailNotification') }}
          </u>
        </p>
        <email-notification-form :user="user" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsletterSubscribeSwitchForm from '@/components/users/forms/NewsletterSubscribeSwitchForm'
import EmailNotificationForm from '@/components/users/forms/EmailNotificationForm'

export default {
  components: { EmailNotificationForm, NewsletterSubscribeSwitchForm },
  props: {
    user: { type: Object, required: true }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.notificationSetting')
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
