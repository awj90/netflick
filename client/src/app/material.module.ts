import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const matModules: any[] = [
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
];

@NgModule({
  imports: matModules,
  exports: matModules,
})
export class MaterialModule {}
