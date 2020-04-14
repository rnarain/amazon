// Link.react.test.js
import React from 'react';
import Signup from './Signup';
import { configure , shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// it('should render correctly', () => {
//   const component = mount( <Link page="http://www.twitter.com">Twitter</Link>);
//   expect(component).toMatchSnapshot();
// });


// import React from 'react';
// import ReactDOM from 'react-dom';
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('renders without crashing', () => {
  shallow(<Signup />);
 });