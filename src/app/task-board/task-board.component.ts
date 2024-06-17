import { Component, ViewContainerRef, inject } from '@angular/core';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { DyComponentsService } from '../shared/services/dy-components.service';
import { AuthService } from '../core/services/auth.service';
import { TaskBoardService } from './task-board.service';
import { ResponseStatus } from '../shared/utils/unions';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent {

  private vcRef = inject(ViewContainerRef);
  private dyService = inject(DyComponentsService);
  private authService = inject(AuthService);
  private taskService = inject(TaskBoardService);

  tasksData: any[] = []

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks() {
    this.taskService.getTasks()
      .subscribe(response => {
        if (response.code === ResponseStatus.Success) {
          this.tasksData = response.data
        }
      })
  }

  openSideBar() {
    this.dyService.openSideBar(this.vcRef)
  }

  logout() {
    this.authService.logout().subscribe()
  }
}
