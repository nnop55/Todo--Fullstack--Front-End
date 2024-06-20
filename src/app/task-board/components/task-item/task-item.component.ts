import { Component, Input, inject, output } from '@angular/core';
import { Status, TaskItem } from '../../../shared/utils/unions';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: TaskItem;
  @Input() id!: number;

  openSidebarEmmitter = output<void>()

  private router = inject(Router)


  ngOnInit(): void {
    switch (this.task.status) {
      case Status.InProgress:
        this.task.iconUrl = '../../../../assets/icons/Time_atack_duotone.svg'
        this.task.statusClass = 'in-progress'
        break;
      case Status.Completed:
        this.task.iconUrl = '../../../../assets/icons/Done_round_duotone.svg'
        this.task.statusClass = 'completed'
        break;
      case Status.WontDo:
        this.task.iconUrl = '../../../../assets/icons/close_ring_duotone-1.svg'
        this.task.statusClass = 'wont-do'
        break;
    }
  }

  onItemClick() {
    this.id = this.task.id;
    this.router.navigate(
      [`/tasks`],
      { queryParams: { id: this.task.id } }
    )
    this.openSidebarEmmitter.emit()
  }

}
