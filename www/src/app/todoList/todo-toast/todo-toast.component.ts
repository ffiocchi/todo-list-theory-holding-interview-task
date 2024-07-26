import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlEvent, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoListService } from '../todoList.service';
import { Todo } from '../todo/todo.class';
import { Toast, Tooltip } from 'bootstrap';
import { DatePipe, JsonPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { EventType } from '@angular/router';

@Component({
  selector: 'todo-toast',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, JsonPipe],
  templateUrl: './todo-toast.component.html',
  styleUrl: './todo-toast.component.scss'
})
export class TodoToastComponent implements OnInit, AfterViewInit {

  @Input()
  todo: Todo | undefined;
  @Input()
  formGroup: FormGroup = new FormGroup({})

  @ViewChild('toastRef') toastElementRef!: ElementRef<HTMLElement>;

  toast: Toast | undefined;
  tooltip: Tooltip | undefined;

  tooltipSub: Subscription = new Subscription();

  constructor(private todoListService:TodoListService){}

  ngOnInit(): void {
    // (this.formGroup.get("taskDescription") as FormControl).events.subscribe((event)=>{
    //   console.log(event);
    // })
  }

  ngAfterViewInit(): void {
    // this.tooltipSub = this.todoListService.tooltipChange$.subscribe((value)=>{
    //   debugger
    //   this.tooltip?.dispose();
    //   this._initTooltip();
    // });

    this.toast = new Toast(this.toastElementRef.nativeElement,{autohide:false});    
    this.toast.show();

    this._initTooltip();

    this.toastElementRef.nativeElement.querySelector("input")?.addEventListener("keyup",(event)=>{
      this.tooltip?.dispose();
      this._initTooltip();
      this.tooltip?.show();
    })

    this.toastElementRef.nativeElement.querySelector("#checkbox-"+this.todo?.id)?.addEventListener("change",(event)=>{
      console.log(event)
    })

  }

  onDelete(event: MouseEvent) {
    const todoIndex = this.todoListService.todos.findIndex((todo)=> todo.id == this.todo?.id)
    this.todoListService.delete(todoIndex);
    console.log(this.todoListService.todos)
  }
  
  private _initTooltip(){
    this.tooltip = new Tooltip(
      this.toastElementRef.nativeElement.querySelector('[data-bs-toggle="tooltip"]')!,
      {
        container:".toast",
        trigger:"hover",
        placement:"left",
        title: this.todo?.taskDescription ?? ""
      }
    );
  }
  
}
