export type TUser = {
    _id?: string,
    firstName: string,
    lastName: string,
    email: string,
    login: string,
    password: string,
    role: string,
    settings: {
      taskDaysLeft: number
    }
  }