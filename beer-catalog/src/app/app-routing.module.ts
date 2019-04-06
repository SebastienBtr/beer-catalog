import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeersComponent } from './pages/beers/beers.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BeerDetailsComponent } from './pages/beer-details/beer-details.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';

const routes: Routes = [
  {
    path: 'beers',
    component: BeersComponent
  },
  {
    path: 'beers/:id',
    component: BeerDetailsComponent
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent
  },
  {
    path: '',
    redirectTo: '/beers',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
