import { Component, OnInit } from '@angular/core';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  beers = [];

  constructor(private bookmarkSrv: BookmarkService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.bookmarkSrv.getAllBookmarkBeers().subscribe((beers: any) => {
      this.spinner.hide();
      this.beers = beers;
    });  
  }

  deleteFromBookmarks(index) {
    this.spinner.show();
    let beerId = this.beers[index].id;
    this.beers.splice(index, 1);

    this.bookmarkSrv.deleteBookmark(beerId).subscribe(() => {
      this.spinner.hide();
      let toast = document.getElementById("snackbar");
      toast.className = "show";
      setTimeout(() => {
        toast.className = toast.className.replace("show", "");
      }, 3000);
    });
  }

}
