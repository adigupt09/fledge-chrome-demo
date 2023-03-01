function log(label, o) {
  console.log(label, JSON.stringify(o, ' ', ' '));
}

function scoreAd(
  adMetadata,
  bid,
  auctionConfig,
  trustedScoringSignals,
  browserSignals
) {
  // log('scoreAd', {
  //   adMetadata,
  //   bid,
  //   auctionConfig,
  //   trustedScoringSignals,
  //   browserSignals,
  // });
  var score = bid;
  var rejectReason = "";
  if(adMetadata == 'travel-lapsed'){
    score = 0;
    rejectReason = "blocked-by-publisher"
  }
  const baseUrlForDebug = "https://adigupt09.github.io/fledge-chrome-demo/ssp"
  const lossAuctionPath = "/auction_loss.json"
  const winAuctionPath = "/auction_win.json"
  const winningBidQueryParam = "winningBid=${winningBid}"
  const madeWinningBidQueryParam = "madeWinningBid=${madeWinningBid}"
  const highestScoringOtherBidQueryParam = "highestScoringOtherBid=${highestScoringOtherBid}"
  const madeHighestScoringOtherBidQueryParam = "madeHighestScoringOtherBid=${madeHighestScoringOtherBid}"
  // const topLevelWinningBidQueryParam = "topLevelWinningBid=${topLevelWinningBid}"
  // const topLevelMadeWinningBidQueryParam = "topLevelMadeWinningBid=${topLevelMadeWinningBid}"
  const adMetadataQueryParam = "adMetadata=" + adMetadata;
  const adScoreQueryParam = "score=" + score;
  const rejectReasonQueryparam = "rejectReason=" + rejectReason
  const auctionConfigQueryParams = "pbs=" + JSON.stringify(auctionConfig)
  const tssQueryParams = "tbs=" + JSON.stringify(trustedScoringSignals)
  const browserSignalsQueryParams = "browserSignals=" + JSON.stringify(browserSignals)
  const queryParams = adMetadataQueryParam + "&" + winningBidQueryParam + "&" + madeWinningBidQueryParam + "&" + highestScoringOtherBidQueryParam + "&" + madeHighestScoringOtherBidQueryParam + "&" + auctionConfigQueryParams + "&" + tssQueryParams + "&" + browserSignalsQueryParams + "&" + rejectReasonQueryparam
  const queryParamsPostScoring = "?" + "stage=PostScoring&" + adScoreQueryParam + "&" + queryParams
  var lossAuctionUrl = baseUrlForDebug + lossAuctionPath + queryParamsPostScoring;
  // log("lossAuctionUrl:", lossAuctionUrl);
  var winAuctionUrl = baseUrlForDebug + winAuctionPath + queryParamsPostScoring;
  // log("winAuctionUrl:", winAuctionUrl);
  forDebuggingOnly.reportAdAuctionLoss(lossAuctionUrl);
  forDebuggingOnly.reportAdAuctionWin(winAuctionUrl);
  // log("lossAuctionUrl.length:", lossAuctionUrl.length);
  // log("winAuctionUrl.length:", winAuctionUrl.length);
  return score;
}

function reportResult(auctionConfig, browserSignals) {
  log('reportResult', { auctionConfig, browserSignals });
  sendReportTo(auctionConfig.seller + '/ssp/reporting_success.json');
  return {
    success: true,
    signalsForWinner: { signalForWinner: 1 },
    reportUrl: auctionConfig.seller + '/report_seller',
  };
}
