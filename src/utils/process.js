export const calculateData = (item) => {
    const { strike_price, type, bid, ask, long_short } = item;

    let breakEvenPoint;
    let maxLoss;
    let maxProfit;

    if (type === "Call") {
        if (long_short === "long") {
            breakEvenPoint = strike_price + ask;
            maxLoss = ask;  // Premium paid is the max loss
            maxProfit = Infinity;  // Potential profit is unlimited
        } else {
            breakEvenPoint = strike_price + bid;
            maxProfit = bid;  // Premium received is the max profit
            maxLoss = Infinity;  // If stock goes very high, the loss is unlimited
        }
    } else if (type === "Put") {
        if (long_short === "long") {
            breakEvenPoint = strike_price - ask;
            maxLoss = ask;  // Premium paid is the max loss
            maxProfit = strike_price - ask;  // Max profit occurs if the stock goes to 0
        } else {
            breakEvenPoint = strike_price - bid;
            maxProfit = bid;  // Premium received is the max profit
            maxLoss = strike_price - bid;  // Max loss if stock falls to zero
        }
    }

    return { maxLoss, maxProfit, breakEvenPoint };
}
