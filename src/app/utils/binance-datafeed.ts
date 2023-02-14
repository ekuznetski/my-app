import {
  ErrorCallback,
  HistoryCallback,
  IDatafeedChartApi,
  IDatafeedQuotesApi,
  IExternalDatafeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  QuotesCallback,
  ResolutionString,
  ResolveCallback, SearchSymbolsCallback, SubscribeBarsCallback,
  SymbolResolveExtension, Timezone
} from "../../assets/charting_library";

export class BinanceDatafeed implements IDatafeedChartApi, IExternalDatafeed, IDatafeedQuotesApi {
  private readonly debug: boolean = false;
  private readonly binanceHost: string = "https://fapi.binance.com"
  private symbols: any[] = [];
  private binanceSocket: WebSocket | undefined;
  constructor(debug?: boolean) {
    this.debug = debug ?? false
  }

  getQuotes(symbols: string[], onDataCallback: QuotesCallback, onErrorCallback: (msg: string) => void): void {
  }

  onReady(callback: OnReadyCallback): void {
    this.binanceSymbols()
      .then((symbols) => {
        this.symbols = symbols;
        // this.symbols.push();
        callback({
          supports_marks: true,
          supports_timescale_marks: true,
          supports_time: true,
          supported_resolutions: [
            "1" as ResolutionString,
            "3" as ResolutionString,
            "5" as ResolutionString,
            "15" as ResolutionString,
            "30" as ResolutionString,
            "60" as ResolutionString,
            "120" as ResolutionString,
            "240" as ResolutionString,
            "360" as ResolutionString,
            "480" as ResolutionString,
            "720" as ResolutionString,
            "1D" as ResolutionString,
            "3D" as ResolutionString,
            "1W" as ResolutionString,
            "1M" as ResolutionString,
          ],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: SearchSymbolsCallback): void {
    userInput = userInput.toUpperCase();
    onResult(
      this.symbols
        .filter((symbol: { symbol: string | string[]; }) => {
          return symbol.symbol.indexOf(userInput) >= 0;
        })
        .map((symbol: { symbol: any; baseAsset: any; quoteAsset: any; }) => {

          return {
            symbol: symbol.symbol,
            full_name: symbol.symbol,
            description: symbol.baseAsset + symbol.quoteAsset,
            ticker: symbol.symbol,
            exchange: 'BINANCE',
            type: 'CRYPTO'
          };
        })
    );
  }

  subscribeBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, onTick: SubscribeBarsCallback, listenerGuid: string, onResetCacheNeededCallback: () => void): void {
    const interval = {
      1: "1m",
      3: "3m",
      5: "5m",
      15: "15m",
      30: "30m",
      60: "1h",
      120: "2h",
      240: "4h",
      360: "6h",
      480: "8h",
      720: "12h",
      D: "1d",
      "1D": "1d",
      "3D": "3d",
      W: "1w",
      "1W": "1w",
      M: "1M",
      "1M": "1M",
    }[resolution as string];
    this.debug && console.log("👉 subscribeBars:", listenerGuid, symbolInfo, interval);
    if (symbolInfo.name.includes("/")) {
      const baseName = symbolInfo.name.split('/')[0].toLowerCase()
      const quoteName = symbolInfo.name.split('/')[1].toLowerCase()
      this.binanceSocket = new WebSocket(
        `wss://fstream.binance.com/stream?streams=${baseName}@kline_${interval}/${quoteName}@kline_${interval}`
      );

      let lastBaseKline = {} as any
      let lastQuoteKline = {} as any
      this.binanceSocket.onmessage = (event) => {
        let kline = JSON.parse(event.data);
        if (kline.data.s === baseName.toUpperCase()) {
          lastBaseKline = kline.data.k;
        }
        if (kline.data.s === quoteName.toUpperCase()) {
          lastQuoteKline = kline.data.k;
        }

        if (lastQuoteKline.t === lastBaseKline.t) {
          onTick({
            time: kline.data.E,
            close: lastBaseKline.c / lastQuoteKline.c,
            open: lastBaseKline.o / lastQuoteKline.o,
            high: lastBaseKline.h / lastQuoteKline.h,
            low: lastBaseKline.l / lastQuoteKline.l,
            volume: lastBaseKline.v / lastQuoteKline.v,
          })

        }

      }

    } else {
      this.binanceSocket = new WebSocket(
        `wss://fstream.binance.com/ws/${symbolInfo.name.toLowerCase()}@kline_${interval}`
      );
      let volume = 0
      this.binanceSocket.onmessage = (event) => {
        let message = JSON.parse(event.data);
        if (message.k.x) {
          volume = 0
        }
        if (message.k.t !== 0) {
          onTick({
            time: message.E,
            close: parseFloat(message.k.c),
            open: parseFloat(message.k.o),
            high: parseFloat(message.k.h),
            low: parseFloat(message.k.l),
            volume: volume > 0 ? parseInt(message.k.v) - volume : parseInt(message.k.v)
          })
          volume = parseInt(message.k.v)
        }
      }
    }
  }

  subscribeQuotes(symbols: string[], fastSymbols: string[], onRealtimeCallback: QuotesCallback, listenerGUID: string): void {
  }

  unsubscribeBars(listenerGuid: string): void {
    if(!this.binanceSocket?.CLOSED) {
      this.binanceSocket?.close()
    }

  }

  unsubscribeQuotes(listenerGUID: string): void {
  }

  getBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, periodParams: PeriodParams, onResult: HistoryCallback, onError: ErrorCallback): void {
    let from = periodParams.from;
    let to = periodParams.to;
    let firstDataRequest = periodParams.firstDataRequest;

    this.debug && console.log("👉 getBars:", symbolInfo.name, resolution);
    this.debug && console.log("First:", firstDataRequest);

    const interval = {
      1: "1m",
      3: "3m",
      5: "5m",
      15: "15m",
      30: "30m",
      60: "1h",
      120: "2h",
      240: "4h",
      360: "6h",
      480: "8h",
      720: "12h",
      "1D": "1d",
      "3D": "3d",
      W: "1w",
      "1W": "1w",
      M: "1M",
      "1M": "1M",
    }[resolution as string];

    if (!interval) {
      onError("Invalid interval");
    }

    let totalKlines: any = [];

    const finishKlines = () => {
      if (this.debug) {
        console.log("📊:", totalKlines.length);
      }

      if (totalKlines.length === 0) {
        onResult([], {noData: true});
      } else {
        onResult(
          totalKlines.map((kline: any) => {
            return {
              time: kline[0],
              close: parseFloat(kline[4]),
              open: parseFloat(kline[1]),
              high: parseFloat(kline[2]),
              low: parseFloat(kline[3]),
              volume: parseInt(kline[5]),
            };
          }),
          {
            noData: false,
          }
        );
      }
    };

    const getKlines = (from: any, to: any) => {
      this.binanceKlines(symbolInfo.name, interval as string, from, to, 500)
        .then((klines) => {
          totalKlines = totalKlines.concat(klines);
          if (klines.length === 500) {
            from = klines[klines.length - 1][0] + 1;
            getKlines(from, to);
          } else {
            finishKlines();
          }
        })
        .catch((err) => {
          console.error(err);
          onError("Some problem");
        });
    };

    from *= 1000;
    to *= 1000;

    getKlines(from, to);
  }

  resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback, extension?: SymbolResolveExtension): void {
    this.debug && console.log("👉 resolveSymbol:", symbolName);
    symbolName = symbolName.replace('BINANCE:','').replace('BINANCE:','')
    if (symbolName.includes('/')) {
      this.addPairSymbol(symbolName)
    }

    function pricescale(symbol: any) {
      for (let filter of symbol.filters) {
        if (filter.filterType === "PRICE_FILTER") {
          return Math.round(1 / parseFloat(filter.tickSize));
        }
      }
      return 1;
    }

    for (let symbol of this.symbols) {

      if (symbol.symbol === symbolName) {
        this.debug && console.log("👉 found symbol:", symbolName);
        setTimeout(() => {
          onResolve({
            name: symbol.symbol,
            full_name: symbol.symbol,
            description: symbol.baseAsset + symbol.quoteAsset,
            ticker: symbol.symbol,
            exchange: 'BINANCE',
            type: 'CRYPTO',
            pricescale: pricescale(symbol),
            session: "24x7",
            minmov: 1,
            volume_precision: 1,
            data_status: 'streaming',
            timezone: "UTC" as Timezone,
            has_intraday: true,
            has_daily: true,
            has_weekly_and_monthly: true,
          } as LibrarySymbolInfo);

        }, 0);

        return;
      }
    }

    onError("not found");
  }

  getServerTime(callback: (arg0: number) => void) {
    this.debug && console.log("=====getServerTime running");
    this.binanceServerTime()
      .then((time) => {
        callback(Math.floor(time / 1000));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addPairSymbol(symbolName: string) {
    const base = this.symbols.filter((s: { symbol: string; }) => s.symbol === symbolName.split('/')[0])[0]
    const quote = this.symbols.filter((s: { symbol: string; }) => s.symbol === symbolName.split('/')[1])[0]
    let pair = JSON.parse(JSON.stringify(base))
    pair.symbol = symbolName
    pair.pair = symbolName
    pair.baseAsset = base.baseAsset
    pair.quoteAsset = quote.baseAsset
    this.symbols = [...this.symbols, pair]
  }


  binanceServerTime() {
    return fetch(this.binanceHost + "/fapi/v1/time")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return json.serverTime;
      });
  }

  binanceSymbols() {
    return fetch(this.binanceHost + "/fapi/v1/exchangeInfo")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return json.symbols;
      });
  }

