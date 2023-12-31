import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <App />
    </Provider>
  </React.StrictMode>
);

// компонент <Provider> робить Redux store доступним для будь-яких вкладених компонентів, яким потрібен доступ до сховища Redux
// обертаємо свій кореневий компонент у PersistGate. Це затримує візуалізацію інтерфейсу користувача програми, доки стан не буде отримано та збережено в redux сховищі Localstorage застосунку localhost з ключем 'persist:...'
