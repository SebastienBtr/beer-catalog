import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerService } from 'src/app/services/beer/beer.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {

  beerId: number;
  beer: any;

  constructor(
    private route: ActivatedRoute,
    private beerSrv: BeerService,
    private router: Router,
    private bookmarkSrv: BookmarkService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();

    this.route.params.subscribe((params) => {
      this.beerId = params.id;

      this.beerSrv.getBeerById(this.beerId).subscribe((beer: any) => {

        this.spinner.hide();

        if (beer.length < 1) {
          this.router.navigate(['/unknown']);

        } else {
          this.beer = beer[0];
        }
      }, (err) => {
        this.spinner.hide();
        this.router.navigate(['/unknown']);
      });
    });
  }

  addToBookmarks() {
    this.spinner.show();
    this.bookmarkSrv.addBookmark(this.beer.id).subscribe(() => {
      this.spinner.hide();
      let toast = document.getElementById("snackbar");
      toast.className = "show";
      setTimeout(() => {
        toast.className = toast.className.replace("show", "");
      }, 3000);
    });
  }

}
