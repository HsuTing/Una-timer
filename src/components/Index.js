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
const now = moment();

@radium
class Index extends React.Component {
  render() {
    return (
      <div>
        {
          (now.year() - year) +
          (moment().format('x') - moment(birthday).format('x')) /
          (moment(birthday).add(1, 'y') - moment(birthday).format('x'))
        } years old
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
