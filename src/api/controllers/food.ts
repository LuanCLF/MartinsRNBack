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

  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!type) missingFields.push("type");
  if (wifi == undefined) missingFields.push("wifi");
  if (delivery == undefined) missingFields.push("delivery");
  if (parking == undefined) missingFields.push("parking");
  if (!description) missingFields.push("description");

  if (missingFields.length > 0) {
    throw new error(`Missing required fields: ${missingFields.join(", ")}`, 400);
  }



  const post = new Food(
    user.id,
    title,
    type,
    wifi === 'true',
    delivery === 'true',
    parking === 'true',
    description,
    whatsApp ?? '',
    instagram ?? ''
  );

  await createFood(post);

  res.status(201).json(post);
};

const getAllFoodUserController = async (req: Request, res: Response) => {
  const id = req.body.user.id;
  const { page } = req.query;

  const skip: number = page ? (parseInt(page as string) - 1) * 10 : 0;

  const posts = await getAll( skip, 10, id);

  res.status(200).json(posts);
};

const getAllFoodController = async (req: Request, res: Response) => {
  const { page } = req.query;

  const skip: number = page ? (parseInt(page as string) - 1) * 10 : 0;

  const posts = await getAll( skip, 10);

  res.status(200).json(posts);
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
    wifi: wifi === undefined ? post.wifi:   wifi === 'false' ,
    delivery: delivery === undefined ? post.delivery : delivery === 'true',
    parking: parking === undefined ? post.parking : parking === 'true',
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

  res.status(204).json();
}

export { createFoodController, getAllFoodUserController, getAllFoodController, updateFoodController, deleteFoodController };
