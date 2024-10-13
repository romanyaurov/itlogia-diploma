import { CommentActionsEnum } from "./comment-actions.enum"

export type CommentType = {
    id: string,
    text: string,
    date: string,
    likesCount: number,
    dislikesCount: number,
    action?: CommentActionsEnum,
    user: {
        id: string,
        name: string
    }
}