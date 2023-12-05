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
import { OverviewComponent } from './overview.component';
import { OverviewBarComponent } from './overviewBar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExhibitionTableComponent } from './exhibitionTable.component';
import { ClipboardModule } from 'ngx-clipboard';
import { LinkifyPipeModule } from './linkify.pipe';
import { LinkText } from './linktext.service';
import { LinkiftHtmlPipeModule } from './linkifyHtml.pipe';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';
import { LIGHTBOX_CONFIG } from 'ng-gallery/lightbox';
import { GALLERY_CONFIG } from 'ng-gallery';
import { ScriptWizardComponent } from './scriptWizard.component';
import { SelectorTableComponent } from './selectorTable.component';
import { SelectorComponent } from './selector.component';
import { FilterPipe } from './filter.pipe';
import { FilterScriptPipe } from './filterscript.pipe';
import { ThankyouComponent } from './thankyou.component';


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
    NavBarComponent,
    OverviewComponent,
    OverviewBarComponent,
    ExhibitionTableComponent,
    ScriptWizardComponent,
    SelectorTableComponent,
    SelectorComponent,
    FilterPipe,
    FilterScriptPipe,
    ThankyouComponent
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
    BrowserAnimationsModule,
    NgbModule,
    ClipboardModule,
    LinkifyPipeModule,
    LinkiftHtmlPipeModule,
    GalleryModule,
    LightboxModule
  ],
  providers: [CurrentUser, LinkText,     
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: true,
        hasBackdrop: true
      }
    },
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        dotsSize: 20,
        imageSize: 'contain',
        counter: false,
        gestures: true,
      }
    }
  ],
  bootstrap: [SlowLookingComponent]
})
export class AppModule { }
