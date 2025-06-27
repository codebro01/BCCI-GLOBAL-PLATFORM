import { Document } from 'mongoose'

export type ID = string
export type User = {
  id: ?ID
  firstName: string
  surname: string
  otherNames: string
  email: string
  phone: string
  password: string
  roles: [string]
  country: string
  state: string
  city: string
  cluster: Cluster
  cell: Cell
  bookmarkedContent: [ID]
  contributionHistory: [Contribution]
  spiritualGoals: [string]
}
export type updateUserFields = Partial<{
  firstName: string
  surname: string
  otherNames: string
  email: string
  phone: string
  roles: [string]
  country: string
  state: string
  city: string
  cluster: Cluster
  cell: Cell
  bookmarkedContent: [ID]
  contributionHistory: [Contribution]
  spiritualGoals: [string]
}>

export type Goal = {
  id: ?string
  user: ?User
  title: string
  category: string
  target: number
  timeframe: string
  description: string
  currentProgress: number
}

export type GoalType = Goal & Document

export type Cluster = {
  id: ID
  name: string
  country: string
  state: string
  city: string
  leader: User
  cells: [Cell]
}

export type Cell = {
  id: ID
  name: string
  cluster: Cluster
  members: [User]
  leader: User
  announcements: [string]
}

export type Contribution = {
  id: ID
  contributionName: string
  amount: number
  remark: string
}
