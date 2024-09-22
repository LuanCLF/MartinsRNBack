import { Request, Response } from "express";
import { error } from "../../domain/error";
import { Food } from "../../domain/post";
import { createFood, deleteFood, getAll, updateFood } from "../../infra/food";
import { getFood } from "../../infra/food";

const createFoodController = async (req: Request, res: Response) => {
  const { user } = req.body;
  const {
    title,
    type,
    wifi,
    delivery,
    parking,
    description,
    whatsApp,
    instagram,
  } = req.body;

  if (!title || !type || wifi == undefined || delivery == undefined || parking == undefined || !description)  {
    throw new error("Missing required fields", 400);
  }

  const post = new Food(
    user.id,
    title,
    type,
    wifi,
    delivery,
    parking,
    description,
    whatsApp ?? '',
    instagram ?? ''
  );

  await createFood(post);

  res.status(201).json(post);
};

const getAllFoodController = async (req: Request, res: Response) => {
  const id = req.body.user.id;
  const { page } = req.query;

  const skip: number = page ? (parseInt(page as string) - 1) * 10 : 0;

  const posts = await getAll(id, skip, 10);

  res.json(posts);
};

const updateFoodController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    title,
    type,
    wifi,
    delivery,
    parking,
    description,
    whatsApp,
    instagram,
  } = req.body;

  let post = await getFood(id);

  if (!post) throw new error("Post not found", 404);

  const updatedPost: Food = {
    ...post,
    title: title ?? post.title,
    type: type ?? post.type,
    wifi: wifi ?? post.wifi,
    delivery: delivery ?? post.delivery,
    parking: parking ?? post.parking,
    description: description ?? post.description,
    whatsApp: whatsApp ?? post.whatsApp,
    instagram: instagram ?? post.instagram,
  };

  await updateFood(id, updatedPost);

  res.status(204).json();
}

const deleteFoodController = async (req: Request, res: Response) => {
  const id = req.params.id;

  await deleteFood(id);

  res.status(204).send();
}

export { createFoodController, getAllFoodController, updateFoodController, deleteFoodController };
