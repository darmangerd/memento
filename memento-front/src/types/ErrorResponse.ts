export interface ErrorResponse<Keys extends keyof any = any> {
    errors: Record<Keys, string[]>
}
