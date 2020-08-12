export interface Message {
  kind: string;
  text: string[];
}

export interface Messages {
  data: Message[];
}
