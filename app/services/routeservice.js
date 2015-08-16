
var _buildParamsURI = function(params, key) {
  var paramsURI = '&'+key+'='
  params.forEach(function(word) {
      paramsURI += word + ','
    });
    return paramsURI.slice(0, -1)
}

export default {
  apiUrl: function(keywords, publishers) {
    var route = '/detail?';
    route += _buildParamsURI(keywords, "k")
    route += _buildParamsURI(publishers, "p")
    return route
  }

}