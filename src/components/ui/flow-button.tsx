'use client';

import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react';
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

export const FlowButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, FlowButtonProps>(
  function FlowButton(
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
      'group relative inline-flex min-h-12 items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] bg-transparent px-8 py-3 text-sm font-semibold cursor-pointer no-underline transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] hover:border-transparent active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55',
      light
        ? 'border-white/40 text-white hover:text-[#07111b] focus-visible:ring-white/70 focus-visible:ring-offset-[#07111b]'
        : 'border-[#333333]/40 text-[#111111] hover:text-white focus-visible:ring-[#111111]/50 focus-visible:ring-offset-white',
      className,
    );

    const arrowClassName = light
      ? 'stroke-white group-hover:stroke-[#07111b]'
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

        <span className="relative z-[1] -translate-x-3 whitespace-nowrap transition-all duration-[800ms] ease-out group-hover:translate-x-3">
          {label}
        </span>

        <span
          className={cn(
            'absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-[220px] group-hover:w-[220px] group-hover:opacity-100',
            light ? 'bg-white' : 'bg-[#111111]',
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
  },
);
