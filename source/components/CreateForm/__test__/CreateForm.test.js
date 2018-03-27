import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { CreateForm } from 'components/CreateForm/CreateForm';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


const defaultProps = {
  list: [],
  createItem: ()=>{},
  createChild: ()=>{},
};


describe('> > > COMPONENT - CreateForm', () => {
  it('#create snapshot', () => {
    const output = shallow(
      <CreateForm {...defaultProps} />
    );

    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('#test method: handleCreateItem => no title error', () => {
    const output = shallow(
      <CreateForm {...defaultProps} />
    );

    output.find('.create-item__form-add').simulate('click');
    expect(output.state('error')).toBe('Вы должны ввести название элемента');
    expect(output.instance().renderError()).toBeDefined();
  });

  it('#test method: handleCreateItem => no parent error', () => {
    const output = shallow(
      <CreateForm childPosition {...defaultProps} />
    );

    output.find('.create-item__form-input').simulate(
      'change', { target: { value: 'title' } }
    );
    output.find('.create-item__form-add').simulate('click');
    expect(output.state('error')).toBe('Родитель не найден');
  });

  it('#test method: handleCreateItem => success create Item', () => {
    defaultProps.list = [
      { id: 1 }, { id: 2 },
    ];
    const output = shallow(
      <CreateForm {...defaultProps} />
    );

    output.find('.create-item__form-input').simulate(
      'change', { target: { value: 'title' } }
    );
    expect(output.find('.create-item__form-input').prop('value')).toBe('title');

    output.find('.create-item__form-add').simulate('click');
    expect(output.state('titleValue')).toBe('');
  });

  it('#test method: handleCreateItem => success create Child', () => {
    defaultProps.list = [
      { id: 1 },
      { id: 2, childs: [
        { id: 1 }
      ] },
    ];
    const output = shallow(
      <CreateForm parentId={2} childPosition {...defaultProps} />
    );

    output.find('.create-item__form-input').simulate(
      'change', { target: { value: 'title' } }
    );
    output.find('.create-item__form-add').simulate('click');
    expect(output.state('titleValue')).toBe('');
  });
});
