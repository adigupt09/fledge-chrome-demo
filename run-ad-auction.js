// dsp
const interestGroup1 = {
  name: "shopping",
  owner: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io',

  // x-allow-fledge: true
  biddingLogicUrl: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/bidding',

  // x-allow-fledge: true
  trustedBiddingSignalsUrl:
    'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/bidding/trusted',
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/bidding/daily', // not implemented yets
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
  owner: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io',

  // x-allow-fledge: true
  biddingLogicUrl: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/bidding',

  // x-allow-fledge: true
  trustedBiddingSignalsUrl:
    'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/bidding/trusted',
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/bidding/daily', // not implemented yets
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
  owner: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io',

  // x-allow-fledge: true
  biddingLogicUrl: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/bidding',

  // x-allow-fledge: true
  trustedBiddingSignalsUrl:
    'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/bidding/trusted',
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/bidding/daily', // not implemented yets
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
  seller: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io', // should https & same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl: 'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io/scoring',

  interestGroupBuyers: [
    // * is not supported yet
    'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io',
  ],
  // public for everyone
  auctionSignals: { auction_signals: 'auction_signals' },

  // only for single party
  sellerSignals: { seller_signals: 'seller_signals' },

  // only for single party
  perBuyerSignals: {
    // listed on interestGroupByers
    'https://079bc9d4-3268-4e14-961c-907893d65c8e.mock.pstmn.io': {
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
