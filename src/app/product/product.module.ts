import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ProductComponent } from './product.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ProductComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule,FormsModule,RouterModule.forChild(routes)],
})
export class ProductModule {}
