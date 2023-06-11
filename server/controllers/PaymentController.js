import Stripe from 'stripe';
import Session from 'express-session';

const stripe = new Stripe('sk_test_51NHAGjBuAoJ2w5QopNPNnAdWTlA43tOCFfgKofUN2CUKOJArtX9KoKqcbMH5c1VTPl9RvBpTelUnnnmL72RBF2OG00YCMEmF01');
const session = new Session();

export const onboardUser = async (req, res) => {
    try {
        console.log("onboardUser")
        //console.log(req.session)
        //console.log(Stripe)

        const account = await stripe.accounts.create({
          type: 'standard',
        });
        console.log("Nach account")
        console.log(account.id)
    
        // Store the ID of the new Standard connected account.
        try {
            //req.sessionID is undefined -> why?
            req.session.accountID = account.id;
        } catch (err) {
            console.log(err)
        }
        //console.log("req.session.accountID: ", req.session.accountID)
    
        const origin = `${req.headers.origin}`;
        console.log("origin: ", origin)
        const accountLink = await stripe.accountLinks.create({
          type: "account_onboarding",
          account: account.id,
          refresh_url: `${origin}/api/payment/onboardUserRefresh`,
          return_url: `${origin}/success.html`,
        });
        console.log("accountLink: ", accountLink)
        console.log("This is the accountLink:", accountLink)
        
        //const body = await res.json()
        //window.location.href = body.url
        res.header("Access-Control-Allow-Origin", "*");
        //res.redirect(accountLink.url);
        res.redirect('https://www.google.com/search?q=google&rlz=1C5CHFA_enDE970DE970&oq=google&aqs=chrome.0.0i67i131i355i433i650j46i67i131i199i433i465i650j0i131i433i512j0i67i131i433i650l2j0i67i650l2j69i60.1018j0j7&sourceid=chrome&ie=UTF-8');
      } catch (err) {
        res.status(500).send({
          error: err.message,
        });
      }
    };

export const onboardUserRefresh = async (req, res) => {
    console.log("refresh", req.session)
    if (!req.session.accountID) {
        res.redirect("/");
        return;
      }
    
      try {
        const { accountID } = req.session;
        const origin = `${req.secure ? "https://" : "http://"}${req.headers.host}`;
    
        const accountLink = await stripe.accountLinks.create({
          type: "account_onboarding",
          account: accountID,
          refresh_url: `${origin}/api/payment/onboardUserRefresh`,
          return_url: `${origin}/success.html`,
        });
    
        res.redirect(303, accountLink.url);
      } catch (err) {
        res.status(500).send({
          error: err.message,
        });
      }
    };