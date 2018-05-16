import { InjectionToken } from '@angular/core';

export class ProviderConfig {
  name: string;
  endpoint: string;
  type: string;
}

export const AVRE_PROVIDER_CONFIG: ProviderConfig[] = [
  {
    name: 'VGL SSSC',
    endpoint: 'http://54.252.224.225/',
    // endpoint: 'https://sssc-vgl.geoanalytics.csiro.au',
    type: 'sssc'
  }
];

export let PROVIDER_CONFIG = new InjectionToken<ProviderConfig[]>('provider.config');
