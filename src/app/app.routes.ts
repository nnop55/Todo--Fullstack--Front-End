import { Routes } from '@angular/router';
import { AuthComponent } from './core/components/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./task-board/task-board.routes')
                .then(m => m.taskRoutes),
        canActivate: [authGuard]
    },
    { path: 'auth', component: AuthComponent },
    { path: '**', redirectTo: '' }
];
