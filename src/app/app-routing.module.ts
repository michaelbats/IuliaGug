import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CodeGuard } from './guards/code.guard';
import { CodeComponent } from './pages/code/code.component';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main.module').then(m => m.MainModule),
    canLoad: [CodeGuard],
  },
  {
    path: 'code',
    component: CodeComponent,
    pathMatch: 'full',
  },
  { path: '404', component: NotFoundComponent, canActivate: [CodeGuard] },
  { path: '', component: CodeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
