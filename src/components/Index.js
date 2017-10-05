'use strict';

import React from 'react';
import radium, {StyleRoot} from 'radium';
import moment from 'moment';
import cookie from 'js-cookie';
import Wrapper from 'cat-components/lib/wrapper';
import white from 'cat-components/lib/color/white';

import Normalize from 'componentsShare/Normalize';

import Time from './Time';
import AddBirthday from './AddBirthday';
import * as style from './style/index';

@radium
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment()
    };

    this.getYearsOld = this.getYearsOld.bind(this);
    this.getMonthEnd = this.getMonthEnd.bind(this);
    this.getSeasonEnd = this.getSeasonEnd.bind(this);
    this.getYearEnd = this.getYearEnd.bind(this);
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
      <StyleRoot style={style.root}>
        {
          cookie.get('birthday') ?
            <Time time={this.getYearsOld()}
              title='YEARS OLD'
              subTitle={moment(cookie.getJSON('birthday')).format('YYYY.MM.DD')}
              style={{
                color: 'rgb(239, 71, 111)',
                background: white
              }}
            /> :
            <AddBirthday
              style={{
                color: 'rgb(239, 71, 111)',
                background: white
              }}
            />
        }

        <Time time={this.getMonthEnd()}
          title='MONTH END'
          subTitle={`${now.format('Mo')} month`}
          style={{
            color: white,
            background: 'rgb(255, 209, 102)'
          }}
        />

        <Time time={this.getSeasonEnd()}
          title='SEASON END'
          subTitle={`Quarter ${now.format('Q')}`}
          style={{
            color: white,
            background: 'rgb(239, 71, 111)'
          }}
        />

        <Time time={this.getYearEnd()}
          title='YEAR END'
          subTitle={now.format('YYYY')}
          style={{
            color: white,
            background: 'rgb(38, 84, 124)'
          }}
        />
      </StyleRoot>
    );
  }

  getYearsOld() {
    const {now} = this.state;
    const {year, ...birthday} = cookie.getJSON('birthday');

    return (
      (now.year() - year) +
      (moment().format('x') - moment(birthday).format('x')) /
      (moment(birthday).add(1, 'y') - moment(birthday).format('x'))
    ).toFixed(9);
  }

  getMonthEnd() {
    const {now} = this.state;
    const monthEnd = moment().endOf('month');
    const diff = monthEnd.format('x') - now.format('x');
    const diffTime = moment.duration(diff);

    return diffTime.asDays().toFixed(9);
  }

  getSeasonEnd() {
    const {now} = this.state;
    const seasonEnd = moment().endOf('quarter');
    const diff = seasonEnd.format('x') - now.format('x');
    const diffTime = moment.duration(diff);

    return diffTime.asMonths().toFixed(9);
  }

  getYearEnd() {
    const {now} = this.state;
    const yearEnd = moment().endOf('year');
    const diff = yearEnd.format('x') - now.format('x');
    const diffTime = moment.duration(diff);

    return diffTime.asDays().toFixed(9);
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
