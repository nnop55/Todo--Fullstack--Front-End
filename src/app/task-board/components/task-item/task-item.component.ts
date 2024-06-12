import { Component, Input } from '@angular/core';
import { Status } from '../../../shared/utils/enums';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task: any;

  ngOnInit(): void {
    switch (this.task.status) {
      case Status.Todo:
        this.task.iconUrl = '../../../../assets/todo.svg'
        this.task.statusClass = 'todo'
        break;
      case Status.InProgress:
        this.task.iconUrl = '../../../../assets/Time_atack_duotone.svg'
        this.task.statusClass = 'in-progress'
        break;
      case Status.Completed:
        this.task.iconUrl = '../../../../assets/Done_round_duotone.svg'
        this.task.statusClass = 'completed'
        break;
      case Status.Canceled:
        this.task.iconUrl = '../../../../assets/close_ring_duotone-1.svg'
        this.task.statusClass = 'canceled'
        break;
    }
  }

}
