import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NewContactForm, Contacts, EditContact } from './components';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Contacts} />
        <Route exact path='/contacts/edit/:id' component={EditContact} />
        <Route exact path='/contacts/new' component={NewContactForm} />
      </Switch>
    );
  }
}

export default Routes;
