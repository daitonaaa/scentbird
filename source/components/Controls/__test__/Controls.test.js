import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Controls } from 'components/Controls/Controls';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe('> > > COMPONENT - Controls', () => {
  it('#create snapshot', () => {
    const output = shallow(
      <Controls
        resetOpenId={()=>{}}
        getItemsList={()=>{}}
        uncheckChilds={()=>{}}
        checkedFirstChilds={()=>{}}
      />
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
