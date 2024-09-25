import { Request, Response } from "express";
import { error } from "../../domain/error";
import { Event } from "../../domain/post";
import { createEvent, deleteEvent, getAll, getEvent, updateEvent } from "../../infra/event";

const createEventController = async (req: Request, res: Response) => {
  const {user} = req.body;
  const { title, date, local, description, whatsApp, instagram } = req.body;

  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!date) missingFields.push("date");
  if (!local) missingFields.push("local");
  if (!description) missingFields.push("description");

  if (missingFields.length > 0) {
    throw new error(`Missing required fields: ${missingFields.join(", ")}`, 400);
  }
  
  const post = new Event(user.id, title, new Date(date), local, description, 
    whatsApp ?? '',
    instagram ?? '');

  await createEvent(post);

  res.status(201).json(post);
}

const getAllEventController = async (req: Request, res: Response) => {
  const id = req.body.user.id;
  const { page } = req.query;

  const skip: number = page ? (parseInt(page as string) - 1) * 10 : 0;

  const posts = await getAll(id, skip, 10);

  res.json(posts);
}

async function updateEventController(req: Request, res: Response) {
  const id = req.params.id;
  const { title, date, local, description, whatsApp, instagram } = req.body;

  const post = await getEvent(id);

  if (!post) throw new error("Post not found", 404);

  const updatedPost: Event = {
    ...post,
    title: title ?? post.title,
    date: date ? post.date : new Date(date),
    local: local ?? post.local,
    description: description ?? post.description,
    whatsApp: whatsApp ?? post.whatsApp,
    instagram: instagram ?? post.instagram,
  };

  await updateEvent(id, updatedPost);

  res.status(204).json();
}

async function deleteEventController(req: Request, res: Response) {
  const id = req.params.id;

  await deleteEvent(id);

  res.status(204).send();
}

export { createEventController, getAllEventController, updateEventController, deleteEventController };