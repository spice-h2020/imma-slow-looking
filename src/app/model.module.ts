import { NgModule } from "@angular/core"; 
import { Model } from "./repository.model"; 
import { HttpClientModule } from "@angular/common/http"; 
import { RestDataSource } from "./rest.datasource";
import { ModelResolver1 } from "./model.resolver1";
import { ModelResolver2 } from "./model.resolver2";
import { ModelResolver3 } from "./model.resolver3";
import { ModelResolver4 } from "./model.resolver4";
import { ModelResolver5 } from "./model.resolver5";
import { ModelResolver6 } from "./model.resolver6";
import { ModelResolver7 } from "./model.resolver7";

@NgModule({ 
    imports: [HttpClientModule], 
    providers: [Model, RestDataSource, ModelResolver1, ModelResolver2, ModelResolver3, ModelResolver4, ModelResolver5, ModelResolver6, ModelResolver7] })

export class ModelModule { }