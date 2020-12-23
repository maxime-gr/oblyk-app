import ActiveData from '@/models/ActiveData'
import GymGradeLineApi from '@/services/oblyk-api/gymGradeLineApi'

export default class GymGradeLine extends ActiveData {
  find (gymId, gradeId, gradeLineId) {
    return this.apiFind(GymGradeLineApi, gymId, gradeId, gradeLineId)
  }

  url (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/grades/${this.gym_grade.id}/grade-lines/${this.id}/${tabs}`
  }

  gradeUrl (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/grades/${this.id}/${tabs}`
  }
}