import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()
prisma.healthProfessional.create({
  data: {
    name: 'Matheus Adorno',
    email: 'matheusadorno11@gmail.com',
  },
})
