import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlowLookingComponent } from './component';
import { FormsModule } from '@angular/forms';
import { ThemeTableComponent } from './themeTable.component';
import { ContributionManagementComponent } from './contributionManagement.component';
import { OtherPeopleComponent} from './otherPeople.component';
import { ScriptAuthoringComponent } from './scriptAuthoring.component';

@NgModule({
  declarations: [
    SlowLookingComponent,
    ThemeTableComponent,
    ContributionManagementComponent,
    OtherPeopleComponent,
    ScriptAuthoringComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [SlowLookingComponent]
})
export class AppModule { }
