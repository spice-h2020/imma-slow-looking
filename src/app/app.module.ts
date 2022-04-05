import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlowLookingComponent } from './component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeTableComponent } from './themeTable.component';
import { ContributionManagementComponent } from './contributionManagement.component';
import { OtherPeopleComponent} from './otherPeople.component';
import { ScriptAuthoringComponent } from './scriptAuthoring.component';
import { HomepageComponent } from './homepage.component';
import { SlowLookingActivityComponent } from './slowLookingActivity.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ModelModule } from './model.module';
import { ArtworkTableComponent } from './artworkTable.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MessageModule } from './messages/message.module';
import { UserTableComponent } from './userTable.component';
import { CurrentUser } from './currentUser.service';
import { UserLoginComponent } from './userLogin.component';
import { AllResponsesComponent } from './allResponses.component';
import { NavBarComponent } from './navBar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SlowLookingComponent,
    ThemeTableComponent,
    ContributionManagementComponent,
    OtherPeopleComponent,
    ScriptAuthoringComponent,
    HomepageComponent,
    SlowLookingActivityComponent,
    ArtworkTableComponent,
    UserTableComponent,
    UserLoginComponent,
    AllResponsesComponent,
    NavBarComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModelModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    MessageModule,
    DragDropModule,
    BrowserAnimationsModule
  ],
  providers: [CurrentUser],
  bootstrap: [SlowLookingComponent]
})
export class AppModule { }
