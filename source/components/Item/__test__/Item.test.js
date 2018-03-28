import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Item } from 'components/Item/Item';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


const defaultProps = {
  id: 1,
  open: false,
  title: 'something',
  childs: [],

  setOpenId: jest.fn(),
  resetOpenId: jest.fn(),
  toggleItemChildsCheck: jest.fn(),
  deleteItemAndSetCount: jest.fn(),
};


describe('> > > COMPONENT - Item', () => {
  it('#create snapshot', () => {
    const output = shallow(
      <Item {...defaultProps} />
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('#test method: renderOpenChildBtn', () => {
    const output = shallow(
      <Item {...defaultProps} />
    );

    expect(output.find('.item__open-child-btn').text()).toBe('Создать');
  });

  it('#test method: renderChilds => childs.map()', () => {
    defaultProps.childs = [
      { id: 1 }, { id: 2 },
    ];
    const output = shallow(
      <Item {...defaultProps} />
    );

    expect(output.instance().renderChilds()).toBeDefined();
  });

  it('#test method: getAllCheckChildStatus => all check', () => {
    defaultProps.childs = [
      { id: 1, check: true },
      { id: 2, check: true },
    ];
    const output = shallow(
      <Item {...defaultProps} />
    );

    expect(output.instance().getAllCheckChildStatus()).toBe(true);
  });

  it('#test method: getAllCheckChildStatus => one uncheck', () => {
    defaultProps.childs = [
      { id: 1, check: false },
      { id: 2, check: true },
    ];
    const output = shallow(
      <Item {...defaultProps} />
    );

    expect(output.instance().getAllCheckChildStatus()).toBe(false);
  });

  it('#test method: handleChangeOpenId => setOpenId()', () => {
    const output = shallow(
      <Item {...defaultProps} />
    );

    output.find('.item__open-child-btn').simulate('click');
    expect(output.instance().props.setOpenId.mock.calls.length).toBe(1);
  });

  it('#test method: handleChangeOpenId => resetOpenId()', () => {
    defaultProps.open = true;
    const output = shallow(
      <Item {...defaultProps} />
    );

    output.find('.item__open-child-btn').simulate('click');
    const wrapper = output.instance();
    expect(wrapper.props.resetOpenId.mock.calls.length).toBe(1);
    wrapper.props.resetOpenId.mockReset();
  });

  it('#test method: handleDeleteItem => delete item', () => {
    defaultProps.open = false;
    const output = shallow(
      <Item {...defaultProps} />
    );

    output.find('.item__delete').simulate('click');
    const wrapper = output.instance();
    expect(wrapper.props.deleteItemAndSetCount.mock.calls.length).toBe(1);
    expect(wrapper.props.resetOpenId.mock.calls.length).toBe(0);
    wrapper.props.deleteItemAndSetCount.mockReset();
  });

  it('#test method: handleDeleteItem => delete item && close', () => {
    defaultProps.open = true;
    const output = shallow(
      <Item {...defaultProps} />
    );

    output.find('.item__delete').simulate('click');
    const wrapper = output.instance();
    expect(wrapper.props.deleteItemAndSetCount.mock.calls.length).toBe(1);
    expect(wrapper.props.resetOpenId.mock.calls.length).toBe(1);
  });

  it('#test method: handleCheckAllChilds => check all', () => {
    defaultProps.childs = [
      { id: 1 }, { id: 2 },
    ];
    const output = shallow(
      <Item {...defaultProps} />
    );

    output.find('.item__checked-childs-btn').simulate('click');
    const wrapper = output.instance();
    expect(wrapper.props.toggleItemChildsCheck.mock.calls.length).toBe(1);
    wrapper.props.toggleItemChildsCheck.mockReset();
  });

  it('#test method: handleCheckAllChilds => no items', () => {
    defaultProps.childs = [];
    const output = shallow(
      <Item {...defaultProps} />
    );

    output.find('.item__checked-childs-btn').simulate('click');
    expect(output.instance().props.toggleItemChildsCheck.mock.calls.length).toBe(0);
  });
});
