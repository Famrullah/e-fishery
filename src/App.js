import React from 'react';
import { Provider } from 'react-redux';
import Store from './store/store';
import Comodity from './pages/comodity/comodity'


function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Comodity/>
      </div>
    </Provider>
  );
}

export default App;
  // useEffect(() => {
  //   const SteinStore = require("stein-js-client");
  //   const store = new SteinStore(
  //     "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list/"
  //   );
  //   store.read("", { limit: 10}).then(data => {
  //     console.log(data);
  //   });
  // });
