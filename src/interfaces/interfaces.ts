import { StaticImageData } from "next/image";

export interface MotionButtonProps<T> {
  label: string;
  type: "button" | "submit" | "reset";
  className?: string;
  rightIcon?: Boolean;
  Icon?: React.ComponentType<{ className: string }> | string;
  func: (param: T) => T;
}

export interface TextButtonProps<T> {
  label: string;
  type: "button" | "submit" | "reset";
  className?: string;
  rightIcon?: Boolean;
  Icon?: StaticImageData;
  func: (param: T) => T;
}
