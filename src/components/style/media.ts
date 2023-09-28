type SizeType = "Medium" | "Small";

const sizes: Record<SizeType, number> = {
  // Large: 1200,
  Medium: 1280,
  Small: 639,
};

export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
  (acc, label) => {
    acc[label] = (style: string) =>
      `@media (max-width: ${sizes[label]}px) { ${style} }`;
    return acc;
  },
  {} as { [index: string]: Function }
);
