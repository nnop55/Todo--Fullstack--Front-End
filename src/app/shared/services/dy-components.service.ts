import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { TaskSideBarComponent } from '../../task-board/components/task-side-bar/task-side-bar.component';

@Injectable({
  providedIn: 'root'
})
export class DyComponentsService {
  private sideBarRef!: ComponentRef<TaskSideBarComponent>;

  openSideBar(vcRef: ViewContainerRef) {
    vcRef.clear()
    this.sideBarRef = vcRef.createComponent(TaskSideBarComponent)
  }

  closeSideBar() {
    if (this.sideBarRef) {
      this.sideBarRef.destroy()
    }
  }
}
