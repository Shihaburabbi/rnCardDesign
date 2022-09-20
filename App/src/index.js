// import React from 'react'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { useScreens } from 'react-native-screens'

// import App from './App'
// import Loading from './components/Loading'
// import configureStore from './store'
// import rootSaga from './sagas'

// useScreens()

// const { runSaga, store, persistor } = configureStore()
// runSaga(rootSaga)

// export default () => (
//   <Provider store={store}>
//     <PersistGate loading={<Loading />} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>
// )


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import Root from './navigation';

import configureStore from './store/configureStore';

const store = configureStore();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Provider>
    </>
  );
}
