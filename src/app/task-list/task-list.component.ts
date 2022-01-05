import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from '../task.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$!: Observable<Task[]>;
  selectedTask!: Task;
  loading = true;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks.valueChanges();
    this.tasks$
    .pipe(take(1))
    .subscribe(() => this.loading = false);

  }

  onPerformTask(task: Task): void {
    task.done = !task.done;
    this.taskService.update(task);
  }

  newShowDialog(): void{
    this.dialog.open(TaskDialogComponent);
  }

  showDialog(task: Task): void{
    console.log(task);
    //const config: MatDialogConfig<any> = (task) ? {data:{ task }} : null;
    const config: MatDialogConfig<any> = {data:{ task }};
    this.dialog.open(TaskDialogComponent, config);
  }



  onDelete(task: Task): void{
    this.taskService.delete(task);
  }

}
