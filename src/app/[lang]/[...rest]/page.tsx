import { notFound } from "next/navigation";

/**
 * Any address under a language that no page claims ("/de/nope"). Rendering the not-found page from here keeps the
 * 404 inside the language's layout, so it is translated and has the header and footer. Without it Next.js would
 * show its own English 404 for unknown paths.
 */
export default function UnknownPage() {
  notFound();
}
