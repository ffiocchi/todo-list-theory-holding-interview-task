import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Todo } from './todo.class';
import { TodoListService } from '../todoList.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, DatePipe, JsonPipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  host:{class:"list-group-item list-group-item-action"}
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input()
  todo: Todo | undefined;
  @Input()
  formGroup: FormGroup = new FormGroup({})

  constructor(private todoListService:TodoListService){}
  ngOnDestroy(): void {
    console.log(this)
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value)=>{
        console.log(value)
      // UPDATE MODEL 
      // WE DONT WANT ToFormGroup service method OVERRIDES
        this.todo!.markAsComplete = value["markAsComplete"];
        this.todo!.taskDescription = value["taskDescription"];

    })
  }
  
  onDelete(event: MouseEvent) {
    const todoIndex = this.todoListService.todos.findIndex((todo)=> todo.id == this.todo?.id)
    this.todoListService.delete(todoIndex);
    console.log(this.todoListService.todos)
  }
  
}
