import React from 'react'
import Fluxxor from 'fluxxor'

import AddKeyword from './addkeyword'
import KeywordList from './keywordlist'

var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({

  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      newKeyword: "",
      keywords: this.props.keywords
    }
  },

  handleChange: function(newKeyword) {
    this.setState({newKeyword: newKeyword})
  },

  handleClick: function() {
    if (this.state.newKeyword.trim().length > 0) {
      this.getFlux().actions.addKeyword(this.props.chartID, this.state.newKeyword.trim())
      this.setState({keywords: this.state.keywords.push(this.state.newKeyword.trim()),
                     newKeyword: ""})
    }
  },

  render: function() {

    return (
      <div className="chart-menu">
        <h5>Keywords</h5>
          <AddKeyword className={'keyword-list'}
                      chartID={this.props.chartID}
                      keywords={this.props.keywords}
                      newKeyword={this.state.newKeyword}
                      onChange={this.handleChange}
                      onClick={this.handleClick}/>
          <KeywordList className={'keyword-list'}
                             chartID={this.props.chartID}
                             keywords={this.props.keywords} />
        <h5>Publishers</h5>

      </div>
    )

  }
})

// var deleteChartButton = "";
//
// if (this.props.chartListLength > 1) {
//   deleteChartButton = (
//     <Button onClick={this.handleDeleteChart} className="delete" bsStyle="danger">Delete Chart</Button>
//   )
// }

//
// <ActivePublisherList chartID={this.props.chartParams.chartID}
//                 className={'publisher-list'}
//                 list={this.props.publisherList}
//                 activelist={this.props.chartParams.publishers}
//                 legend={true} />
// <AddPublisher chartID={this.props.chartParams.chartID}
//          list={this.props.publisherList}
//          activelist={this.props.chartParams.publishers} />
//
//          {deleteChartButton}
