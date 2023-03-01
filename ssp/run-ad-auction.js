// ssp
const auctionConfig = {
  seller: 'https://[::1]:3008', // should https & same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl: 'https://[::1]:3008/ssp/decision-logic.js',

  interestGroupBuyers: [
    // * is not supported yet
    'https://[::1]:3008',
  ],
  // public for everyone
  auctionSignals: { auction_signals: 'auction_signals' },

  // only for single party
  sellerSignals: { seller_signals: 'seller_signals' },

  // only for single party
  perBuyerSignals: {
    // listed on interestGroupByers
    'https://[::1]:3008': {
      per_buyer_signals: 'per_buyer_signals',
    },
  },
};

document.addEventListener('DOMContentLoaded', async (e) => {
  console.log(e);
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
