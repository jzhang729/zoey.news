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
      if (this.props.keywords.indexOf(this.state.newKeyword.trim()) < 0) {
        this.getFlux().actions.addKeyword(this.props.chartID, this.state.newKeyword.trim())
        this.setState(function(previousState, currentProps) {
          return {
            keywords: previousState.keywords.concat(previousState.newKeyword.trim()),
            newKeyword: ""
          }
        })
      } else {
        this.setState({newKeyword: ""})
      }
    }
  },

  handleKeyUp: function(event) {
    if (event.which == 13 && this.state.newKeyword.trim().length > 0) {
      if (this.props.keywords.indexOf(this.state.newKeyword.trim()) < 0) {
        var newKeywords = this.props.keywords
        newKeywords.push(this.state.newKeyword.trim())
        this.setState({
          keywords: newKeywords,
          newKeyword: ""
        })
        this.getFlux().actions.addKeyword(this.props.chartID, this.state.newKeyword.trim())
      } else {
        this.setState({newKeyword: ""})
      }
    }
  },

  removeKeyword: function(keywordIndex) {
    if (this.props.keywords.length > 1) {
      var remainingKeywords = this.props.keywords
      remainingKeywords.splice(keywordIndex, 1)
      this.setState({keywords: remainingKeywords})
      this.getFlux().actions.removeKeyword(this.props.chartID, keywordIndex);
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
                      onClick={this.handleClick}
                      onKeyUp={this.handleKeyUp}
          />
          <KeywordList className={'keyword-list'}
                       chartID={this.props.chartID}
                       keywords={this.state.keywords}
                       removeKeyword={this.removeKeyword}
          />
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
