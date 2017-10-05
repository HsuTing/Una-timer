'use strict';

import React from 'react';
import radium from 'radium';
import moment from 'moment';
import Wrapper from 'cat-components/lib/wrapper';

import Normalize from 'componentsShare/Normalize';

const {year, ...birthday} = {
  year: 1994,
  month: 0,
  day: 6
};

@radium
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment()
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({now: moment()});
    }, 1000 / 24);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {now} = this.state;

    return (
      <div>
        {(
          (now.year() - year) +
          (moment().format('x') - moment(birthday).format('x')) /
          (moment(birthday).add(1, 'y') - moment(birthday).format('x'))
        ).toFixed(12)} years old
      </div>
    );
  }
}

/* eslint-disable react/display-name, react/prop-types */
export default ({radiumConfig, ...props}) => (
  <Wrapper radiumConfig={radiumConfig}>
    <div>
      <Normalize />

      <Index {...props} />
    </div>
  </Wrapper>
);
/* eslint-enable react/display-name, react/prop-types */
