import request from 'superagent'

export default {
  get: function(route, success) {
    request
      .get(route)
      .set('Accept', 'application/json')
      .end(success)
  }
}