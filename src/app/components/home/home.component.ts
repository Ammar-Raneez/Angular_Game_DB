import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse } from 'src/app/models/api_response';
import { Game } from 'src/app/models/game';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort : string;
  public games : Array<Game>;

  // avoid memory leaks when .subscribe() is directly called
  private routeSub : Subscription = new Subscription();
  private gameSub : Subscription = new Subscription();

  constructor(private httpService: HttpService, private router : Router, private activatedRoute: ActivatedRoute) { 
    this.sort = "";
    this.games = [];
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(( params : Params ) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    })
  }

  searchGames(sort : string, search? : string) : void {
    this.gameSub = this.httpService.getGameList(sort, search)
      .subscribe(( gameList : APIResponse<Game> ) => {
        console.log(gameList.results);
        this.games = gameList.results;
      })
  }

  openGameDetails(id : string): void {
    this.router.navigate(['details', id]);
  }

  // when page is closed, of there is a subscription
  // unsubscribe to avoid memory leaks
  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
