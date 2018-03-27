import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Child } from 'components/Child/Child';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


const defaultProps = {
  id: 1,
  check: false,
  title: 'something',
  parentId: 1,

  setCheckChildStatus: ()=>{},
  deleteItemChildAndSetCount: ()=>{},
};


describe('> > > COMPONENT - Child', () => {
  it('#create snapshot', () => {
    const output = shallow(
      <Child {...defaultProps} />
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('#test render check text', () => {
    const output = shallow(
      <Child {...defaultProps} />
    );

    expect(output.find('.child__check-btn').text()).toBe('Выделить');
  });

  it('#test method: handleDeleteItemChild => delete item', () => {
    const output = mount(
      <Child {...defaultProps} />
    );

    const wrapper = output.instance();
    const spy = jest.spyOn(wrapper, 'handleDeleteItemChild');
    wrapper.forceUpdate();
    output.find('.child__delete-btn').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('#test method: handleToggleCheck => toggle check status', () => {
    const output = mount(
      <Child {...defaultProps} />
    );

    const wrapper = output.instance();
    const spy = jest.spyOn(wrapper, 'handleToggleCheck');
    wrapper.forceUpdate();
    output.find('.child__check-btn').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
