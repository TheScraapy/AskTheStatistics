<template>
  <div class="container">
    <h1 class="title">Grades</h1>
    <b-field label="Preparation">
      <b-select v-model="preparation" placeholder="Select an option" size="is-large" expanded required>
          <option value="completed">Completed</option>
          <option value="none">None</option>
      </b-select>
    </b-field>
    <b-field label="Lunch">
      <b-select v-model="lunch" placeholder="Select an option" size="is-large" expanded required>
          <option value="standard">Standard</option>
          <option value="free/reduced">Free / Reduced</option>
      </b-select>
    </b-field>
    <b-field label="Gender">
      <b-select v-model="gender" placeholder="Select an option" size="is-large" expanded required>
          <option value="female">Female</option>
          <option value="male">Male</option>
      </b-select>
    </b-field>
    <b-field label="Parent's level of education">
      <b-select v-model="education" placeholder="Select an option" size="is-large" expanded required>
          <option value="associate's degree">Associate's degree</option>
          <option value="bachelor's degree">Bachelor's degree</option>
          <option value="high school">High School</option>
          <option value="master's degree">Master's degree</option>
          <option value="some college">Some college</option>
          <option value="some high school">Some high school</option>
      </b-select>
    </b-field>
    <b-button icon-left="crosshairs" type="is-danger" size="is-large" @click="predict()">Predict</b-button>
    <router-link to="/home">
      <b-button icon-left="home" type="is-primary" size="is-large">Back to home</b-button>
    </router-link>
    <a href="https://www.kaggle.com/spscientist/students-performance-in-exams" target="_blank">
      <b-button icon-left="database" type="is-warning" size="is-large">Dataset</b-button>
    </a>
  </div>
</template>

<script>
import Prediction from '@/services/Prediction'

export default {
  name: 'Home',
  data () {
    return {
      model: 'model/5ef0bdfdace11f2abe002316',
      preparation: null,
      lunch: null,
      gender: null,
      education: null
    }
  },
  methods: {
    async predict () {
      let loader = null
      try {
        if (this.model && this.preparation && this.lunch && this.gender && this.education) {
          loader = this.$buefy.loading.open()
          let data = {
            preparation: this.preparation,
            lunch: this.lunch,
            gender: this.gender,
            education: this.education
          }
          const res = await Prediction.prediction(this.model, data)
          console.log(res)
          loader.close()
          if (res.status === 201) {
            this.alertCustom(res.data.output)
          } else {
            this.alertCustomError('🤕 An error occured with BigML', loader)
          }
        } else {
          this.alertCustomError('🤕 Fill up the form please', loader)
        }
      } catch (e) {
        this.alertCustomError('🤕 Could not make a prediction', loader)
      }
    },
    alertCustom (grade) {
      this.$buefy.dialog.alert({
        title: 'Grades',
        message: 'Your grades should be around ' + Math.round(grade) + '% !',
        confirmText: 'Cool !'
      })
    },
    alertCustomError (msg, loader) {
      if (loader !== null) {
        loader.close()
      }
      this.$buefy.dialog.alert({
        title: 'Error',
        message: msg,
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true
      })
    }
  }
}
</script>

<style scoped>
body {
  background-color: #f0f0f0;
}
</style>
