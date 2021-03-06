/* eslint react/jsx-one-expression-per-line: 0, react/jsx-no-bind: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import PlaneRow from './PlaneRow';
import { PERIOD } from '../constants';

class Panel extends Component {
  componentDidMount() {
    this.planeFetchInterval = setInterval(() => {
      this.props.fetchPlanes();
    }, PERIOD);
  }

  componentWillUnmount() {
    clearInterval(this.planeFetchInterval);
  }

  render() {
    return (
      <div id="panel">
        <List dense subheader={<ListSubheader>Active Aircraft</ListSubheader>}>
          {this.props.planes.map(plane => (
            <PlaneRow
              plane={plane}
              key={plane.ip}
              isFollowed={plane.ip === this.props.followedPlane}
              onPlaneSelect={this.props.onPlaneSelect}
              onPlaneTraceToggle={this.props.onPlaneTraceToggle.bind(this, plane)}
              onPlaneTraceClear={this.props.onPlaneTraceClear.bind(this, plane)}
              onPlaneIconChange={this.props.onPlaneIconChange.bind(this, plane)}
              onPlaneRename={this.props.onPlaneRename.bind(this, plane)}
            />
          ))}
          {this.props.planes.length === 0 && (
            <ListItem>No planes yet</ListItem>
          )}
        </List>
      </div>
    );
  }
}

Panel.propTypes = {
  fetchPlanes: PropTypes.func.isRequired,
  followedPlane: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  planes: PropTypes.arrayOf(PropTypes.any).isRequired,
  onPlaneSelect: PropTypes.func.isRequired,
  onPlaneTraceClear: PropTypes.func.isRequired,
  onPlaneTraceToggle: PropTypes.func.isRequired,
  onPlaneIconChange: PropTypes.func.isRequired,
  onPlaneRename: PropTypes.func.isRequired,
};

Panel.defaultProps = {
  followedPlane: null,
};

export default Panel;
