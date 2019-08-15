import { Component, ViewChild, OnInit } from '@angular/core';
import {QuillInitializeService} from './services/quillInitialize.service';
import { QuillEditorComponent } from 'ngx-quill';
import 'quill-mention';
import 'quill-emoji';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
   htmlText ="<p>Testing</p>";
   delta = null;
  hasFocus = false;

  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]

  quillConfig={
    // toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //     ['code-block'],
    //     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //     //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    //     //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //     //[{ 'direction': 'rtl' }],                         // text direction

    //     //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    //     //[{ 'font': [] }],
    //     //[{ 'align': [] }],

    //     ['clean'],                                         // remove formatting button

    //     ['link'],
        ['link', 'image', 'video']  
    //     ['emoji'], 
      ],
    //   handlers: {'emoji': function() {}}
    },
    autoLink: true,
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        let values;

        if (mentionChar === "@") {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }
        
        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter:{
          key:13,
          handler: (range, context)=>{
            console.log("enter");
            return true;
          }
        }
      }
    }
  }

  constructor(
    private quillInitializeService: QuillInitializeService
  ){

  }

  ngOnInit() {
    this.editor
      .onContentChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(obs => {
        console.log('changed', obs.content);
        this.delta = obs.content;
      });
  }

  test=(event)=>{
    console.log(event.keyCode);
  }

  onSelectionChanged = (event) =>{
    if(event.oldRange == null){
      this.onFocus();
    }
    if(event.range == null){
      this.onBlur();
    }
  }

  
  
  onFocus = () =>{
    console.log("On Focus");
  }
  onBlur = () =>{
    console.log("Blurred");
  }
}
