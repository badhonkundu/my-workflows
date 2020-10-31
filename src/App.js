import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './css/App.css';
import Header from './components/header';
import Chrome from './components/chrome';

import reducer from './store/reducers/index'

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Chrome />
      </Provider>
    </div>
  );
}

export default App;
