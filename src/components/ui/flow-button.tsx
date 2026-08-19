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
  const light = tone === 'light';
  const label = children ?? text;

  const rootClassName = cn(
    'group relative inline-flex min-h-12 items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] px-8 py-3 text-sm font-semibold cursor-pointer no-underline transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] hover:border-transparent active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55',
    light
      ? '!border-white/80 !bg-white !text-[#07111b] hover:!text-white focus-visible:ring-white/70 focus-visible:ring-offset-[#07111b]'
      : '!border-[#333333]/40 !bg-transparent !text-[#111111] hover:!text-white focus-visible:ring-[#111111]/50 focus-visible:ring-offset-white',
    className,
  );

  const arrowClassName = light
    ? 'stroke-[#07111b] group-hover:stroke-white'
    : 'stroke-[#111111] group-hover:stroke-white';

  const content = (
    <>
      <ArrowRight
        className={cn(
          'absolute left-[-25%] z-[9] h-4 w-4 fill-none transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4',
          arrowClassName,
        )}
        aria-hidden="true"
      />

      <span className="relative z-[10] -translate-x-3 whitespace-nowrap text-current opacity-100 transition-all duration-[800ms] ease-out group-hover:translate-x-3">
        {label}
      </span>

      <span
        className={cn(
          'absolute left-1/2 top-1/2 z-[1] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-[240px] group-hover:w-[240px] group-hover:opacity-100',
          light ? 'bg-[#07111b]' : 'bg-[#111111]',
        )}
        aria-hidden="true"
      />

      <ArrowRight
        className={cn(
          'absolute right-4 z-[9] h-4 w-4 fill-none transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%]',
          arrowClassName,
        )}
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
