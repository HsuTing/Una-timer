'use strict';

import * as layouyStyle from 'cat-components/lib/layout';

export const root = {
  display: 'grid',
  gridTemplateColumns: '25% 25% 25% 25%',
  width: '100vw',
  height: '100vh',
  textAlign: 'center',
  ...layouyStyle.tablet({
    gridTemplateColumns: '50% 50%'
  }),
  ...layouyStyle.phone({
    gridTemplateColumns: '100%'
  })
};
