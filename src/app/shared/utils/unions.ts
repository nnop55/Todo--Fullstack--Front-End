import { FormControl } from "@angular/forms"

export enum Status {
    InProgress,
    Completed,
    WontDo
}

export enum Sign {
    In,
    Up
}

export enum ResponseStatus {
    Success = 1,
    Error
}


export type RegisterForm = {
    email: FormControl<string | null>,
    nickname: FormControl<string | null>,
    password: FormControl<string | null>,
    confirmPassword: FormControl<string | null>,
}

export type LoginForm = {
    email: FormControl<string | null>,
    password: FormControl<string | null>,
}

export type TaskForm = {
    title: FormControl<string | null>,
    description: FormControl<string | null>,
    status: FormControl<number | null>,
}

export class IApi<T> {
    code!: number;
    data!: T;
    error?: string;
}

export class LoginResponse {
    accessToken!: string;
    refreshToken!: string
}

export class LoginRequest {
    email!: string;
    password!: string
}

export class RegisterRequest {
    email!: string;
    nickname!: string;
    password!: string
}

export class RefreshTokenResponse {
    accessToken!: string;
}

export class TaskBody {
    title?: string;
    description?: string;
    status?: Status;
}

export class TaskItem {
    id!: number;
    title!: string;
    description!: string;
    status!: number;
    userId!: number;
    statusClass?: string;
    iconUrl?: string;
}

export class DeleteTaskResponse {
    taskId!: number;
}