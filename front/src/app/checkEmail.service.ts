import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CheckEmailService {

constructor(private httpRequest: HttpClient) { }

    checkEmail(email: string) {

        return this.httpRequest.get<void>(`http://localhost:3000/auth/check_emails/${email}`, {observe:'response'}).pipe(
            map((response: HttpResponse<void>) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            }),
            catchError((err) => {
                console.log(err.status);
                if (err.status === 404) {
                  console.log('Not found');
                  return of (false);
                }
                return of (false);
              }));
    }

}
