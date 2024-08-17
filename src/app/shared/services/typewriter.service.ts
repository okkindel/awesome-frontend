import {
  ignoreElements,
  concatMap,
  repeat,
  delay,
  take,
  map,
} from 'rxjs/operators';
import { Observable, interval, concat, from, of } from 'rxjs';
import { Injectable } from '@angular/core';

interface TypeParams {
  word: string;
  speed: number;
  backwards?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TypewriterService {
  private _type({
    word,
    speed,
    backwards = false,
  }: TypeParams): Observable<string> {
    return interval(speed).pipe(
      map((x) =>
        backwards
          ? word.substring(0, word.length - x)
          : word.substring(0, x + 1),
      ),
      take(word.length),
    );
  }

  public typeEffect(word: string): Observable<string> {
    return concat(
      this._type({ word, speed: 50 }),
      of('').pipe(delay(1200), ignoreElements()),
      this._type({ word, speed: 30, backwards: true }),
      of('').pipe(delay(300), ignoreElements()),
    );
  }

  public getTypewriterEffect(titles: string[]): Observable<string> {
    return from(titles).pipe(
      concatMap((title) => this.typeEffect(title)),
      repeat(),
    );
  }
}
