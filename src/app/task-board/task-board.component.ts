import { Component, inject } from '@angular/core';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AuthService } from '../core/services/auth.service';
import { TaskBoardService } from './task-board.service';
import { ResponseStatus } from '../shared/utils/unions';
import { TaskSideBarComponent } from './components/task-side-bar/task-side-bar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [TaskItemComponent, TaskSideBarComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent {

  private authService = inject(AuthService);
  private taskService = inject(TaskBoardService);
  private route = inject(ActivatedRoute)

  sidebarOpened: boolean = false
  tasksData: any[] = []

  refresh: boolean = false

  ngOnInit(): void {
    this.getAllTasks()
  }

  get selectedId() {
    return parseInt(this.route.snapshot.queryParams['id'])
  }

  getAllTasks() {
    this.refresh = true;

    this.taskService.getTasks()
      .subscribe(response => {
        if (response.code === ResponseStatus.Success) {
          this.tasksData = response.data
        }
        this.refresh = false
      })
  }

  openSideBar() {
    this.sidebarOpened = true
  }

  handleClose(ev: boolean) {
    if (ev)
      this.getAllTasks()
    this.sidebarOpened = false
  }

  logout() {
    this.authService.logout().subscribe()
  }
}
