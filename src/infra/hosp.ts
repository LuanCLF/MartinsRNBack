import { Hosp, PHosp } from "../domain/post";
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

async function getAll( skip: number, take: number, id?: string): Promise<Hosp[] | PHosp[]> {
if(id){
    return await prisma.hosp.findMany({
        where: {
            userId: id
        },
        skip,
        take
    });
} else {
   const hosp: PHosp[] =  await prisma.hosp.findMany({
        skip,
        take,
        select: {
            title: true,
            whatsApp: true,
            instagram: true,
            createdAt: true,
            images: true,
            bedrooms: true,
            bathroom: true,
            vacancy: true,
            serviceArea: true,
            kitchen: true,
            description: true,

        }
    });

    return hosp;
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