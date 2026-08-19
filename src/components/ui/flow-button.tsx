'use client';

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './flow-button.module.css';

type FlowButtonTone = 'dark' | 'light';

type FlowButtonCommonProps = {
  text?: string;
  children?: ReactNode;
  tone?: FlowButtonTone;
  className?: string;
};

type FlowButtonButtonProps = FlowButtonCommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type FlowButtonAnchorProps = FlowButtonCommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type FlowButtonProps = FlowButtonButtonProps | FlowButtonAnchorProps;

export const FlowButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  FlowButtonProps
>(function FlowButton(
  {
    text = 'Modern Button',
    children,
    tone = 'dark',
    className,
    ...props
  },
  ref,
) {
  const label = children ?? text;
  const toneClass = tone === 'light' ? styles.light : styles.dark;
  const rootClassName = cn(styles.root, toneClass, className);

  const content = (
    <>
      <ArrowRight
        className={cn(styles.arrow, styles.leftArrow)}
        aria-hidden="true"
      />
      <span className={styles.label}>{label}</span>
      <span className={styles.circle} aria-hidden="true" />
      <ArrowRight
        className={cn(styles.arrow, styles.rightArrow)}
        aria-hidden="true"
      />
    </>
  );

  if ('href' in props && typeof props.href === 'string') {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorProps}
        ref={ref as Ref<HTMLAnchorElement>}
        className={rootClassName}
      >
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type="button"
      {...buttonProps}
      ref={ref as Ref<HTMLButtonElement>}
      className={rootClassName}
    >
      {content}
    </button>
  );
});
