import fetch from 'node-fetch';
import cheerio  from 'cheerio';

const url = 'https://money.cnn.com/quote/quote.html?symb=';
export const tickers = [];

const StockTicker = function (ticker,pClose, todayOpen, dayRange, vol, avgVol, mrktCap, earnGrowPast, earnGrowCurr,earnGrowN5y, revGrow, peRatio, priceToSales,priceToBook,reportDate, epsCurrQuart, annRev, annProfit, profMargin) {
    this.ticker = ticker;
    this.previous_Close = pClose;
    this.day_Open = todayOpen;
    this.days_Range = dayRange;
    this.volume = vol;
    this.ave_Vol_3Mons = avgVol;
    this.market_Cap = mrktCap;
    this.earnGrowth_PastYear = earnGrowPast;
    this.earnGrowth_CurrYear = earnGrowCurr;
    this.earnGrowth_Next_5yrs = earnGrowN5y;
    this.revenueGrowth_PastYear = revGrow;
    this.pe_Ratio = peRatio;
    this.price_to_Sales = priceToSales;
    this.price_to_Book = priceToBook;
    this.next_reportDate = reportDate;
    this.forcasted_EPS = epsCurrQuart;
    this.annualRevenue_PastYear = annRev;
    this.annualProfit_PastYear = annProfit;
    this.profit_Margin = profMargin;
  };

export const searchCache = {};


export function tickerChange(ticker) {

        if (searchCache[ticker]) {
            // console.log(`Serving ${ticker} from cache.`);
            // console.log(searchCache);
            return Promise.resolve(searchCache[ticker])
        }
        return fetch(`${url}${ticker}`)
            .then(res => res.text())
            .then(body => {
                const pChanges = [];
                const $ = cheerio.load(body)
                $('.wsod_quoteDataPoint').map((i, elem) => {
                    const blob = $(elem);
                    const arr =  blob.text();
                    pChanges.push(arr);
                })
                return pChanges
            })
            .then((res) => {
                const todaysMovement = res.slice(0,13);
                const coFinancials = res.slice(-5);
                const sym = ticker;
                const fullDay = [sym, ...todaysMovement,...coFinancials];
                const tickerII = new StockTicker(...fullDay)
                tickers.push(tickerII)
                searchCache[ticker] = tickers; 
                return tickers;
            })
    };
    