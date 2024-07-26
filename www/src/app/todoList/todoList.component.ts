import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TodoComponent } from './todo/todo.component';
import { TodoListService } from './todoList.service';
import { Todo } from './todo/todo.class';
import { FormArray, FormGroup } from '@angular/forms';
import { TodoToastComponent } from "./todo-toast/todo-toast.component";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoComponent, TodoToastComponent, JsonPipe],
  templateUrl: './todoList.component.html',
  styleUrl: './todoList.component.scss',
  host:{class:"d-flex justify-content-center"}
})
export class TodoList implements OnInit, AfterViewInit {

todos:Array<Todo> = [];

constructor(private todoListService: TodoListService){}
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.todos = this.todoListService.todos;
  }

  todosFormArray(){
    return this.todoListService.todosFormGroup!.get("todos") as FormArray
  }
  todoFormGroupAt(index:number){
    return this.todosFormArray().at(index) as FormGroup
  }
}
