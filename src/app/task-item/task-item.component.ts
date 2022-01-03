import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  @Input() task!: Task
  @Output() selectTask = new EventEmitter<Task>();
  @Output() performTask = new EventEmitter<Task>();

  executeAction(action: string): void {
    if(action === 'selectTask'){
      this.selectTask.emit(this.task);
    } else if (action === 'performTask'){
      this.performTask.emit(this.task)
    }
    //this[action].emit(this.task); TODO: Ver por que não funcionou
  }

}

