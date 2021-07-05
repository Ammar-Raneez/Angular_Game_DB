import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'x-rapidapi-key': '7effb9d8d0msh066f74e0e5b56cep164c86jsn72c35d18cd01',
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
            },
            setParams: {
                key: 'c8bd0bd37dbd41e8bcb25dcbe9c75e9a',
            }
        })

        return next.handle(req);
    }
}
