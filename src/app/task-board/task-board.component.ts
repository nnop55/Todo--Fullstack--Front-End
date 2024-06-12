import { Component } from '@angular/core';
import { TaskItemComponent } from './components/task-item/task-item.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent {

}
