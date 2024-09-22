import { User } from "../domain/user";
import prisma from "./db";

async function createUser(data: User): Promise<void> {
   await prisma.user.create({ data });
   return;
}

async function getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
}

async function checkIfUserExists(email: string) {
    return await prisma.user.count({ where: { email } }) > 0;
}

async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
}

async function deleteUser(id: string) {
   await prisma.user.delete({ where: { id } });
}




export {
  createUser,
  getUserById,
    checkIfUserExists,
  getUserByEmail,
  deleteUser
};