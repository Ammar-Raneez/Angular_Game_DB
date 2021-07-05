import { Genre } from "./genre";
import { ParentPlatform } from "./parent_platform";
import { Publisher } from "./publisher";
import { Rating } from "./rating";
import { Screenshot } from "./screenshot";
import { Trailer } from "./trailer";

export interface Game {
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: string;
    genres: Array<Genre>;
    parent_platform: Array<ParentPlatform>;
    publishers: Array<Publisher>;
    ratings: Array<Rating>;
    screenshots: Array<Screenshot>;
    trailers: Array<Trailer>;
}