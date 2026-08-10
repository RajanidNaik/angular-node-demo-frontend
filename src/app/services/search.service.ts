import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import {

  debounceTime,

  distinctUntilChanged

} from 'rxjs/operators';

@Injectable({

  providedIn: 'root'

})

export class SearchService {

  createDebounce(

    callback: () => void,

    delay = 500

  ) {

    const subject = new Subject<string>();

    subject

      .pipe(

        debounceTime(delay),

        distinctUntilChanged()

      )

      .subscribe(() => {

        callback();

      });

    return subject;

  }

}