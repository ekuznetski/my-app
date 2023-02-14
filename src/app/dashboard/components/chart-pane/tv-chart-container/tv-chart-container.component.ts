import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  LanguageCode,
  ResolutionString,
  widget
} from "@assets/charting_library";
import {Subscription} from "rxjs";
import {BinanceDatafeed} from "@app/utils/binance-datafeed";

@Component({
  selector: 'app-tv-chart-container',
  templateUrl: './tv-chart-container.component.html',
  styleUrls: ['./tv-chart-container.component.css']
})
export class TvChartContainerComponent implements OnDestroy, AfterViewInit {
  private _symbol: ChartingLibraryWidgetOptions['symbol'] = 'BTCUSDT';
  private _interval: ChartingLibraryWidgetOptions['interval'] = '1' as ResolutionString;
  // BEWARE: no trailing slash is expected in feed URL
  private _datafeedUrl = 'https://demo_feed.tradingview.com';
  private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
  private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = 'https://save.ione.dev';
  private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
  private _clientId: ChartingLibraryWidgetOptions['client_id'] = 'dev.spreadcharts.com';
  private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
  private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
  private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
  private _containerId: ChartingLibraryWidgetOptions['container'] = 'tv_chart_container';
  private _tvWidget: IChartingLibraryWidget | null = null;

  @Input()
  set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
    this._symbol = symbol || this._symbol;
  }

  @Input()
  set interval(interval: ChartingLibraryWidgetOptions['interval']) {
    this._interval = interval || this._interval;
  }

  @Input()
  set datafeedUrl(datafeedUrl: string) {
    this._datafeedUrl = datafeedUrl || this._datafeedUrl;
  }

  @Input()
  set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
    this._libraryPath = libraryPath || this._libraryPath;
  }

  @Input()
  set chartsStorageUrl(chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']) {
    this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
  }

  @Input()
  set chartsStorageApiVersion(chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']) {
    this._chartsStorageApiVersion = chartsStorageApiVersion || this._chartsStorageApiVersion;
  }

  @Input()
  set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
    this._clientId = clientId || this._clientId;
  }

  @Input()
  set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
    this._userId = userId || this._userId;
  }

  @Input()
  set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
    this._fullscreen = fullscreen || this._fullscreen;
  }

  @Input()
  set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
    this._autosize = autosize || this._autosize;
  }

  @Input()
  set containerId(containerId: ChartingLibraryWidgetOptions['container_id']) {
    this._containerId = this.cuuid;
  }

  cuuid: string;
  theme: Subscription = new Subscription;

  constructor() {
    this.cuuid = uuidv4();
  }

  ngAfterViewInit(): void {
    function getLanguageFromURL(): LanguageCode | null {
      const regex = new RegExp('[?&]lang=([^&#]*)');
      const results = regex.exec(location.search);

      return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
    }

    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this._symbol,
      datafeed: new BinanceDatafeed(),
      interval: this._interval,
      container: this._containerId,
      library_path: this._libraryPath,
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['popup_hints', 'header_saveload'],
      enabled_features: ['study_templates', 'hide_left_toolbar_by_default', 'show_spread_operators', 'study_overlay_compare_legend_option'],
      charts_storage_url: this._chartsStorageUrl,
      charts_storage_api_version: this._chartsStorageApiVersion,
      client_id: this._clientId,
      theme: 'Dark',
      overrides: {
        "paneProperties.background": "#141414",
      },
      user_id: this._userId,
      fullscreen: this._fullscreen,
      autosize: this._autosize,
      custom_css_url: '../chart.css',
    };

    this._tvWidget = new widget(widgetOptions);


  }

  ngOnDestroy() {
    if (this._tvWidget !== null) {
      this._tvWidget.remove();
      this._tvWidget = null;
    }
    this.theme.unsubscribe();

  }
}
