import { useEffect } from 'react';
import '../styles/globals.css'
import { Provider } from 'react-redux';
import store from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { SessionProvider } from "next-auth/react"
const persistor = persistStore(store);
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  return <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
      <SessionProvider session={session}>
        <Component {...pageProps} />;
      </SessionProvider>
    {/* </PersistGate> */}
  </Provider>
}

export default MyApp;