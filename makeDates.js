exports.makeDates = function() {

  var date1 = new Date();
  var date2 = new Date(2015, 7, 1);
  var day;
  var dates = []

  while(date1 > date2) { 
      day = date1.getDate()
      date1 = new Date(date1.setDate(--day));  
      dates.push(date1.toJSON().slice(0,10))
  }
  return dates
}

