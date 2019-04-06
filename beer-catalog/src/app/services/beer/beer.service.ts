import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  private apiUrl = "https://api.punkapi.com/v2/";

  constructor(private http: HttpClient) { }

  getBeers(page = 1, per_page = 21) {
    return this.http.get(`${this.apiUrl}beers?page=${page}&per_page=${per_page}`);
  }

  searchBeer(name: string) {
    return this.http.get(`${this.apiUrl}beers?beer_name=${name}`);
  }

  getBeerById(id: number) {
    return this.http.get(`${this.apiUrl}beers/${id}`);
  }
}
