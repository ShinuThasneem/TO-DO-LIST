import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

taskObj : Task=new Task();
taskArr : Task[]=[];
addTasklValue:string='';
editTasklValue:string='';



  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.editTasklValue='';
    this.addTasklValue='';
    this.taskObj=new Task();
    this.getAll();
    this.taskArr=[];
  }


  getAll(){
    this.crudService.getAll().subscribe(res=>{
this.taskArr=res;
    },err=>{
      alert("unable to get list of tasks...!");
    });
  }

addTask(){
  this.taskObj.task_name=this.addTasklValue;
  this.crudService.addTask(this.taskObj).subscribe(res=>{
this.ngOnInit();
this.addTasklValue=''
  },err=>{
    alert(err);
  });
}

editTask(){
  this.taskObj.task_name=this.editTasklValue;
  this.crudService.editTask(this.taskObj).subscribe(res=>{
    this.ngOnInit();
  },err=>{
    alert("failed to update task..!")
  })
};

deleteTask(etask:Task){
  this.crudService.deleteTask(etask).subscribe(res=>{
    this.ngOnInit();
  },err=>{
    alert("failed to delete task...!")
  });
}

call(etask: Task){
  this.taskObj=etask;
  this.addTasklValue=etask.task_name;
}


}
