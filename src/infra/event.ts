
import { Event } from "../domain/post";
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

async function getAll(id: string, skip: number, take: number) {
    const hosps=  await prisma.event.findMany({
        where: {
            userId: id
        },
        skip,
        take
    });

    return hosps;
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