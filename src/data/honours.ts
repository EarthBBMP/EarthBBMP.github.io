export interface Honour {
  name: string;
  result: string;
  short: string; // home page
  long: string; // about page
}

export const honours: Honour[] = [
  {
    name: 'RoboCup@Home 2026',
    result: '6th worldwide',
    short: 'Open Platform League · Incheon, with EIC-Chula',
    long: "Open Platform League, Incheon. Built the robot's AI components and the arm's grasp-and-place routines with EIC-Chula.",
  },
  {
    name: 'iGEM 2024',
    result: 'Silver medal',
    short: 'ASPINE, with MDCU medical students · France',
    long: 'ASPINE, an ML model for neoantigen expression in breast cancer, with MDCU medical students. France.',
  },
  {
    name: 'Super AI Engineer',
    result: 'Season 4',
    short: 'Project manager, LANTA supercomputer hackathon · 2024',
    long: 'Intensive hands-on AI training. Project manager in the LANTA supercomputer hackathon, delivered on time. 2024.',
  },
];
