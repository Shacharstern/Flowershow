import { isEmbeddedFileLink } from "./isEmbeddedFileLink";

const slugify = (name: string): string => {
  return name.replace(/ /g, "-").toLowerCase();
};

/**
 * A function that maps a page name/path to an array of possible permalinks.
 * These possible permalinks are cross-referenced with options.permalinks to determine whether a page exists.
 * If a page doesn't exist, the first element of the array is considered the permalink.
 */

export const pageResolver =
  (permalinks?: Array<string>) =>
  (path: string): Array<string> => {
    // for file embed links return the original path (e.g. e.g. ../../Assets/Image 1.png)
    if (isEmbeddedFileLink(path)[0]) {
      return [path];
    }

    // for other links slugify the path
    const slugifiedPath = slugify(path);

    // and try to match it against the permalinks
    if (!permalinks) {
      return [slugifiedPath];
    }

    // eslint-disable-next-line no-useless-escape
    const pathWithOptionalHeadingPattern = /([a-z0-9\.\/_-]*)(#.*)?/;
    const patternMatch = slugifiedPath.match(pathWithOptionalHeadingPattern);

    // if some weird path is passed, return the original path
    if (!patternMatch) {
      return [slugifiedPath];
    }

    const [fullPath, permalink, heading] = patternMatch;
    const matchedPermalink = permalinks.find(
      (p) => p === permalink || p.endsWith(permalink)
    );

    return matchedPermalink
      ? [`${matchedPermalink}${heading ?? ""}`]
      : [fullPath];
  };