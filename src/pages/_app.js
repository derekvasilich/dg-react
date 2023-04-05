import { useState, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import store from '@/store'
import ErrorBoundary from '@/components/errorBoundary';
import '@/styles/globals.css'
import { selectException } from '@/store/vehicleSlice';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  )
}
