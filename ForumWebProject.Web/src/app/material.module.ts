import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import{ MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper'

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatMenuModule,
  MatStepperModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}