export interface IFeedbackOrigin {
  type: string;
  comment: string;
  screenshot?: string;
}
export interface IFeedback extends IFeedbackOrigin {
  id: string;
}

export interface FeedbacksRepository {
  create: (data: IFeedbackOrigin) => Promise<void>;
}
