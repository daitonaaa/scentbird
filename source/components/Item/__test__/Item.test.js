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

  setOpenId: ()=>{},
  resetOpenId: ()=>{},
  toggleItemChildsCheck: ()=>{},
  deleteItemAndSetCount: ()=>{},
};


describe('> > > COMPONENT - Item', () => {
  it('#create snapshot', () => {
    const output = shallow(
      <Item childs={[]} {...defaultProps} />
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('#test method: renderChilds => childs.map()', () => {
    const list = [
      { id: 1 }, { id: 2 },
    ];
    const output = shallow(
      <Item childs={list} {...defaultProps} />
    );

    expect(output.instance().renderChilds()).toBeDefined();
  });

  it('#test method: getAllCheckChildStatus => all check', () => {
    const list = [
      { id: 1, check: true },
      { id: 2, check: true },
    ];
    const output = shallow(
      <Item childs={list} {...defaultProps} />
    );

    expect(output.instance().getAllCheckChildStatus()).toBe(true);
  });

  it('#test method: getAllCheckChildStatus => one uncheck', () => {
    const list = [
      { id: 1, check: false },
      { id: 2, check: true },
    ];
    const output = shallow(
      <Item childs={list} {...defaultProps} />
    );

    expect(output.instance().getAllCheckChildStatus()).toBe(false);
  });

  it('#test method: renderOpenChildBtn', () => {
    const output = shallow(
      <Item childs={[]} {...defaultProps} />
    );

    expect(output.find('.item__open-child-btn').text()).toBe('Создать');
  });
});
