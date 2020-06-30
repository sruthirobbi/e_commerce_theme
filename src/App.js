import React from 'react';
import './App.css';
import Main from '../src/components/Main/Main';
import {CounterProvider} from './components/Context/Context';
import {AuthProvider} from './components/Context/AuthContext';
import {
  Elements,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_TEST_STRIPE_API_KEY);

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
      <AuthProvider>
      <CounterProvider>
        <Main/>
      </CounterProvider>
      </AuthProvider>
      </Elements>
    </div>
  );
}

export default App;
