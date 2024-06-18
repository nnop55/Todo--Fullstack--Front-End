import { Component, Input, inject, output } from '@angular/core';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseStatus, TaskForm } from '../../../shared/utils/unions';
import { NgClass } from '@angular/common';
import { TaskBoardService } from '../../task-board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-side-bar',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, NgClass],
  templateUrl: './task-side-bar.component.html',
  styleUrl: './task-side-bar.component.scss'
})
export class TaskSideBarComponent {
  @Input() id!: number;

  private taskService = inject(TaskBoardService);
  private router = inject(Router);

  closeEmitter = output<boolean>();
  form!: FormGroup;

  statuses = [
    {
      iconUrl: '../../../../assets/icons/Time_atack_duotone.svg',
      title: 'In Progress',
      className: 'in-progress',
      selected: false,
      value: 0
    },
    {
      iconUrl: '../../../../assets/icons/Done_round_duotone.svg',
      title: 'Completed',
      className: 'completed',
      selected: false,
      value: 1
    },
    {
      iconUrl: '../../../../assets/icons/close_ring_duotone-1.svg',
      title: `Won't do`,
      className: 'wont-do',
      selected: false,
      value: 2
    }
  ]

  ngOnInit(): void {
    this.initForm()
    this.fillByTaskId()
  }

  fillByTaskId() {
    if (this.id) {
      this.taskService.getTaskById(this.id)
        .subscribe({
          next: (response) => {
            if (response.code === ResponseStatus.Success) {
              const task = response.data
              this.f['title']?.setValue(task.title);
              this.f['description']?.setValue(task.description);
              this.f['status']?.setValue(task.status);
              this.selectDefaultStatus(task)
            }
          },
          error: () => this.close()
        })
    }
  }

  initForm() {
    this.form = new FormGroup<TaskForm>({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    })
  };

  get f() {
    return this.form.controls
  }

  selectDefaultStatus(task: any) {
    for (let item of this.statuses) {
      if (item.value === task.status) {
        item.selected = true
      }
    }
  }

  selectStatus(item: any) {
    this.f['status']?.setValue(item.value)
    item.selected = true

    for (let each of
      this.statuses) {
      if (each.value !== item.value) {
        each.selected = false
      }
    }
  }

  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      return
    }
    if (this.id) {
      this.editTask()
    } else {
      this.addTask()
    }

  }

  editTask() {
    this.taskService.editTask(this.id, this.form.value)
      .subscribe(response => {
        if (response.code === ResponseStatus.Success) {
          this.close(true)
        }
      })
  }

  addTask() {
    this.taskService.addTask(this.form.value)
      .subscribe(response => {
        if (response.code === ResponseStatus.Success) {
          this.close(true)
        }
      })
  }

  deleteTask() {
    this.taskService.deleteTask(this.id)
      .subscribe(response => {
        if (response.code === ResponseStatus.Success) {
          this.close(true)
        }
      })
  }

  close(action: boolean = false) {
    if (this.id) {
      this.router.navigate(
        [`/tasks`],
        { queryParams: { id: null } }
      )
    }

    this.closeEmitter.emit(action)
  }

}
