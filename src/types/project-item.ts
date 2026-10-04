export type ProjectItemData = {
  name: string;
  imageUrl: string;
  type: string;
  stack: string[];
  theme: string;
  status: string;
  description: string;
  descriptionExtended: string;
  githubUrl: string;
  liveUrl: string;
};

export type CodePanelProjectData = Omit<
  ProjectItemData,
  "imageUrl" | "descriptionExtended"
>;

export type LivePreviewData = Pick<
  ProjectItemData,
  | "name"
  | "type"
  | "descriptionExtended"
  | "stack"
  | "imageUrl"
  | "liveUrl"
  | "githubUrl"
>;
