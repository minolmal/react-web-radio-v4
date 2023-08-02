/**
 * Comma separate long numerical values
 * @param num 
 * @param decimals 
 * @returns 
 */
export const toCommas = (num: number, decimals: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

/**
 * Sanitize text data by only allowing alnums and some symbols
 * @param str 
 * @param def 
 * @returns 
 */
export const toText = (str: string, def?: string) => {
  return (
    String(str || "")
      .replace(/[^\w\`\'\-\,\.\!\?]+/g, " ")
      .replace(/\s\s+/g, " ")
      .trim() || String(def || "")
  );
};
