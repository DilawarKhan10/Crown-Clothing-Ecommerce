import {loadStripe} from '@stripe/stripe-js';
console.log('dilawar',process.env)
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);