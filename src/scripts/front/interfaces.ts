export type TUser = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  login: string,
  password: string,
}

export type TTask = {
  _id: string,
  innerId: string,
  title: string,
  description: string,
  asignee: TUser,
  date: number,
  status: string
}