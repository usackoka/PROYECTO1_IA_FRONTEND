import React, { Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import DefaultLayout from './layout/defaultLayout'

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <DefaultLayout/>
        </Router>
    </Suspense>
  );
};

export default App;