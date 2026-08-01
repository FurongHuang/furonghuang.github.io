import {
  pillarMeta,
  publicationPillarByTitle,
  publicationSocialLinksByTitle,
  publicationThumbnailByTitle
} from "./researchContent";
import type { PillarId } from "./researchContent";

export type { PillarId } from "./researchContent";
export { pillarMeta, publicationPillarByTitle, publicationSocialLinksByTitle, publicationThumbnailByTitle };

const trustworthyPattern = /safety|secure|security|attack|adversarial|poison|backdoor|watermark|fairness|\bfair\b|bias|privacy|trust|robust|alignment|reward hacking|hallucination|refusal|harmful|vulnerab|equit|spurious/i;
const reasoningPattern = /reason|thought|test[- ]time|decod|agent|workflow|planning|\bplan\b|critic|reward model|q[- ]?star|collab|search|compute|reflection|scientist|soundness|inference[- ]time/i;

export function classifyPublication(title: string): PillarId {
  if (publicationPillarByTitle[title]) return publicationPillarByTitle[title];
  if (trustworthyPattern.test(title)) return "self-improvement";
  if (reasoningPattern.test(title)) return "reasoning-control";
  return "world-models";
}
