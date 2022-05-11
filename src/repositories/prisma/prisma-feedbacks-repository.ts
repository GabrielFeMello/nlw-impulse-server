import { FeedbacksRepository, IFeedbackOrigin } from "../feedbacks-repository";
import { prisma } from "../../prisma";

export class PrismaFeedbackRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: IFeedbackOrigin) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
