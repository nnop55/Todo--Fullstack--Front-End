import { Routes } from '@angular/router';

export const taskRoutes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    {
        path: 'tasks',
        loadComponent: () =>
            import('./task-board.component')
                .then(m => m.TaskBoardComponent),
    }
];
