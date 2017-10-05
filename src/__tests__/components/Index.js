'use strict';

import React from 'react';
import {mount} from 'enzyme';

import Index from 'components/Index';

it('Index', () => {
  const wrapper = mount(
    <Index />
  );

  expect((/years old/).test(wrapper.text())).toBe(true);
});
