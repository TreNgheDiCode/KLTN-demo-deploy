import { CoreMessage } from "ai";

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export interface Session {
  user: {
    id: string;
    email: string;
  };
}

export interface AuthResult {
  type: string;
  message: string;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

export interface Message {
  id: string;
  role: string;
  content: ContentElement[] | string;
}

export interface ContentElement {
  type: string;
  toolName: string;
  toolCallId: string;
  args?: Args;
  result?: Args;
}

export interface Args {
  countries: Country[];
}

export interface Country {
  name: string;
  flag: string;
}
