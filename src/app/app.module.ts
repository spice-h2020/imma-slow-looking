import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlowLookingComponent } from './component';
import { FormsModule } from '@angular/forms';
import { ThemeTableComponent } from './themeTable.component';

@NgModule({
  declarations: [
    SlowLookingComponent,
    ThemeTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [SlowLookingComponent]
})
export class AppModule { }
