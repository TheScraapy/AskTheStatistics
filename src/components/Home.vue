<template>
  <div class="container">
    <h1 class="title">Ask The Statistics</h1>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <div class="content">
            <p class="title">Wages</p>
            <p class="subtitle">How much should you be getting paid ?</p>
            <div class="content">
              <router-link to="/wages">
                <b-button icon-left="currency-usd" type="is-success" size="is-large">Predict</b-button>
              </router-link>
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-danger">
          <div class="content">
            <p class="title">Grades</p>
            <p class="subtitle">What grades should you be getting</p>
            <div class="content">
              <router-link to="/grades">
                <b-button icon-left="poll-box" type="is-danger" size="is-large">Predict</b-button>
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
          <article class="tile is-child notification is-info">
            <div class="content">
              <p class="title">League of Legends</p>
              <p class="subtitle">Which team will win according to the statistics of the first 10 mins of the game ?</p>
              <div class="content">
                <router-link to="/lol">
                  <b-button icon-left="gamepad" type="is-info" size="is-large">Predict</b-button>
                </router-link>
              </div>
            </div>
          </article>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
body {
  background-color: #f0f0f0;
}
</style>
