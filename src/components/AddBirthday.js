'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import moment from 'moment';
import cookie from 'js-cookie';
import Input from 'cat-components/lib/input';
import Button from 'cat-components/lib/button';

import * as style from './style/addBirthday';

@radium
export default class AddBirthday extends React.Component {
  static propTypes = {
    style: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.key = '';
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.join = this.join.bind(this);
  }

  render() {
    const {...props} = this.props;
    const {value} = this.state;

    return (
      <div style={[style.root, props.style]}>
        <div style={style.container}>
          When were you born ?

          <div style={style.inputRoot}>
            <Input style={style.input}
              value={value}
              onChange={this.onChange}
              onKeyPress={e => {
                if(e.key === 'Enter')
                  this.join();
              }}
              rules={[{
                validator: value => {
                  const [year, month, date] = value.split(/／/);

                  return moment({
                    year: parseInt(year),
                    month: month ? parseInt(month) - 1 : 0,
                    date: date ? parseInt(date) : 1
                  }).format() === 'Invalid date';
                },
                message: 'This is not a date.'
              }]}
              placeholder='Year／Month／Date'
            />

            <Button style={style.button}
              onClick={this.join}
            >Join</Button>
          </div>
        </div>
      </div>
    );
  }

  onKeyDown(e) {
    this.key = e.key;
  }

  onChange({value, isError, error}) {
    let newValue = value;

    if(this.key === 'Backspace') {
      if(value[value.length - 1] === '／')
        newValue = value.slice(0, value.length - 1);
    } else {
      const tempValue = value.replace(/／/g, '');

      newValue = ([
        tempValue.slice(0, 4),
        tempValue.slice(4, 6),
        tempValue.slice(6, 8)
      ]).filter(time => time !== '')
        .join('／');
    }

    this.setState({
      value: newValue,
      isError,
      error
    });
  }

  join() {
    const {value, isError, error} = this.state;

    if(value.length !== 10 || isError)
      return alert(error);

    const [year, month, date] = value.split(/／/);

    cookie.set('birthday', {
      year: parseInt(year),
      month: month ? parseInt(month) - 1 : 0,
      date: date ? parseInt(date) : 1
    });
  }
}
