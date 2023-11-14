import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { UserModel } from '../app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
    private userDataSubject = new BehaviorSubject<UserModel | null>(null);

  setUserData(userData: UserModel): void {
    this.userDataSubject.next(userData)
    sessionStorage.setItem("data",JSON.stringify(userData));
  }

  getUserData(): BehaviorSubject<UserModel | null> {
    // Retrieve data from session storage on service initialization
    const storedUserData = sessionStorage.getItem('data');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData) as UserModel;
      this.userDataSubject.next(userData);
    }

    return this.userDataSubject;
  }
}