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