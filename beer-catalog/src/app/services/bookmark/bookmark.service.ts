import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BeerService } from '../beer/beer.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private beerSrv: BeerService) { }

  addBookmark(beerId: number) {
    return new Observable((observer) => {
      localStorage.setItem(`beer-${beerId}`, beerId.toString());
      observer.next();
      observer.complete();
    });
  }

  deleteBookmark(beerId: number) {
    return new Observable((observer) => {
      localStorage.removeItem(`beer-${beerId}`);
      observer.next();
      observer.complete();
    });
  }

  getAllBookmarkBeers() {
    return new Observable((observer) => {

      let beers = [];

      let bookmarks = Object.keys(localStorage).filter((item) => { return item.startsWith("beer-"); });

      bookmarks.forEach((bookmark, index) => {

        this.beerSrv.getBeerById(parseInt(bookmark.split("-")[1])).subscribe((beer: any) => {

          if (beer && beer.length > 0) {
            beers.push(beer[0]);
          }
            
          if (index === bookmarks.length - 1) {
            observer.next(beers);
            observer.complete();
          }
        });
      });

    });
  }
}
