import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface IRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(req: IRequest) {
    const { type, comment, screenshot } = req;

    if (!comment) {
      throw new Error("Comment is required!");
    }

    if (!type) {
      throw new Error("Type is required!");
    }
    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid image format");
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        "<div>",
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img alt="page screenshot" src="${screenshot}" />` : null,
        "</div>",
      ].join("\n"),
    });
  }
}
