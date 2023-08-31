import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './AuthProvider';
import resources from './i18n/locales';

import View from './View';

const App = async () => {
  // const [count, setCount] = useState(0)

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({ resources, fallbackLng: 'ru' });

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <View />
        <ToastContainer hideProgressBar={true} />
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;
