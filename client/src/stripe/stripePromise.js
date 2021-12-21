import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51K8VhSHom6BnqbDMyyxBlTqg8zyrxNcs9D9SQllnekTpGo32SwPjWiXEcDP4xm3o32uuHlvGFpCKzbrlpiTE3F0Z00vXWTFb9B"
);

export default stripePromise;
