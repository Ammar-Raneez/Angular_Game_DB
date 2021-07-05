import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIResponse } from 'src/app/models/api_response';
import { Game } from 'src/app/models/game';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort : string;
  public games : Array<Game>;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { 
    this.sort = "";
    this.games = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(( params : Params ) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    })
  }

  searchGames(sort : string, search? : string) : void {
    this.httpService.getGameList(sort, search)
      .subscribe(( gameList : APIResponse<Game> ) => {
        console.log(gameList);
      })
  }
}
