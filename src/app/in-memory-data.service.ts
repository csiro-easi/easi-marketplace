import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService {

  createDb() {
    const entries = [
      {id: 0,
       entryType: 'Virtual Laboratory',
       name: 'VGL',
       description: 'Virtual Geophysics Laboratory',
       url: 'https://vgl.auscope.org',
       image: 'https://vgl.auscope.org/img/img-auscope-banner.gif'},
      {id: 1,
       entryType: 'Solution',
       name: 'eScript magnetic',
       description: '3D magnetic inversion example using netCDF data.',
       url: 'https://sssc-vgl.geoanalytics.csiro.au/solutions/4'},
    ];
    return {entries};
  }

}
