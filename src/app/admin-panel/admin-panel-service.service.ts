import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelServiceService {
  // Observable string sources
  public componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor(private http: HttpClient) {}


  // Service message commands
  callComponentMethod(snackKind: string) {
    this.componentMethodCallSource.next(snackKind);
  }

  getMemes(): Observable<any> {
    return this.http.get(`/api/admin/allMemes`)
  }

  editMeme(id:number, data:object): Observable<any> {

    return this.http.put(`/api/admin/editMeme/${id}`, data)
  }

  addMeme(data: object): Observable<any> {

    return this.http.post(`/api/admin/addMeme`, data)
  }


  deleteMeme(id: number): Observable<any> {
    return this.http.delete(`/api/admin/deleteMeme/${id}`);
  }
}
