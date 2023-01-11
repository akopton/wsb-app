import { TUser } from "./userInterface"

export type TTask = {
    _id: string,
    innerId: string,
    title: string,
    description: string,
    asignee: TUser,
    date: number,
    status: string
  }