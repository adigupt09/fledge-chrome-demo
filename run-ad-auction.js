// dsp
const interestGroup1 = {
  name: "shopping",
  owner: 'https://adigupt09.github.io/fledge-chrome-demo',

  // x-allow-fledge: true
  biddingLogicUrl: 'https://adigupt09.github.io/fledge-chrome-demo/dsp/bidding-logic.js',

  // x-allow-fledge: true
  trustedBiddingSignalsUrl:
    'https://adigupt09.github.io/fledge-chrome-demo/dsp/bidding_signal.json',
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: 'https://adigupt09.github.io/fledge-chrome-demo/dsp/bidding/daily', // not implemented yets
  userBiddingSignals: { user_bidding_signals: 'user_bidding_signals' },
  ads: [
    {
      renderUrl: `https://travel-fledge-demo.glitch.me/assets/shopping.webp`,
      metadata: {
        type: "shopping",
      },
    },
  ],
};

const interestGroup2 = {
  name: "travel",
  owner: 'https://adigupt09.github.io/fledge-chrome-demo',

  // x-allow-fledge: true
  biddingLogicUrl: 'https://adigupt09.github.io/fledge-chrome-demo/dsp/bidding-logic.js',

  // x-allow-fledge: true
  trustedBiddingSignalsUrl:
  'https://adigupt09.github.io/fledge-chrome-demo/dsp/bidding_signal.json',
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: 'https://adigupt09.github.io/fledge-chrome-demo/dsp/bidding/daily', // not implemented yets
  userBiddingSignals: { user_bidding_signals: 'user_bidding_signals' },
  ads: [
    {
      renderUrl: `https://travel-fledge-demo.glitch.me/assets/travel.webp`,
      metadata: {
        type: "travel",
      },
    },
  ],
};

const interestGroup3 = {
  name: "travel-lapsed",
  owner: 'https://adigupt09.github.io/fledge-chrome-demo',

  // x-allow-fledge: true
  biddingLogicUrl: 'https://adigupt09.github.io/fledge-chrome-demo/dsp/bidding-logic.js',

  // x-allow-fledge: true
  trustedBiddingSignalsUrl:
  'https://adigupt09.github.io/fledge-chrome-demo/dsp/bidding_signal.json',
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: 'https://adigupt09.github.io/fledge-chrome-demo/dsp/bidding/daily', // not implemented yets
  userBiddingSignals: { user_bidding_signals: 'user_bidding_signals' },
  ads: [
    {
      renderUrl: `https://travel-fledge-demo.glitch.me/assets/travel.webp?name="travel-lapsed"`,
      metadata: {
        type: "travel-lapsed",
      },
    },
  ],
};

document.addEventListener('DOMContentLoaded', async (e) => {
  const kSecsPerDay = 3600 * 24 * 30;
  console.log(await navigator.joinAdInterestGroup(interestGroup2, kSecsPerDay));
  console.log(await navigator.joinAdInterestGroup(interestGroup1, kSecsPerDay));
  console.log(await navigator.joinAdInterestGroup(interestGroup3, kSecsPerDay));
});



// ssp
const auctionConfig = {
  seller: 'https://adigupt09.github.io/fledge-chrome-demo', // should https & same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl: 'https://adigupt09.github.io/fledge-chrome-demo/ssp/decision-logic.js',

  interestGroupBuyers: [
    // * is not supported yet
    'https://adigupt09.github.io/fledge-chrome-demo',
  ],
  // public for everyone
  auctionSignals: { auction_signals: 'auction_signals' },

  // only for single party
  sellerSignals: { seller_signals: 'seller_signals' },

  // only for single party
  perBuyerSignals: {
    // listed on interestGroupByers
    'https://adigupt09.github.io/fledge-chrome-demo': {
      per_buyer_signals: 'per_buyer_signals',
    },
  },
};

document.addEventListener('DOMContentLoaded', async (e) => {
  console.log("auctionConfig: " + JSON.stringify(auctionConfig, null, 2));
  const adAuctionResult = await navigator.runAdAuction(auctionConfig);
  console.log({ adAuctionResult });
  const query = new URL(location.href).search;
  const frametype = query === '?fencedframe' ? 'fencedframe' : 'iframe';
  console.log(`display ads in <${frametype}>`);
  const $iframe = document.createElement(frametype);
  $iframe.src = adAuctionResult;
  if (frametype === 'fencedframe') {
    $iframe.mode = 'opaque-ads';
  }
  document.body.appendChild($iframe);
});
