// controllers share the same instance of prisma client
// https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client#use-a-single-shared-instance-of-prismaclient
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.prisma = prisma