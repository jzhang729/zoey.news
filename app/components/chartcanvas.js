import React from 'react'
import ChartPanel from './chart-panel/chartpanel'
import Fluxxor from 'fluxxor'

export default React.createClass({

  render: function() {

    var charts = this.props.charts.map(function(chart) {
      return (
        <ChartPanel chartID={chart.chartID}
                    chartType={chart.chartType}
                    title={chart.title}
                    data={chart.data}
                    keywords={chart.keywords}
                    publishers={chart.publishers}
                    publisherList={this.props.publisherList}
                    allDates={this.props.allDates}
                    startDate={chart.startDate}
                    endDate={chart.endDate}
        />
      )
    }.bind(this))

    return (
      <div>
        {charts}
      </div>
    )
  }
})


// <Snapshot chartID={chart.chartID} title={chart.title} data={chart.snapShot} chartListLength={this.props.charts.length} publisherList={this.props.publisherList} allDates={this.props.allDates}/>

// case "timelapse":
//   return (
//     <Timelapse chartParams={chart} chartListLength={this.props.charts.length} publisherList={this.props.publisherList} allDates={this.props.allDates}/>
//   )
//   break;
// case "donut":
//   return (
//     <Donut chartParams={chart} chartListLength={this.props.charts.length} publisherList={this.props.publisherList} allDates={this.props.allDates} />
//   )
//   break;
