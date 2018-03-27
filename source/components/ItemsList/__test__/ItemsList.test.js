import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ItemsList } from 'components/ItemsList/ItemsList';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe('> > > COMPONENT - ItemsList', () => {
  it('#create snapshot', () => {
    const output = shallow(
      <ItemsList
        list={[]}
        count={0}
        openedItem={0}
      />
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('#test render items && render count prop', () => {
    const list = [
      { id: 1 }, { id: 2 }, { id: 3 }
    ];
    const output = shallow(
      <ItemsList
        count={21}
        openedItem={0}
        list={list}
      />
    );

    expect(output.find('.items-list__count')).toBeDefined();
    expect(output.find('.items-list__count span').text()).toBe('21');
  });
});
