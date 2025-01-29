import { z } from 'zod'

export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required'
        })
        .email(),
    password: z
        .string({
            required_error: 'Password is required'
        }).min(6, {
            message: 'Password must be at least 6 characters'
        })
})

export const registerSchema = z.object({
    email: z.string({
            required_error: 'Email is required'
        })
        .email({
            message: "Please enter a valid email address"
        }),
    password: z.string({
            required_error: 'Password is required'
        })
        .min(6, {
            message: 'Password must be at least 6 characters'
        }),
    confirmPassword: z.string({
            required_error: 'Password is required'
        })
        .min(6, {
            message: 'Password must be at least 6 characters'
        })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });