import React, { Component } from 'react';

import ContentListItem from './ContentListItem.js'

export default class ContentList extends Component {

  state = {
    anchorEl: null,
  };

  render() {

    return (
      <div>
        { this.props.content.map((obj) =>

          <ContentListItem key={obj.id} content={obj} player={this.props.player} deleteContent={this.props.deleteContent} playContent={this.props.playContent} pauseContent={this.props.pauseContent}  openContentEditForm={this.props.openContentEditForm}/>
          
          )
        }
      </div>
    )
  }

}
