import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { SingleItemComponent } from './components/single-item/single-item.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  {
    path: 'list',
    component: AssignmentListComponent,
  },
  {
    path: 'assignments/:id',
    component: SingleItemComponent,
  },
];
