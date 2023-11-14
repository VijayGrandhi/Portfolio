import { WorkExperienceModel } from "./work-experience.model";
import { EducationModel } from "./education.model";  
import { BehaviorSubject } from "rxjs";
  
export class UserModel {
    private userDataSubject = new BehaviorSubject<UserModel | null>(null);

    constructor(
      public Uname: string,
      public emailID: string,
      public contactNO: string,
      public address: string,
      public profileDescription: string,
      public Skills: string[],
      public EducationExp?: EducationModel[],
      public WorkExp?: WorkExperienceModel[],
      public AcademicExp?:WorkExperienceModel[]
    ) {}
    setUserData(userData: UserModel): void {
        this.userDataSubject.next(userData);
      }
    
      getUserData(): BehaviorSubject<UserModel | null> {
        return this.userDataSubject;
      }  
}
  
  