import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'x-rapidapi-key': '7effb9d8d0msh066f74e0e5b56cep164c86jsn72c35d18cd01',
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
            },
            setParams: {
                key: 'e40e743af2c94b0c916a8aa618fb4473',
            }
        })

        return next.handle(req);
    }
}