  binanceKlines(symbol: string, interval: string, startTime: string, endTime: string, limit: number) {
    if (symbol.includes("/")) {
      this.debug && console.log("👉 Kline Pairs:", symbol);
      const baseSymbol = symbol.split("/")[0]
      const quoteSymbol = symbol.split("/")[1]
      const success = (res: any) => (res.ok ? res.json() : Promise.resolve({}));
      const base = fetch(
        `${this.binanceHost}/fapi/v1/klines?symbol=${baseSymbol.toUpperCase()}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&limit=${limit}`
      ).then(success).catch(err => console.error(err));

      const quote = fetch(
        `${this.binanceHost}/fapi/v1/klines?symbol=${quoteSymbol.toUpperCase()}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&limit=${limit}`
      ).then(success).catch(err => console.error(err));
      // todo: catch error from binance ?
      return Promise.all([base, quote])
        .then(([baseData, quoteData]) => {
          let kData: any = []
          baseData.forEach((entry: any, index: number) => {
            kData.push([
              entry[0],
              entry[1] / quoteData[index][1],
              entry[2] / quoteData[index][2],
              entry[3] / quoteData[index][3],
              entry[4] / quoteData[index][4],
              entry[5] + quoteData[index][5],
            ]);
          });
          return kData
        });
    } else {
      const url =
        this.binanceHost +
        "/fapi/v1/klines" +
        "?symbol=".concat(symbol) +
        "&interval=".concat(interval) +
        "&limit=".concat(limit.toString()) +
        "&startTime=".concat(startTime) +
        "&endTime=".concat(endTime);

      return fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          return json;
        });
    }
  }

}
