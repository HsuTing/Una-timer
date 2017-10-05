'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import * as style from './style/time';

@radium
export default class Time extends React.Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    time: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired
  }

  render() {
    const {time, title, subTitle, ...props} = this.props;
    const [integer, decimal] = time.split('.');

    return (
      <div style={[style.root, props.style]}>
        <div style={style.container}>
          <div style={style.time}>
            {integer}
            <font style={style.decimal}
            >.{decimal}</font>
          </div>

          <div style={style.text}>
            <div style={style.title}
            >{title}</div>

            <div style={style.subTitle}
            >{subTitle}</div>
          </div>
        </div>
      </div>
    );
  }
}
