
import { Event, PEvent } from "../domain/post";
import prisma from "./db";

async function createEvent(data: Event): Promise<void> {
    await prisma.event.create({data})
}

async function updateEvent(id: string, data: Event): Promise<void> {
    await prisma.event.update({
        where: {
            id
        },
        data
    });
    return;
}

async function getEvent(id: string) {
    return await prisma.event.findUnique({
        where: {
            id
        }
    });
}

async function getAll( skip: number, take: number, id?: string) {
if(id){
    return await prisma.event.findMany({
        where: {
            userId: id
        },
        skip,
        take
    });
} else {
    const event: PEvent[] = await prisma.event.findMany({
        skip,
        take,
        select: {
            title: true,
            whatsApp: true,
            instagram: true,
            createdAt: true,
            images: true,
            date: true,
            local: true,
            description: true
        }
    });

    return event;
}
}

async function deleteEvent(id: string) {
    await prisma.event.delete({
        where: {
            id
        }
    });
    return;
}




export {
  createEvent,
  getAll,
    getEvent,
    deleteEvent,
    updateEvent
};