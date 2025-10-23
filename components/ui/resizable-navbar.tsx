"use client";
import { cn } from "../../lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 24, delay: 0.15 }}
      style={{ transformOrigin: "top center" }}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child: React.ReactNode) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{
        opacity: 1,
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
        delay: 0.25,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
        visible && "bg-neutral-800/40",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-800 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{
        opacity: 1,
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, .08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        paddingRight: visible ? "12px" : "8px",
        paddingLeft: visible ? "12px" : "8px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
        delay: 0.25,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-[calc(100vw-3rem)] max-w-sm flex-col items-center justify-between bg-transparent px-2 py-2 lg:hidden",
        visible && "bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-neutral-950 px-4 py-8 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center"
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        initial={false}
        animate={{
          translateY: isOpen ? 0 : -6,
          rotate: isOpen ? 45 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute block h-0.5 w-6 rounded-full bg-white"
      />
      <motion.span
        initial={false}
        animate={{
          opacity: isOpen ? 0 : 1,
          filter: isOpen ? "blur(6px)" : "blur(0px)",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute block h-0.5 w-6 rounded-full bg-white"
      />
      <motion.span
        initial={false}
        animate={{
          translateY: isOpen ? 0 : 6,
          rotate: isOpen ? -45 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute block h-0.5 w-6 rounded-full bg-white"
      />
    </motion.button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
    >
      <span className="text-xl italic text-white" style={{ fontFamily: "var(--font-playfair)" }}>
        Alex Vieru
      </span>
    </Link>
  );
};

type ButtonVariant = "primary" | "secondary" | "dark" | "gradient";

type NavbarButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type NavbarButtonAnchorProps = NavbarButtonBaseProps &
  React.ComponentPropsWithoutRef<"a"> & {
    as?: "a";
    href: string;
  };

type NavbarButtonButtonProps = NavbarButtonBaseProps &
  React.ComponentPropsWithoutRef<"button"> & {
    as?: "button";
    href?: undefined;
  };

type NavbarButtonProps = NavbarButtonAnchorProps | NavbarButtonButtonProps;

export const NavbarButton = ({
  as,
  children,
  className,
  variant = "primary",
  href,
  ...props
}: NavbarButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-black button text-white text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
   primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  } satisfies Record<ButtonVariant, string>;

  if ((as ?? (href ? "a" : "button")) === "a") {
    const anchorProps = props as React.ComponentPropsWithoutRef<"a">;
    const { href: anchorHref, ...restAnchorProps } = anchorProps;
    const resolvedHref = href ?? anchorHref;

    if (!resolvedHref) {
      throw new Error("NavbarButton rendered as an anchor requires an href.");
    }

    return (
      <a
        href={resolvedHref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...restAnchorProps}
      >
        {children}
      </a>
    );
  }

  const buttonProps = props as React.ComponentPropsWithoutRef<"button">;
  const { type = "button", ...restButtonProps } = buttonProps;
  return (
    <button
      type={type}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...restButtonProps}
    >
      {children}
    </button>
  );
};
