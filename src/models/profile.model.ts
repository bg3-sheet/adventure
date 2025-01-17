import {ReactNode} from 'react';

export interface INumber {
  value: number;
}

export interface IMenu {
  text: string;
  onClick?: (name: string) => void;
  name?: string;
}

export interface INode {
  children: ReactNode;
}

export interface INametag extends INumber {
  alias: string;
  name: string;
}

export interface IInspiration {
  id: string;
  background: string;
  event: string;
}

export interface IInspirationList {
  list: IInspiration[];
}

export interface IImage extends INumber, IInspirationList {
  image: string;
  alt: string;
  name: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  setList: React.Dispatch<React.SetStateAction<IInspiration[]>>;
}

export interface IProfile extends IImage, INametag, IInspirationList {}

export interface IDialog {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  menuText: string;
  name: string;
  title: string;
  children: ReactNode;
  buttonText: string;
  buttonOnClick: (character: string) => void;
}
