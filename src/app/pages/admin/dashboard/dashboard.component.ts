import { Component, OnInit } from '@angular/core';
import {UserList} from '../../../fack-db/user-data';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {ExportFileService} from '../../../shared/services/export-file.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit { 
  userList: any =[]
  groupData: any;
  permissionList: any = []
  constructor(
    private exportFileService: ExportFileService
  ) {  
     this.permissionList = ['add','edit','delete']
  }

  ngOnInit() {
    this.userList = UserList.user;
    this.groupData = this.organise(this.userList); 
  }

  buildBodyData(data,columns) {
    var body = [];
    
    var columnsHeaders = [
      {text:'',fontSize: 7,fillColor:'#ccc',bold: true}, 
      {text:'Id',fontSize: 7,fillColor:'#ccc',bold: true}, 
      {text:'User Name',fontSize: 7,fillColor:'#ccc',bold: true}, 
      {text:'Password',fontSize: 7,fillColor:'#ccc',bold: true},
    ]
    body.push(columnsHeaders);
    data.forEach((row,index) => {
      let createRow = [];
      columns.forEach(col => {
        if(col == 'sl'){
          createRow.push({text:index + 1,fillColor:'#fff',bold: false,fontSize:7})
        }        
        else{
          createRow.push({text:row[col],fillColor:'#fff',bold: false,fontSize:7})
        }
          
      })
      body.push(createRow)
    })
    if(data.length == 0){
      var d = [
        {text:'1',fontSize: 7,fillColor:'#fff',bold: false}, 
        {text:'',fontSize: 7,fillColor:'#fff',bold: false}, 
        {text:'',fontSize: 7,fillColor:'#fff',bold: false}, 
        {text:'',fontSize: 7,fillColor:'#fff',bold: false},
      ]
      body.push(d)
    }
    return body
  }

  printPDF() {
      var dd = {
      
        content: [
          { text: 'User List', style: 'header' },
          {
            table: {
              headerRows: 1,
               widths: [10,'*','*','*'],
               body:this.buildBodyData(this.userList,['sl','id','username','password']),
            }
          },
        ],
        styles: {
          header: {
            fontSize: 10,
            bold: true,
            margin: [0, 0, 0, 10]
          }
        },
        defaultStyle: {
          alignment: 'justify'
        }
      }
      var pdf = pdfMake.createPdf(dd);
      pdf.open();    
  }

  downloadExcel(){
    this.exportFileService.exportAsExcelFile(this.userList, 'export-to-excel');
  }

  organise(arr) {
    var headers = [], // an Array to let us lookup indicies by group
      objs = [],    // the Object we want to create
      i, j;
    for (i = 0; i < arr.length; ++i) {
      j = headers.indexOf(arr[i].id); // lookup
      if (j === -1) { // this entry does not exist yet, init
        j = headers.length;
        headers[j] = arr[i].id;
        objs[j] = {};
        objs[j].id = arr[i].id;
        objs[j].data = [];
      }
      objs[j].data.push( // create clone
        {
          case_worked: arr[i].case_worked,
          note: arr[i].note, id: arr[i].id
        }
      );
    }
    return objs;
  }

  reSetPermission(per,i){
    var index = this.userList[i]['permission'].findIndex(x => x == per)
    if(index == -1){
      this.userList[i]['permission'].push(per)
    }
    else{
      this.userList[i]['permission'].splice(index,1)
    }
  }

  getActiveClass(permission,per){
    var index = permission.findIndex(x => x == per)
    
    return {
      'active': index != -1,
      '': index == -1
    };
  }
}
