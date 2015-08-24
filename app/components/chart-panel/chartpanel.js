import React from 'react'
import Fluxxor from 'fluxxor'

import BarChart from './barchart'
import TimeLapse from './timelapse'
import Donut from './donut'

import ChartTitle from './charttitle'
import Slider from './slider'
import ChartMenu from './chart-menu/chartmenu'

export default React.createClass({

  render: function() {
    var chart;
    var slider = (<Slider chartID={this.props.chartID}
                          allDates={this.props.allDates}
                          startDate={this.props.startDate}
                          endDate={this.props.endDate}
                          />
    );
    switch(this.props.chartType) {
      case "barchart":
        chart = (<BarChart className="chart"
                           chartID={this.props.chartID}
                           data={this.props.data}
        />)
        break;
      case "donut":
        chart = (<Donut className="chart"
                        chartID={this.props.chartID}
                        data={this.props.data}
        />)
        break;
      case "timelapse":
        chart = (<TimeLapse className="chart"
                        chartID={this.props.chartID}
                        data={this.props.data}
        />)
        slider = ""
        break;
    }

    return (
      <div className="chart-container">
        <div className="chart-label-y">
        </div>
        <div className="chart-main">
          <ChartTitle title={this.props.title}
                      chartID={this.props.chartID} />
          {chart}
          {slider}
        </div>
        <ChartMenu chartID={this.props.chartID}
                   chartType={this.props.chartType}
                   keywords={this.props.keywords}
                   publishers={this.props.publishers}
                   publisherList={this.props.publisherList}
                   chartListLength={this.props.chartListLength}
        />
      </div>
    )
  }
})
