<template>
  <div class="container">
    <h1 class="title">League of Legends</h1>
    <b-field label="Blue kills">
      <b-slider v-model="blueKills" :min="0" :max="30" size="is-large" ticks></b-slider>
    </b-field>
    <b-field label="Blue gold">
      <b-slider v-model="blueGold" :min="7500" :max="27000" size="is-large"></b-slider>
    </b-field>
    <b-field label="Blue experience">
      <b-slider v-model="blueExp" :min="7000" :max="26000" size="is-large"></b-slider>
    </b-field>
      <b-field label="Red kills">
      <b-slider v-model="redKills" :min="0" :max="30" size="is-large" ticks></b-slider>
    </b-field>
    <b-field label="Red gold">
      <b-slider v-model="redGold" :min="7500" :max="27000" size="is-large"></b-slider>
    </b-field>
    <b-field label="Red experience">
      <b-slider v-model="redExp" :min="7000" :max="26000" size="is-large"></b-slider>
    </b-field>
    <b-button icon-left="crosshairs" type="is-info" size="is-large" @click="predict()">Predict</b-button>
    <router-link to="/home">
      <b-button icon-left="home" type="is-primary" size="is-large">Back to home</b-button>
    </router-link>
    <a href="https://www.kaggle.com/bobbyscience/league-of-legends-diamond-ranked-games-10-min" target="_blank">
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
      model: 'model/5ef0cf0fe84f942c5800212f',
      blueKills: 6,
      blueGold: 16500,
      blueExp: 18000,
      redKills: 6,
      redGold: 16500,
      redExp: 18000
    }
  },
  methods: {
    async predict () {
      let loader = null
      try {
        loader = this.$buefy.loading.open()
        let data = {
          blueKills: this.blueKills,
          blueGold: this.blueGold,
          blueExp: this.blueExp,
          redKills: this.redKills,
          redGold: this.redGold,
          redExp: this.redExp
        }
        const res = await Prediction.prediction(this.model, data)
        console.log(res)
        loader.close()
        if (res.status === 201) {
          if (res.data.output === '0') {
            this.alertCustom('Red', res.data.confidence)
          } else {
            this.alertCustom('Blue', res.data.confidence)
          }
        } else {
          this.alertCustomError('🤕 An error occured with BigML', loader)
        }
      } catch (e) {
        this.alertCustomError('🤕 Could not make a prediction', loader)
      }
    },
    alertCustom (team, confidence) {
      this.$buefy.dialog.alert({
        title: 'League of Legends',
        message: team + ' team should win the game !\nConfidence : ' + Math.round(confidence * 100) + '%',
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
