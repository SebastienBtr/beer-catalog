import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.scss']
})
export class BeerItemComponent implements OnInit {

  @Input() beer: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewBeer() {
    this.router.navigate(['/beers/' + this.beer.id]);
  }
  
}
