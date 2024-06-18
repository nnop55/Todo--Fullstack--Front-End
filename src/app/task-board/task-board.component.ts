import { Component, inject } from '@angular/core';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AuthService } from '../core/services/auth.service';
import { TaskBoardService } from './task-board.service';
import { ResponseStatus } from '../shared/utils/unions';
import { TaskSideBarComponent } from './components/task-side-bar/task-side-bar.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [TaskItemComponent, TaskSideBarComponent, AsyncPipe],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent {

  private authService = inject(AuthService);
  private taskService = inject(TaskBoardService);
  private route = inject(ActivatedRoute)

  sidebarOpened: boolean = false
  tasks$!: Observable<any[]>;


  ngOnInit(): void {
    this.getAllTasks()

    if (this.selectedId) {
      this.openSideBar()
    }
  }

  get selectedId() {
    return parseInt(this.route.snapshot.queryParams['id'])
  }

  getAllTasks() {
    this.tasks$ = this.taskService.getTasks().pipe(
      filter(e => e.code === ResponseStatus.Success),
      map(e => e.data)
    );
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
