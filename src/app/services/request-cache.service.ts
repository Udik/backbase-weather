import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

/*
Provides caching of HttpResponses for a fixed amount of time
(though it would be better to have expiration time set by the requester)
*/

const maxAge = 60000;
@Injectable()
export class RequestCache {

    cache = new Map();

    get(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);

        if (!cached) {
            return undefined;
        }

        const isExpired = cached.lastRead < (Date.now() - maxAge);

        if (isExpired) {
            return undefined;
        }

        return cached.response;
    }

    put(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.url;
        const entry = { url, response, lastRead: Date.now() };
        this.cache.set(url, entry);

        // after every cache set, purges expired entries
        this.purge();
    }

    purge() {
        const expired = Date.now() - maxAge;
        this.cache.forEach(expiredEntry => {
            if (expiredEntry.lastRead < expired) {
                this.cache.delete(expiredEntry.url);
            }
        });
    }
}
