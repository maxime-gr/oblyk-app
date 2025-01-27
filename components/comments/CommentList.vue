<template>
  <div>
    <v-skeleton-loader
      v-if="loadingComments"
      class="mx-auto"
      type="list-item-three-line"
    />

    <!-- Comment list -->
    <div v-else>
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="mt-3"
      >
        <comment-card
          :get-comments="getComments"
          :comment="comment"
        />
      </div>

      <!-- No comment -->
      <p
        v-if="comments.length === 0"
        class="text--disabled text-center"
        :class="mTopNoComment"
      >
        {{ $t('components.comment.noComment') }}
      </p>
    </div>

    <!-- Add comment-->
    <client-only>
      <div
        v-if="isLoggedIn"
        class="text-right mt-4"
      >
        <v-dialog
          v-model="commentFormDialog"
          width="600"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              text
              small
              color="primary"
              v-on="on"
            >
              <v-icon left small>
                {{ mdiCommentPlus }}
              </v-icon>
              {{ $t('actions.addComment') }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              {{ $t('actions.addComment') }}
            </v-card-title>

            <v-card-text>
              <comment-form
                :commentable-id="commentableId"
                :commentable-type="commentableType"
                :callback="getComments"
                class="mt-4"
                submit-methode="post"
              />
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </client-only>
  </div>
</template>
<script>
import { mdiCommentPlus } from '@mdi/js'
import CommentApi from '~/services/oblyk-api/CommentApi'
import Comment from '@/models/Comment'
import CommentCard from '@/components/comments/CommentCard'
import { SessionConcern } from '@/concerns/SessionConcern'
const CommentForm = () => import('@/components/comments/forms/CommentForm')

export default {
  name: 'CommentList',
  components: { CommentForm, CommentCard },
  mixins: [SessionConcern],
  props: {
    commentableId: {
      type: [String, Number],
      required: true
    },
    commentableType: {
      type: String,
      required: true
    },
    mTopNoComment: {
      type: String,
      default: 'mt-10'
    }
  },

  data () {
    return {
      mdiCommentPlus,
      comments: [],
      loadingComments: true,
      redirectTo: this.$route.fullPath,
      commentFormDialog: false
    }
  },

  mounted () {
    this.getComments()
  },

  methods: {
    getComments () {
      this.loadingComments = true
      this.commentFormDialog = false
      new CommentApi(this.$axios, this.$auth)
        .allInCommentable(this.commentableType, this.commentableId)
        .then((resp) => {
          this.comments = []
          for (const comment of resp.data) {
            this.comments.push(new Comment({ attributes: comment }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'comment')
        })
        .then(() => {
          this.loadingComments = false
        })
    }
  }
}
</script>
