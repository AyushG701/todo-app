import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './index.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={'loading'} persistor={persistor}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </PersistGate>
  </Provider>,
)
