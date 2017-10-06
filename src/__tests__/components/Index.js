'use strict';

import React from 'react';
import {mount} from 'enzyme';

import Index from 'components/Index';

const wrapper = mount(
  <Index />
);

describe('Index', () => {
  it('# display time', async () => {
    const time = wrapper.find('Time').last().find('font').parents().first().text();

    expect((/[\d]*\.[\d]*/).test(time)).toBe(true);

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000 / 24);
    });

    expect(
      wrapper.find('Time').last().find('font').parents().first().text()
    ).not.toBe(time);
  });

  it('# add birthday', () => {
    const input = () => wrapper.find('AddBirthday').find('Input');

    input().simulate('keyPress');
    input().simulate('keyPress', {
      key: 'Enter'
    });

    expect(input().prop('value')).toBe('');
    input().simulate('change', {
      target: {
        value: '1994／01／33'
      }
    });
    expect(input().prop('value')).toBe('1994／01／33');
    wrapper.find('AddBirthday').find('Button').simulate('click');
    input().simulate('change', {
      target: {
        value: '1994／01／06'
      }
    });
    expect(input().prop('value')).toBe('1994／01／06');
    wrapper.find('AddBirthday').find('Button').simulate('click');
  });

  it('# display birthday time', async () => {
    const time = wrapper.find('Time').first().find('font').parents().first().text();

    expect((/[\d]*\.[\d]*/).test(time)).toBe(true);

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000 / 24);
    });

    expect(
      wrapper.find('Time').last().find('font').parents().first().text()
    ).not.toBe(time);
  });

  it('# unmount', () => {
    wrapper.unmount();
  });
});
