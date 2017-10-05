'use strict';

import React from 'react';
import {mount} from 'enzyme';

import Index from 'components/Index';

it('Index', async () => {
  const wrapper = mount(
    <Index />
  );

  expect((/years old/).test(wrapper.text())).toBe(true);

  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000 / 24);
  });
  expect((/years old/).test(wrapper.text())).toBe(true);

  wrapper.unmount();
});
