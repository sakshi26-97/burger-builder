import React from 'react';
// shallow --> it renders component but not deeply rendered (ie it will render NavigationItems but not render it's child's child....)
import { configure, shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  // it describes each individual test
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});