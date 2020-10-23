import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_T22Kz35QKoDJY6dvpCRCfeiG00HFCSyvhB');

const Product = () => {
  const handleClick = async (event) => {
    const stripe = await stripePromise;

    const response = await fetch('/api/create-checkout-session', { method: 'POST'});
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error.message);
    }

  }
  return (
    <>
      <h1>Product Page</h1>
      <button role="link" onClick={handleClick}>Checkout</button>
    </>
  )
}

export default Product;