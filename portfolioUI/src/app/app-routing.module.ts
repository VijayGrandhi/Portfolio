import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AcademicexpComponent } from './academicexp/academicexp.component';
import { ContactComponent } from './contact/contact.component';
import { FormfieldComponent } from './formfield/formfield.component';
import { HomeComponent } from './home/home.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'personal', component: PersonalDetailsComponent },
  { path: 'education', component: AboutComponent },
  { path: 'workexp', component: ContactComponent },
  { path: 'academicexp', component: AcademicexpComponent },
  { path: 'formfield', component: FormfieldComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
