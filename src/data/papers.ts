export interface Paper {
  id: string;
  title: string;
  venue: string;
  // may contain html
  short: string;
  summary: string;
  findings: string[];
  links: ({ label: string; href: string } | { note: string })[];
}

export const papers: Paper[] = [
  {
    id: 'old-law',
    title: 'Still Citing the Old Law? Statutory Knowledge and Temporal Anchoring in Thai Legal Question Answering',
    venue: 'NeurIPS 2026, New in ML and Global South AI workshops',
    short: 'A bilingual Thai/English benchmark on four dated amendments to Thai law, used to test whether nine LLMs answer with the current law or the repealed one. <strong class="hl">97.7%</strong> of the wrong answers came with no sign of uncertainty.',
    summary: 'When a law is amended, does an LLM answer with the current version or the repealed one, and can you tell the difference between that and simply not knowing? We built a benchmark to separate the two. Across nine LLMs, <strong class="hl">97.7%</strong> of the wrong answers came with no sign of uncertainty.',
    findings: [
      'A bilingual Thai/English benchmark of 60 vignettes on four dated amendments to Thai law, with every gold label traceable to the Royal Gazette.',
      'Nine LLMs evaluated over 3,036 responses, separating anchoring to repealed law from lack of knowledge.',
      '97.7% of the wrong answers came with no expression of uncertainty.',
    ],
    links: [
      { label: 'Code', href: 'https://github.com/EarthBBMP/thai-legal-temporal-grounding' },
      { note: 'Paper coming soon' },
    ],
  },
  {
    id: 'any-promoter',
    title: 'Any Promoter Will Do: Auditing a Sequence-to-Expression Model on Patient-Derived Data',
    venue: 'NeurIPS 2026, New in ML and ICBINB workshops',
    short: 'An audit of a released model that predicts mRNA abundance from promoter sequence, on patient data for 15,370 genes. Swapping, shuffling or scrambling the promoter changes R² by <strong class="hl">under 0.010</strong>.',
    summary: 'A released convolutional model claims to predict mRNA abundance from promoter sequence. We ran it on patient exome data and added the baselines and ablations it was missing, to check how much it really uses the sequence. Barely: swapping, shuffling or scrambling the promoter changes R² by <strong class="hl">under 0.010</strong>.',
    findings: [
      'Audited on patient exome data covering 15,370 genes.',
      'Added the missing baselines and ablations.',
      'Swapping, shuffling or scrambling the promoter changes R² by under 0.010: the model barely uses the sequence it is given.',
    ],
    links: [{ note: 'Paper coming soon' }, { note: 'Code coming soon' }],
  },
];

export const otherResearch = [
  { href: '/work#liver', title: 'Predicting liver cancer recurrence from MRI', meta: 'Faculty of Medicine, Chula · 2025' },
  { href: '/work#aspine', title: 'ASPINE: predicting neoantigen expression in breast cancer', meta: 'iGEM 2024 · Silver medal' },
  { href: '/work#v89', title: 'Segmenting and summarising long-form video', meta: 'V89 Technology · 2024' },
];
