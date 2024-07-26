import { Injectable } from '@angular/core';
import { Todo } from './todo/todo.class';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Toast } from 'bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  todos: Array<Todo> = [];
  todosFormGroup: FormGroup | undefined;

  tooltipChange$: Subject<string> = new Subject<string>();

  constructor(private formBuilder: FormBuilder) {
    this.feed();
    this._initFormGroup()
  }

  feed(): void {
    const to: number = (Math.random() * 10) + 1;
    for (let i = 0; i < to; i++)
      this.todos.push(new Todo())

  }

  private _getTodosFormArray() {
    return (this.todosFormGroup?.get("todos") as FormArray)
  }


  private _initTodoFormGroup(todo: Todo) {

    const _formGroup = new FormGroup({})
    _formGroup.addControl("_id", new FormControl({ value: todo.id, disabled: false }));
    _formGroup.addControl("markAsComplete", new FormControl({ value: todo.id, disabled: false }));
    _formGroup.addControl("taskDescription", new FormControl({ value: todo.id, disabled: false }));



    const formGroup = this.formBuilder.group({
      "_id": [todo.id],
      "markAsComplete": [todo.markAsComplete],
      "taskDescription": [{ value: todo.taskDescription, disabled: todo.markAsComplete }]
    });

    formGroup.valueChanges.subscribe(values => {

      const model = this.todos.find((todo) => {
        return todo.id == values["_id"]
      })

      model!.markAsComplete = values["markAsComplete"] as boolean;
      if (values["taskDescription"] != undefined) {
        model!.taskDescription = values["taskDescription"] as string;
      }

      if (values["markAsComplete"] == false) {
        formGroup.controls["taskDescription"].enable({ emitEvent: false });
      } else {
        formGroup.controls["taskDescription"].disable({ emitEvent: false });
      }

    })
    return formGroup;

  }

  private _initFormGroup(): void {

    const formGroup = this.formBuilder.group({
      todos: this.formBuilder.array([])
    });

    this.todos.forEach((todo) => {
      const todoFormGroup = this._initTodoFormGroup(todo);

      (formGroup.get("todos") as FormArray).push(todoFormGroup)

    })

    this.todosFormGroup = formGroup;
  }

  private _toModelForBackend(): Array<Todo> {
    const todosForBackend = this._getTodosFormArray().controls.map((control) => {
      const todo = new Todo()
      todo.id = control.get("_id")?.value;
      todo.markAsComplete = control.get("markAsComplete")?.value;
      todo.taskDescription = control.get("taskDescription")?.value;

      return todo
    })

    return todosForBackend;
  }

  delete(todoIndex: number) {
    this.todos.splice(todoIndex, 1)
    this._initFormGroup()
  }

  addTodo() {
    const newTodo = new Todo();
    this.todos.push(newTodo);
    this._getTodosFormArray().push(this._initTodoFormGroup(newTodo));
  }

  markAsComplete(id: string) {
    this.todos.find((todo) => {
      return todo.id == id;
    })?.complete();
  }

  saveTodoList() {
    console.log(this._toModelForBackend())
  }

}
