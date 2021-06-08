/// <reference types="react" />
import { SharedConfig, RenderFunc } from '../interface';
export default function useChildren<T>(list: T[], startIndex: number, endIndex: number, setNodeRef: (item: T, element: HTMLElement) => void, renderFunc: RenderFunc<T>, { getKey }: SharedConfig<T>): JSX.Element[];
