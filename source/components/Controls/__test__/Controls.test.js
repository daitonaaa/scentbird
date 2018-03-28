import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Controls } from 'components/Controls/Controls';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


const defaultProps = {
  resetOpenId: jest.fn(),
  getItemsList: jest.fn(),
  uncheckChilds: jest.fn(),
  checkedFirstChilds: jest.fn(),
};


describe('> > > COMPONENT - Controls', () => {
  it('#create snapshot', () => {
    const output = shallow(
      <Controls {...defaultProps} />
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('#test checkedFirstChilds()', () => {
    const output = mount(
      <Controls {...defaultProps} />
    );

    output.find('.controls__btn').first().simulate('click');
    expect(output.prop('checkedFirstChilds').mock.calls.length).toBe(1);
  });

  it('#test uncheckChilds()', () => {
    const output = mount(
      <Controls {...defaultProps} />
    );

    output.find('.controls__btn').at(1).simulate('click');
    expect(output.prop('uncheckChilds').mock.calls.length).toBe(1);
  });

  it('#test method: handleResetList => reset all data', () => {
    const output = mount(
      <Controls {...defaultProps} />
    );

    output.find('.controls__btn + .reset').simulate('click');
    expect(output.prop('resetOpenId').mock.calls.length).toBe(1);
    expect(output.prop('getItemsList').mock.calls.length).toBe(1);
  });
});
