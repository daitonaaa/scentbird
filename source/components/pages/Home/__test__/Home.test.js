import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Home } from 'components/pages/Home/Home';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe('> > > COMPONENT - Home', () => {
  it('#create snapshot', () => {
    const output = shallow(
      <Home
        errorText=""
        request={false}
        getItemsList={()=>{}}
      />
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('#test render func => renderError', () => {
    const output = shallow(
      <Home
        errorText="something"
        request={false}
        getItemsList={()=>{}}
      />
    );

    expect(output.instance().renderError()).toBeDefined();
  });
});
