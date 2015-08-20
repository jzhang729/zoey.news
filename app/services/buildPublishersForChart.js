export default function(chart, allPublishers) {
  var publishers = chart.publishers.split(',')
  var chartPubsWithNames = [];
  allPublishers.forEach(function(publisher) {
    if (publishers.indexOf(publisher.id.toString()) >= 0) {
      chartPubsWithNames.push(publisher)
    }
  })
  return chartPubsWithNames
}