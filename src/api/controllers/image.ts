import { Request, Response } from "express";
import { ImageHostingService } from "../service/utils";
import { error } from "../../domain/error";
import { getEvent, updateEvent } from "../../infra/event";
import { getFood, updateFood } from "../../infra/food";
import { getHosp, updateHosp } from "../../infra/hosp";

const updateEventImages = async (id: string, imageUrl: string) => {
  const post = await getEvent(id);
  if (!post) throw new error("Post not found", 404);

  const exist = post.images.some((image) => image == imageUrl);

  if(!exist) {
    post.images.push(imageUrl);
    await updateEvent(id, post);
  }
}

const updadteHospImages = async (id: string, imageUrl: string) => {
  const post = await getHosp(id);
  if (!post) throw new error("Post not found", 404);

  const exist = post.images.some((image) => image == imageUrl);

  if(!exist) {
    post.images.push(imageUrl);
    await updateHosp(id, post);
  }
}

const updateFoodImages = async (id: string, imageUrl: string) => {
  const post = await getFood(id);
  if (!post) throw new error("Post not found", 404);

  const exist = post.images.some((image) => image == imageUrl);

  if(!exist) {
    post.images.push(imageUrl);
    await updateFood(id, post);
  }
}

const imageUploadController = async (req: Request, res: Response) => {
  const { file } = req;
  const { category, id, user  } = req.body;

  if (!file) throw new Error("Missing image file");
  if(!category) throw new error("Missing image category", 400);
  if(!id) throw new error("Missing image id", 400);
  if(category !== "food" && category !== "hosp" && category !== "event") throw new error("Invalid image category", 400);

  const useriD = user.id;
  let path = file.originalname;

  if(category == "food") path = `${useriD}/food/${id}/` + path;
  if(category == "hosp") path = `${useriD}/hosp/${id}/` + path;
  if(category == "event") path = `${useriD}/event/${id}/` + path;

  const imageUrl = await ImageHostingService.uploadImage(
    file.buffer,
    path
  );
  
  if(category == "food") await updateFoodImages(id, imageUrl);
  if(category == "hosp") await updadteHospImages(id, imageUrl);
  if(category == "event") await updateEventImages(id, imageUrl);

  res.status(204).json();
};


export { imageUploadController };
