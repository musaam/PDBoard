import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import './App.css';
import PDBoard from './containers/PDBoard/PDBoard';
import PDItem from './containers/PDItem/PDItem';

function App() {

  let routes = (
    <Switch>     
      <Route path="/" exact component={PDBoard} /> 
      <Route path="/pditem" exact component={PDItem} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

export default App;
