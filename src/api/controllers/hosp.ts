import { Request, Response } from "express";
import { error } from "../../domain/error";
import {
  createHosp,
  deleteHosp,
  getAll,
  getHosp,
  updateHosp,
} from "../../infra/hosp";
import { Hosp } from "../../domain/post";

const createHospController = async (req: Request, res: Response) => {
  const { user } = req.body;
  const {
    title,
    bedrooms,
    bathrooms,
    vacancy,
    serviceArea,
    kitchen,
    description,
    whatsApp,
    instagram,
  } = req.body;

  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!bedrooms) missingFields.push("bedrooms");
  if (!bathrooms) missingFields.push("bathrooms");
  if (!vacancy) missingFields.push("vacancy");
  if (!serviceArea) missingFields.push("serviceArea");
  if (!kitchen) missingFields.push("kitchen");
  if (!description) missingFields.push("description");

  if (missingFields.length > 0) {
    throw new error(`Missing required fields: ${missingFields.join(", ")}`, 400);
  }

  const post = new Hosp(
    user.id,
    title,
    bedrooms,
    bathrooms,
    vacancy,
    serviceArea === "true",
    kitchen === "true",
    description,
    whatsApp ?? "",
    instagram ?? ""
  );

  await createHosp(post);

  res.status(201).json(post);
};

const getAllHospController = async (req: Request, res: Response) => {
  const id = req.body.user.id;
  const { page } = req.query;

  const skip: number = page ? (parseInt(page as string) - 1) * 10 : 0;

  const posts = await getAll(id, skip, 10);

  res.status(200).json(posts);
};

async function updateHospController(req: Request, res: Response) {
  const id = req.params.id;
  const {
    title,
    bedrooms,
    bathrooms,
    vacancy,
    serviceArea,
    kitchen,
    description,
    whatsApp,
    instagram,
  } = req.body;

  let post = await getHosp(id);

  if (!post) throw new error("Post not found", 404);

  const updatedPost: Hosp = {
    ...post,
    title: title ?? post.title,
    bedrooms: bedrooms ?? post.bedrooms,
    bathroom: bathrooms ?? post.bathroom,
    vacancy: vacancy ?? post.vacancy,
    serviceArea: serviceArea === undefined ? post.serviceArea : serviceArea === "true",
    kitchen: kitchen === undefined ? post.kitchen : kitchen === "true",
    description: description ?? post.description,
    whatsApp: whatsApp ?? post.whatsApp,
    instagram: instagram ?? post.instagram,
  };

  await updateHosp(id, updatedPost);

  res.status(204).json();
}

async function deleteHospController(req: Request, res: Response) {
  const id = req.params.id;

  await deleteHosp(id);

  res.status(204).json();
}

export { createHospController, getAllHospController, updateHospController, deleteHospController };
