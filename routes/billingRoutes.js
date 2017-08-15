const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'Sample charge',
      source: req.body.id
    });

    req.user.credits += 5; //modifies user data
    const user = await req.user.save(); //saves the changes we made to database, asynchronous

    res.send(user); //sends back updated user info to us
  });
};
