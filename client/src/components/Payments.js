import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Checkout extends Component {
  render() {
    return (
      <StripeCheckout
        amount={500}
        name="RSSR-Campaign Manager"
        description="Pay $5.00 for five survey credits"
        allowRememberMe
        closed={() => console.log('Thanks for the payment')}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PK}
      >
        <a className="waves-effect waves-light btn">
          <i className="material-icons left">cloud</i>button
        </a>
      </StripeCheckout>
    );
  }
}

export default Checkout;
