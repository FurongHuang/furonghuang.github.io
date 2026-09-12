type BlogSocialImage = { image: string; alt: string };

export const defaultBlogSocialImage: BlogSocialImage = {
  image: "/assets/blog/blog-default-social.png",
  alt: "Essays & Research Notes by Furong Huang — interconnected research ideas."
};

// Posts without custom artwork use the blog card instead of the site portrait.
// A page can still provide image and imageAlt directly to BaseLayout.
export const blogSocialImages: Record<string, BlogSocialImage> = {
  "world-models-a-multiverse-we-can-act-on": {
    image: "/assets/blog/world-models-social.png",
    alt: "World Models: A Multiverse We Can Act On — branching possible futures."
  },
  "from-atoms-to-bits": {
    image: "/assets/blog/from-atoms-to-bits-social.png",
    alt: "From Atoms to Bits — a physical robot experiment connected to a digital simulation through feedback."
  },
  "self-improving-agents-learning-how-to-work": {
    image: "/assets/blog/self-improving-agents-social.png",
    alt: "Self-Improving Agents: Learning How to Work — a workflow improving through feedback."
  },
  "reasoning-as-control": {
    image: "/assets/blog/reasoning-as-control-social.png",
    alt: "Reasoning as Control — planning, action, and observation connected by a feedback loop."
  },
  "physical-language-for-robotics": {
    image: "/assets/blog/physical-language-for-robotics-social.png",
    alt: "Robotics Needs a Better Physical Language — objects, contact points, and grasp trajectories."
  },
  "when-students-shape-the-science": {
    image: "/assets/blog/when-students-shape-the-science-social.png",
    alt: "When Students Shape the Science — six research strands building a shared research landscape."
  },
  "where-has-furong-been": {
    image: "/assets/blog/where-has-furong-been-social.png",
    alt: "Where Has Furong Been? — image-watermark patterns and evaluation for the NeurIPS competition."
  },
  "neurips-2022": {
    image: "/assets/blog/neurips-2022-social.png",
    alt: "NeurIPS ’22 Main Conference Papers from Furong Lab at UMD — six connected research papers."
  }
};
