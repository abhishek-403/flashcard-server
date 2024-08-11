import { Request, Response } from "express";
import db from "../PrismaClient";
import { error, success } from "../utils/responseWrapper";

async function getCards(req: Request, res: Response) {
  try {
    const cards = await db.flashCard.findMany();

    return res.send(success(200, cards));
  } catch (e) {
    console.log(e);
    return res.send(error(500, "Internal Error"));
  }
}
async function addCard(req: Request, res: Response) {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.send(error(400, "All fields required"));
    }
    await db.flashCard.create({
      data: {
        question,
        answer,
      },
    });
    return res.send(success(200, "Card Added"));
  } catch (e: any) {
    console.log(e);
    return res.send(error(500, "Internal Error"));
  }
}
async function updatedCard(req: Request, res: Response) {
  try {
    const { id, question, answer } = req.body;
    if (!question || !answer || !id) {
      return res.send(error(400, "Bad request"));
    }
    await db.flashCard.update({
      where: {
        id,
      },
      data: {
        question,
        answer,
      },
    });

    return res.send(success(200, "Card updated"));
  } catch (e) {
    console.log(e);
    return res.send(error(500, "Internal Error"));
  }
}
async function deleteCard(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send(error(400, "Bad request"));
    }
    await db.flashCard.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.send(success(200, "Card deleted"));
  } catch (e) {
    console.log(e);
    return res.send(error(500, "Internal Error"));
  }
}

export { getCards, addCard, updatedCard, deleteCard };
