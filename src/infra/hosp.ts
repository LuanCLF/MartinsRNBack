import { Hosp } from "../domain/post";
import prisma from "./db";

async function createHosp(data: Hosp): Promise<void> {
    await prisma.hosp.create({ data });
    return;
}

async function updateHosp(id: string, data: Hosp): Promise<void> {
    await prisma.hosp.update({
        where: {
            id
        },
        data
    });
    return;
}

async function getHosp(id: string) {
    return await prisma.hosp.findUnique({
        where: {
            id
        }
    });
}

async function getAll( skip: number, take: number, id?: string) {
if(id){
    return  await prisma.hosp.findMany({
        where: {
            userId: id
        },
        skip,
        take
    });
} else {
    return  await prisma.hosp.findMany({
        skip,
        take
    });
}
}

async function deleteHosp(id: string) {
    await prisma.hosp.delete({
        where: {
            id
        }
    });
    return;
}

export {
  createHosp,
  getAll,
    getHosp,
    deleteHosp,
    updateHosp
};