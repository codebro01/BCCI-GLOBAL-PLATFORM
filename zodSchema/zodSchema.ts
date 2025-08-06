import { z } from 'zod'

const signUpSchema = z.object({
  firstName: z.string(),
  surname: z.string(),
  otherNames: z.string(),
  email: z.string().email({ message: 'Invalid email format' }), // ✅ Fixed
  roles: z.array(z.string()),
  id: z.string().optional(),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' }),
  phone: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  cluster: z.record(z.string()).optional(), //  Accepts object like { key: "value" }
  cell: z.record(z.string()).optional(),
  bookmarkedContent: z.record(z.string()).optional(),
  contributionHistory: z.string().optional(),
  spiritualGoals: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }), // ✅ Fixed
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' }),
})

const updateUserSchema = z.object({
  firstName: z.string().optional(),
  surname: z.string().optional(),
  otherNames: z.string().optional(),
  email: z.string().email({ message: 'Invalid email format' }).optional(),
  roles: z.array(z.string()).optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  cluster: z.record(z.string()).optional(), // { key: value }
  cell: z.record(z.string()).optional(),
  bookmarkedContent: z.record(z.string()).optional(),
  contributionHistory: z.string().optional(),
  spiritualGoals: z.string().optional(),
})

export const goalSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  category: z.string().trim(),
  target: z.number(),
  timeFrame: z.string().trim(),
  currentProgress: z.number().optional(),
  description: z.string(),
})
export const updateGoalSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').optional(),
  category: z.string().trim().optional(),
  target: z.number().optional(),
  timeFrame: z.string().trim().optional(),
  description: z.string().optional(),
  currentProgress: z.number().optional(),
})

export const idSchema = z.object({
  id: z.string()
})

export const EventStatusEnum = z.enum(['PENDING', 'CONFIRMED']);


export const createEventSchema = z.object({
  title: z.string().min(1, 'Event title is required'),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Invalid time format (HH:mm expected)',
  }),
  status: EventStatusEnum.optional().default('PENDING'),
})

export const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .optional(),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .optional(),
  status: EventStatusEnum.optional(),
})


export const communicationToolsSchema = z.object({
  chatId: z.string().optional(),
  announcementBoardId: z.string().optional(),
})

export const cellSchema = z.object({
  cellName: z.string().optional(),
  cellType: z.string().optional(),
  meetingLocation: z.string().optional(),
  meetingTime: z.string().optional(),
  cluster: z
    .string()
    .optional(), // ObjectId as string
  membershipTarget: z.number().optional(),
  monthlyBudget: z.number().optional(),
  cellLeader: z.string().optional(),
  members: z.array(z.string()).optional(),
  maxCapacity: z.number().optional().default(10),
  communicationTools: communicationToolsSchema.optional(),
  location: z.string().optional(),
})

export const clusterSchema = z.object({
  clusterName: z.string().optional(),
  region: z.string().optional(),
  state: z.string().optional(),
  membershipTarget: z.string().optional(),
  cellTarget: z.string().optional(),
  country: z.string().optional(),
  clusterLeader: z.string().optional(),
  cells: z.array(z.string()).optional(),
  description: z.string().optional(),
})


module.exports = {
  signUpSchema,
  loginSchema,
  updateUserSchema,
  goalSchema,
  updateGoalSchema,
  idSchema,
  createEventSchema, 
  updateEventSchema,
  EventStatusEnum, 
  cellSchema, 
  clusterSchema, 
}
