import { Component } from '@angular/core';
import { TodoListService } from '../todoList/todoList.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private todoListService:TodoListService){}

  addTodo(){
    this.todoListService.addTodo();
  }

  saveTodoList(){
    debugger
    this.todoListService.saveTodoList();
  }
}
