import request from 'superagent'

export default {
  get: function(route, success) {
    request
      .get(route)
      .set('Accept', 'application/json')
      .end(success)
  },
  put: function(route, params, success) {
    request
      .put(route)
      .send(params)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(success)
  },
  post: function(route, params, success) {
    request
      .post(route)
      .send(params)
      .set('Accept', 'application/json')
      .end(success)
  },

  del: function(route, success) {
    request
      .del(route)
      .end(success)
  }
}