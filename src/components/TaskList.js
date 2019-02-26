import React, { Component } from 'react';

import TaskListItem from './TaskListItem.js'

export default class TaskList extends Component {

  render() {

    return (
      <div>
        { this.props.tasks.map((obj) =>

          <TaskListItem key={obj.id} content={obj} />
          
          )
        }
      </div>
    )
  }

}
