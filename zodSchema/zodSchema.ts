
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



module.exports = { signUpSchema, loginSchema }