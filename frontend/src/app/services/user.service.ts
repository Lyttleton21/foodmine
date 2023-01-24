import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LOGIN_URL } from '../shared/constants/url';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http:HttpClient,
    private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

  login(userLogin:IUserLogin):Observable<any>{
      //console.log(this.http.post(LOGIN_URL, userLogin))
     return this.http.post<any>(LOGIN_URL, userLogin)
     .pipe(
      tap({
        // next: (user) => {
        //   this.userSubject.next(user);
        //   this.toastrService.success(
        //     `Welcome to Foodmine ${user.name}!`,
        //     'Login successful'
        //   )
        // },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.message,
            'Login Failed');
        }
      })
     );
   }

   showSuccess(message:any, title:any){
    this.toastrService.success(message, title)
   }

   setUserToLocalStorage(user:any){
      localStorage.setItem(USER_KEY, JSON.stringify(user));
   }

   getUserFromLocalStorage(){
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson){
      return JSON.parse(userJson);
    }else{
      return new User();
    }
   }

   logOut(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
   }
}
