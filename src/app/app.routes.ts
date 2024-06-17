import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { SignComponent } from './core/components/sign/sign.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./task-board/task-board.routes')
                .then(m => m.taskRoutes),
        canActivate: [authGuard]
    },
    {
        path: 'sign',
        component: SignComponent
    },
    { path: '**', redirectTo: '' }
];
