import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { QuillModule } from 'ngx-quill';
import {QuillInitializeService} from "./services/quillInitialize.service";

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    QuillModule.forRoot()
  ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ],
  providers: [QuillInitializeService]
})
export class AppModule { }
