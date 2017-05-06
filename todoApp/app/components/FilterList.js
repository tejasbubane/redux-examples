import React from 'react';

import Link from 'Link';

export default class FilterList extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  changeFilter = (filter, e) => {
    e.preventDefault();

    this.context.store.dispatch({
      type: "SET_VISIBILITY",
      visibility: filter
    });
    console.log(filter);
  }

  render() {
    let currentFilter = this.context.store.getState().visibility;

    return (
      <div>
        <Link filter="SHOW_ALL"
              onClick={this.changeFilter}
              currentFilter={currentFilter}>All</Link>&nbsp;
        <Link filter="COMPLETED"
              onClick={this.changeFilter}
              currentFilter={currentFilter}>Completed</Link>&nbsp;
        <Link filter="PENDING"
              onClick={this.changeFilter}
              currentFilter={currentFilter}>Pending</Link>&nbsp;
      </div>
    );
  }
}

FilterList.contextTypes = {
  store: React.PropTypes.object
};
