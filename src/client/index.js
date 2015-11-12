
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const ReactDOM = require('react-dom');
  const Home = require('../components/Home');

  ReactDOM.render(
    <Home/>,
    document.getElementById('content')
  );
});
