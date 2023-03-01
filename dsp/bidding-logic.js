function log(label, o) {
  console.log(label, JSON.stringify(o, ' ', ' '));
}

function generateBid(
  interestGroup,
  auctionSignals,
  perBuyerSignals,
  trustedBiddingSignals,
  browserSignals
) {
  // log('generateBid', {
  //   interestGroup,
  //   auctionSignals,
  //   perBuyerSignals,
  //   trustedBiddingSignals,
  //   browserSignals,
  // });
  const baseUrlForDebug = "https://adigupt09.github.io/fledge-chrome-demo/dsp"
  const lossAuctionPath = "/auction_loss.json"
  const winAuctionPath = "/auction_win.json"
  const winningBidQueryParam = "winningBid=${winningBid}"
  const madeWinningBidQueryParam = "madeWinningBid=${madeWinningBid}"
  const highestScoringOtherBidQueryParam = "highestScoringOtherBid=${highestScoringOtherBid}"
  const madeHighestScoringOtherBidQueryParam = "madeHighestScoringOtherBid=${madeHighestScoringOtherBid}"
  // const topLevelWinningBidQueryParam = "topLevelWinningBid=${topLevelWinningBid}"
  // const topLevelMadeWinningBidQueryParam = "topLevelMadeWinningBid=${topLevelMadeWinningBid}"
  const igNameQueryParam = "igName=" + interestGroup.name;
  const rejectReasonQueryparam = "rejectReason=${rejectReason}"
  const perBuyerSignalsQueryParams = "pbs=" + JSON.stringify(perBuyerSignals)
  const trustedBiddingSignalsQueryParams = "tbs=" + JSON.stringify(trustedBiddingSignals)
  const auctionSignalsQueryParams = "auctionSignals=" + JSON.stringify(auctionSignals);
  const browserSignalsQueryParams = "browserSignals=" + JSON.stringify(browserSignals)
  const queryParams = igNameQueryParam + "&" + winningBidQueryParam + "&" + madeWinningBidQueryParam + "&" + highestScoringOtherBidQueryParam + "&" + madeHighestScoringOtherBidQueryParam + "&" + perBuyerSignalsQueryParams + "&" + trustedBiddingSignalsQueryParams + "&" + browserSignalsQueryParams + "&" + rejectReasonQueryparam + "&" + auctionSignalsQueryParams
  const queryParamsBeforeBid = "?" + "stage=PreBidding&" + queryParams
  var lossAuctionUrl = baseUrlForDebug + lossAuctionPath + queryParamsBeforeBid;
  // log("lossAuctionUrl:", lossAuctionUrl);
  var winAuctionUrl = baseUrlForDebug + winAuctionPath + queryParamsBeforeBid;
  // log("winAuctionUrl:", winAuctionUrl);
  forDebuggingOnly.reportAdAuctionLoss(lossAuctionUrl);
  forDebuggingOnly.reportAdAuctionWin(winAuctionUrl);

  const bid = Math.floor(Math.random() * 100, 10)
  const igBid = "igBid=" + bid

  const queryParamsAfterBid = "?" + "stage=PostBidding&" + igBid + "&" + queryParams
  lossAuctionUrl = baseUrlForDebug + lossAuctionPath + queryParamsAfterBid;
  // log("lossAuctionUrl:", lossAuctionUrl);
  winAuctionUrl = baseUrlForDebug + winAuctionPath + queryParamsAfterBid;
  // log("winAuctionUrl:", winAuctionUrl);
  forDebuggingOnly.reportAdAuctionLoss(lossAuctionUrl);
  forDebuggingOnly.reportAdAuctionWin(winAuctionUrl);
  log("lossAuctionUrl.length:", lossAuctionUrl.length);
  log("winAuctionUrl.length:", winAuctionUrl.length);
  forDebuggingOnly.reportAdAuctionLoss(lossAuctionUrl);
  forDebuggingOnly.reportAdAuctionWin(winAuctionUrl)
  log("forDebuggingOnlyTest.auction_win_url:", forDebuggingOnlyTest.auction_win_url);
  log("forDebuggingOnlyTest.auction_loss_url", forDebuggingOnlyTest.auction_loss_url);
  return {
    ad: interestGroup.ads[0].metadata.type,
    bid,
    render: interestGroup.ads[0].renderUrl,
  };
}

function reportWin(
  auctionSignals,
  perBuyerSignals,
  sellerSignals,
  browserSignals
) {
  log('reportWin', {
    auctionSignals,
    perBuyerSignals,
    sellerSignals,
    browserSignals,
  });
  sendReportTo(browserSignals.interestGroupOwner + '/dsp/reporting_success.json');
}


const forDebuggingOnly = {}

forDebuggingOnly.auction_win_url = undefined;
forDebuggingOnly.auction_loss_url = undefined;

forDebuggingOnly.reportAdAuctionLoss = function (url) {
  forDebuggingOnly.auction_loss_url = url;
}

forDebuggingOnly.reportAdAuctionWin = function (url) {
  forDebuggingOnly.auction_win_url = url;
}

function generateBidWithDebugEvents(
  interestGroup,
  auctionSignals,
  perBuyerSignals,
  trustedBiddingSignals,
  browserSignals
) {

  var generateBidResponse = generateBid(interestGroup, auctionSignals, perBuyerSignals, trustedBiddingSignals, browserSignals);
  return {
    bidResponse: generateBidResponse,
    debugEvents: {
      auction_loss_url: forDebuggingOnly.auction_win_url,
      auction_win_url: forDebuggingOnly.auction_loss_url
    }
  }
}
