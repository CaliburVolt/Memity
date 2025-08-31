export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
  alignment: "left" | "center" | "right";
  isSelected: boolean;
}

export interface TextSettings {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
  alignment: "left" | "center" | "right";
}
