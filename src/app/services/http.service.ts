import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment.prod';
import { APIResponse } from '../models/api_response';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  // in this case, it will return an APIResponse (array) of Game's
  public getGameList(ordering : string, search? : string) : Observable<APIResponse<Game>> {
    // set url params
    let params = new HttpParams().set("ordering", ordering);

    if (search) {
      params = new HttpParams().set("ordering", ordering).set("search", search);
    }

    // return response of get request to that url passing the params as url params
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params
    })
  }

  public getGameDetails(id : string) : Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    // join all three get requests together and return all at once
    return forkJoin({ gameInfoRequest, gameScreenshotsRequest, gameTrailersRequest }).pipe(
      map((resp : any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
