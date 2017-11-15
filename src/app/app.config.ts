import { InjectionToken } from '@angular/core';

import { ProviderConfig } from './entry-providers';


export const AVRE_PROVIDER_CONFIG: ProviderConfig[] = [
  {
    name: 'VGL SSSC',
    endpoint: 'https://sssc-vgl.geoanalytics.csiro.au',
    type: 'sssc'
  }
];

export let PROVIDER_CONFIG = new InjectionToken<ProviderConfig[]>('provider.config');
