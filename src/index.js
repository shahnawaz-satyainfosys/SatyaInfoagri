import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './Main';
import store from './store';
import { Provider } from 'react-redux';
import 'helpers/initFA';

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main>
        <App />
      </Main>
    </Provider>
  </React.StrictMode>,
  document.getElementById('main')
);
