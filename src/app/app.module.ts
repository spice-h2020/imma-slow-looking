import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlowLookingComponent } from './component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SlowLookingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [SlowLookingComponent]
})
export class AppModule { }
