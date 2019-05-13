import { NgModule } from '@angular/core';
import {  MatToolbarModule,
    MatSnackBarModule, MatCardModule,
    MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatSnackBarModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        MatToolbarModule,
        MatSnackBarModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
    ],
})
export class AppMaterialModule { }
