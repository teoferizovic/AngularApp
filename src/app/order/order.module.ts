import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderComponent } from './order.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: OrderComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule,FormsModule,RouterModule.forChild(routes)],
})
export class OrderModule {}
