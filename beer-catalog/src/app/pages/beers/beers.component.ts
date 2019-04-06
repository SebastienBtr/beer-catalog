import { Component, OnInit } from '@angular/core';
import { BeerService } from 'src/app/services/beer/beer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {

  beers = [];
  searchQuery = "";
  noResult = false;
  lastSearch = "";
  showPager = true;
  currentPage = 1;

  constructor(
    private beerSrv: BeerService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.page) {
        this.currentPage = parseInt(params.page);
      }
      this.initData();
    });
  }

  private initData() {
    this.spinner.show();
    this.beerSrv.getBeers(this.currentPage).subscribe((beers: any) => {
      this.beers = beers;
      this.spinner.hide();
      this.showPager = true;
    });
  }

  nextPage() {
    window.scrollTo(0, 0);
    this.router.navigate(['beers'], { queryParams: { page: this.currentPage + 1 } });
  }

  previousPage() {
    if (this.currentPage > 1) {
      window.scrollTo(0, 0);
      this.router.navigate(['beers'], { queryParams: { page: this.currentPage - 1 } });
    }
  }

  search() {
    this.beers = [];
    this.noResult = false;

    if (this.searchQuery != "") {
      this.spinner.show();
      this.beerSrv.searchBeer(this.searchQuery).subscribe((beers: any) => {
        this.beers = beers;
        if (beers.length < 1) {
          this.noResult = true;
          this.lastSearch = this.searchQuery;
        }
        this.showPager = false;
        this.spinner.hide();
      });

    } else {
      this.initData();
    }
  }

}
