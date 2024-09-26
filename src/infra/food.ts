import { Food } from "../domain/post";
import prisma from "./db";

async function createFood(data: Food): Promise<void> {
    await prisma.food.create({ data });
    return;
}

async function updateFood(id: string, data: Food): Promise<void> {
    await prisma.food.update({
        where: {
            id
        },
        data
    });
    return;
}

async function getFood(id: string) {
    return await prisma.food.findUnique({
        where: {
            id
        }
    });
}

async function getAll( skip: number, take: number, id?: string) {
if(id){
    return  await prisma.food.findMany({
        where: {
            userId: id
        },
        skip,
        take
    });
} else {
    return  await prisma.food.findMany({
        skip,
        take
    });
}
}

async function deleteFood(id: string) {
    await prisma.food.delete({
        where: {
            id
        }
    });
    return;
}


export {
  createFood,
  getAll,
    getFood,
    updateFood,
    deleteFood
};