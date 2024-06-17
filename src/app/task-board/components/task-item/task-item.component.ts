import { Component, Input, ViewContainerRef, inject } from '@angular/core';
import { Status } from '../../../shared/utils/unions';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { DyComponentsService } from '../../../shared/services/dy-components.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task: any;
  @Input() id!: number;

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private dyService = inject(DyComponentsService)
  private vcRef = inject(ViewContainerRef)

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
    this.id = parseInt(this.route.snapshot.queryParams['id']);

    if (this.id) {
      this.dyService.openSideBar(this.vcRef)
    }
  }

  onItemClick() {
    this.id = this.task.id;
    this.router.navigate(
      [`/tasks`],
      { queryParams: { id: this.task.id } }
    )
    this.dyService.openSideBar(this.vcRef)
  }

}
