import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlowLookingComponent } from './component';
import { FormsModule } from '@angular/forms';
import { ThemeTableComponent } from './themeTable.component';
import { ContributionManagementComponent } from './contributionManagement.component';
import { OtherPeopleComponent} from './otherPeople.component';
import { ScriptAuthoringComponent } from './scriptAuthoring.component';
import { HomepageComponent } from './homepage.component';
import { SlowLookingActivityComponent } from './slowLookingActivity.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ModelModule } from './model.module';

@NgModule({
  declarations: [
    SlowLookingComponent,
    ThemeTableComponent,
    ContributionManagementComponent,
    OtherPeopleComponent,
    ScriptAuthoringComponent,
    HomepageComponent,
    SlowLookingActivityComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModelModule
  ],
  bootstrap: [SlowLookingComponent]
})
export class AppModule { }
