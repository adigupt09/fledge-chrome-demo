const ads = new URL(location.href).searchParams.get('ads');
console.log(ads);

// dsp
const interestGroup = {
  name: ads,
  owner: 'https://[::1]:3008',

  // x-allow-fledge: true
  biddingLogicUrl: 'https://[::1]:3008/dsp/bidding-logic.js',

  // x-allow-fledge: true
  trustedBiddingSignalsUrl:
    'https://[::1]:3008/dsp/bidding_signal.json',
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: 'https://[::1]:3008/dsp/bidding_daily', // not implemented yets
  userBiddingSignals: { user_bidding_signals: 'user_bidding_signals' },
  ads: [
    {
      renderUrl: `https://[::1]:3008/advertiser/${ads}-ad.html`,
      metadata: {
        type: ads,
      },
    },
  ],
};
console.log(interestGroup);

document.addEventListener('DOMContentLoaded', async (e) => {
  console.log(e);
  const kSecsPerDay = 3600 * 24 * 30;
  console.log(await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay));
});
