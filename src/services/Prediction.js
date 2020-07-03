import BigML from '@/services/BigML'

export default {
  prediction (model, data) {
    return BigML().post('prediction?username=' + process.env.VUE_APP_BIGML_USERNAME + ';api_key=' + process.env.VUE_APP_BIGML_API_KEY, {
      'model': model,
      'input_data': data
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
