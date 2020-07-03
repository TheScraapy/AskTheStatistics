<template>
  <div class="container">
    <h1 class="title">Wages</h1>
    <b-field label="Age">
      <b-slider v-model="age" :min="15" :max="65" size="is-large" ticks></b-slider>
    </b-field>
    <b-field label="Education">
      <b-slider v-model="ed" :min="0" :max="21" size="is-large" ticks></b-slider>
    </b-field>
    <b-field label="Sex">
      <b-select v-model="sex" placeholder="Select an option" size="is-large" expanded required>
          <option value="female">Female</option>
          <option value="male">Male</option>
      </b-select>
    </b-field>
    <b-field label="Race">
      <b-select v-model="race" placeholder="Select an option" size="is-large" expanded required>
          <option value="black">Black</option>
          <option value="hispanic">Hispanic</option>
          <option value="white">White</option>
          <option value="other">Other</option>
      </b-select>
    </b-field>
    <b-button icon-left="crosshairs" type="is-success" size="is-large" @click="predict()">Predict</b-button>
    <router-link to="/home">
      <b-button icon-left="home" type="is-primary" size="is-large">Back to home</b-button>
    </router-link>
    <a href="https://www.kaggle.com/ljanjughazyan/wages" target="_blank">
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
      model: 'model/5ef0a728abfdeb2da1002639',
      age: 40,
      ed: 13,
      sex: null,
      race: null
    }
  },
  methods: {
    async predict () {
      let loader = null
      try {
        if (this.model && this.age && this.ed && this.sex && this.race) {
          loader = this.$buefy.loading.open()
          let data = {
            age: this.age,
            ed: this.ed,
            sex: this.sex,
            race: this.race
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
    alertCustom (wage) {
      this.$buefy.dialog.alert({
        title: 'Wages',
        message: 'You should be earning around ' + Math.round(wage) + '$ !',
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
