import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback with no screenshot", async () => {
    const onlyTexts = {
      type: "BUG",
      comment: "Texto",
    };
    await expect(submitFeedback.execute(onlyTexts)).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback with not data Image", async () => {
    const notDataImage = {
      type: "BUG",
      comment: "Texto",
      screenshot: "test.jpg",
    };

    await expect(submitFeedback.execute(notDataImage)).rejects.toThrow();
  });

  it("should not be able to submit a feedback with no comment", async () => {
    const missingField = {
      type: "BUG",
      comment: "",
    };

    await expect(submitFeedback.execute(missingField)).rejects.toThrow();
  });

  it("should not be able to submit a feedback with no type", async () => {
    const missingField = {
      type: "",
      comment: "A comment",
    };

    await expect(submitFeedback.execute(missingField)).rejects.toThrow();
  });
});
