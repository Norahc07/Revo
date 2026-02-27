export const VOCAB_SETS = {
  1: [
    { term: "abundant", definition: "Existing or available in large quantities" },
    { term: "concise", definition: "Giving a lot of information clearly in a few words" },
    { term: "diligent", definition: "Showing care and effort in your work or duties" },
    { term: "elaborate", definition: "Detailed and carefully arranged or planned" },
    { term: "feasible", definition: "Possible and likely to be achieved or done" },
    { term: "generate", definition: "To produce or create something" },
    { term: "hinder", definition: "To make it difficult for something to happen" },
    { term: "illustrate", definition: "To explain or make something clear using examples" },
    { term: "justify", definition: "To show or prove that something is right or reasonable" },
    { term: "keen", definition: "Very interested, eager, or enthusiastic about something" }
  ],
  2: [
    { term: "adapt", definition: "To change in order to suit a new situation" },
    { term: "beneficial", definition: "Having a helpful or good effect" },
    { term: "coherent", definition: "Easy to understand because it is clear and connected" },
    { term: "derive", definition: "To get something from something else" },
    { term: "emphasize", definition: "To give special importance or attention to something" },
    { term: "fluctuate", definition: "To change frequently between one level or thing and another" },
    { term: "hierarchy", definition: "A system where people or things are organized in levels" },
    { term: "interpret", definition: "To decide on or explain the meaning of something" },
    { term: "liability", definition: "Something that causes problems; a disadvantage" },
    { term: "mediate", definition: "To try to end a disagreement between people" }
  ],
  3: [
    { term: "notion", definition: "An idea, a belief, or an opinion" },
    { term: "objective", definition: "Something you are trying to achieve; a goal" },
    { term: "precise", definition: "Clear and accurate, with careful detail" },
    { term: "reluctant", definition: "Not willing to do something; hesitant" },
    { term: "sustain", definition: "To keep something going over time" },
    { term: "tangible", definition: "That can be touched or clearly seen" },
    { term: "undergo", definition: "To experience something, especially a change or something unpleasant" },
    { term: "viable", definition: "That can work successfully; practical" },
    { term: "withdraw", definition: "To remove or move something back, or to stop taking part" },
    { term: "yield", definition: "To produce a result, answer, or amount" }
  ],
  4: [
    { term: "acknowledge", definition: "To accept or admit that something is true" },
    { term: "bias", definition: "A strong feeling in favor of or against something" },
    { term: "compile", definition: "To collect information and arrange it in a list or book" },
    { term: "discrete", definition: "Clearly separate and different" },
    { term: "encounter", definition: "To experience or face something, often unexpectedly" },
    { term: "facilitate", definition: "To make an action or process easier" },
    { term: "gratify", definition: "To please or satisfy someone" },
    { term: "hypothesis", definition: "An idea that explains facts and can be tested" },
    { term: "inevitable", definition: "Certain to happen; that cannot be avoided" },
    { term: "legitimate", definition: "Allowed by law or by rules; reasonable" }
  ],
  5: [
    { term: "magnitude", definition: "The great size or importance of something" },
    { term: "negligible", definition: "So small or unimportant that it can be ignored" },
    { term: "optimal", definition: "The best or most suitable possible" },
    { term: "paradox", definition: "A situation that seems to contradict itself but may be true" },
    { term: "refine", definition: "To improve something by making small changes" },
    { term: "scrutinize", definition: "To examine something very carefully" },
    { term: "transient", definition: "Lasting only for a short time" },
    { term: "upgrade", definition: "To improve the quality or usefulness of something" },
    { term: "validate", definition: "To prove that something is true or acceptable" },
    { term: "widespread", definition: "Happening or existing in many places or among many people" }
  ]
};

export function getVocabSet(setId) {
  const numeric = Number.parseInt(setId, 10);
  if (Number.isNaN(numeric)) return [];
  return VOCAB_SETS[numeric] || [];
}

