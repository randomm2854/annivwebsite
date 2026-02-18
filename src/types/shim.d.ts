/* Minimal type shims when node_modules is not installed */

declare module "react" {
  export interface RefObject<T> {
    current: T | null;
  }
  export function useRef<T>(initialValue: T | null): RefObject<T>;
  export function useState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export interface SyntheticEvent<T = HTMLElement, E = Event> {
    currentTarget: T;
    target: EventTarget;
  }
  export interface ReactElement {}
  export type ReactNode = ReactElement | string | number | null | undefined | boolean;
}

declare module "react/jsx-runtime" {
  export namespace JSX {
    export interface IntrinsicElements {
      [elem: string]: Record<string, unknown>;
    }
    export interface Element {}
  }
  export function jsx(type: unknown, props: unknown, key?: string | number): JSX.Element;
  export function jsxs(type: unknown, props: unknown, key?: string | number): JSX.Element;
  export const Fragment: unknown;
}

declare module "lucide-react" {
  import type { ReactElement } from "react";
  export const Music: (props: { className?: string }) => ReactElement;
}
