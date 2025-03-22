
import App from './App.tsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { store, persistor } from './utils/context/store.ts';
import appRouter from './router/userRouter.tsx';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Toaster
      toastOptions={{
        unstyled: true,
        classNames: {
          error: 'text-red-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
          success: 'text-green-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
          warning: 'text-gray-300 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
          info: 'text-black text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
        },
      }}
    />
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<App />}>
        <RouterProvider router={appRouter} />
      </Suspense>
    </PersistGate>
  </Provider>
);
