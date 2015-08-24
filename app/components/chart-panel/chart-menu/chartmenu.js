import React from 'react'
import Fluxxor from 'fluxxor'

import AddKeyword from './addkeyword'
import KeywordList from './keywordlist'
import PublisherList from './publisherlist'
import AddPublisher from './addpublisher'

var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({

  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      newKeyword: "",
      keywords: this.props.keywords,
      publishers: this.props.publishers
    }
  },

  handleChange: function(newKeyword) {
    this.setState({newKeyword: newKeyword})
  },

  addKeyword: function() {
    if (this.state.newKeyword.trim().length > 0) {
      if (this.props.keywords.indexOf(this.state.newKeyword.trim()) < 0) {
        var newKeywords = this.props.keywords
        newKeywords.push(this.state.newKeyword.trim())
        this.setState({
          keywords: newKeywords,
          newKeyword: ""
        })
        this.getFlux().actions.updateKeywords(this.props.chartID)
      } else {
        this.setState({newKeyword: ""})
      }
    }
  },

  addPublisher: function(event) {
    if (event.target.value > 0) {
      var addedPublisher = this.props.publisherList.filter(function(publisher) {
        return (publisher.id == event.target.value)
      })[0]
      var newActivePublishers = this.props.publishers
      newActivePublishers.push(addedPublisher)
      this.setState({publishers: newActivePublishers})
      this.getFlux().actions.updatePublishers(this.props.chartID)
    }
  },

  removeKeyword: function(keywordIndex) {
    if (this.props.keywords.length > 1) {
      var remainingKeywords = this.props.keywords
      remainingKeywords.splice(keywordIndex, 1)
      this.setState({keywords: remainingKeywords})
      this.getFlux().actions.updateKeywords(this.props.chartID);
    }
  },

  removePublisher: function(publisherIndex) {
    if (this.props.publishers.length > 1) {
      var remainingPublishers = this.props.publishers
      remainingPublishers.splice(publisherIndex, 1)
      this.setState({publishers: remainingPublishers})
      this.getFlux().actions.updatePublishers(this.props.chartID);
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
                    addKeyword={this.addKeyword}
        />
        <KeywordList className={'keyword-list'}
                     chartID={this.props.chartID}
                     keywords={this.state.keywords}
                     removeKeyword={this.removeKeyword}
        />
        <h5>Publishers</h5>
        <PublisherList className={'publisher-list'}
                       chartID={this.props.chartID}
                       publisherList={this.props.publisherList}
                       publishers={this.state.publishers}
                       removePublisher={this.removePublisher}
                       legend={true}
        />
        <AddPublisher chartID={this.props.chartID}
                      publisherList={this.props.publisherList}
                      publishers={this.state.publishers}
                      addPublisher={this.addPublisher} />
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

//
//          {deleteChartButton}
