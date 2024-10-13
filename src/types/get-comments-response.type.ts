import { CommentType } from "./comment.type"

export type GetCommentsResponseType = {
    allCount: number,
    comments: CommentType[]
}