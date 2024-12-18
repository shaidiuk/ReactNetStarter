import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <>
    <h1>Hello, world!</h1>
        <p>This is a starter project using .NET 7 and React with TypeScript. It features functional components, routing and utilizes Redux.</p>
        <p>This app was created by me in September 2023 over 1 day, without any recent experience in React.js functional programming and no prior experience with TypeScript.</p>
        <p>Go to the Counter tab to view the router and counter states via Redux.</p>
  </>
);

export default connect()(Home);
