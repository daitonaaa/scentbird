import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Home } from 'components/pages/Home/Home';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


const defaultProps = {
  errorText: '',
  request: false,
  getItemsList: jest.fn(),
}


describe('> > > COMPONENT - Home', () => {
  it('#test fetch => componentDidMount', () => {
    const output = shallow(
      <Home {...defaultProps} />
    );

    expect(output.instance().props.getItemsList.mock.calls.length).toBe(1);
  });

  it('#create snapshot', () => {
    const output = shallow(
      <Home {...defaultProps} />
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('#test render func => renderError', () => {
    defaultProps.errorText = 'something';
    const output = shallow(
      <Home {...defaultProps} />
    );

    expect(output.instance().renderError()).toBeDefined();
  });
});
