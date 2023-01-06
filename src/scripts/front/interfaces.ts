export type TUser = {
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
  asignee: {},
  date: number,
  status: string
}