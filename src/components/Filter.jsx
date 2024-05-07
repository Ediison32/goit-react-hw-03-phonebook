import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search contacts..."
      />
    );
  }
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;