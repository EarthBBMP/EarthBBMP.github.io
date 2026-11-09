export type Category = 'robotics' | 'ai' | 'software';

export const categories: Record<Category, string> = {
  robotics: 'Robotics',
  ai: 'AI / ML',
  software: 'Software',
};

export interface Link {
  label: string;
  href: string;
}

export type ProjectLink =
  | Link
  | { note: string; nda?: boolean }
  | { group: string; links: Link[] };

export interface Project {
  id: string;
  group: string;
  cat: Category;
  when?: string;
  context: string;
  title: string;
  summary: string;
  details?: string[];
  stack: string;
  links?: ProjectLink[];
  // home page version
  highlight?: { meta: string; title: string; summary: string; stack: string; scribble?: string };
}

export const groups = [
  { id: 'y2026', label: '2026' },
  { id: 'y2025', label: '2025' },
  { id: 'y2024', label: '2024' },
  { id: 'yside', label: 'Side projects' },
];

export const featured = ['robocup', 'boiler', 'aimet'];

export const projects: Project[] = [
  {
    id: 'aerial',
    group: 'y2026',
    cat: 'robotics',
    when: 'Apr 2026 – now',
    context: 'Team lead · EIC-ARRT',
    title: 'Autonomous multirotors at EIC-ARRT',
    summary: "I lead the aerial robotics research team at Chula's Engineering Innovator Club. We build and fly autonomous multirotors, and every mission runs in simulation before it runs in the air.",
    details: [
      'PX4 flight stack on a Pixhawk 6X, with ROS 2 and MAVSDK on a companion computer for vision and mission autonomy.',
      'Every mission is flown in Gazebo first, including waypoint mapping and precision landing.',
    ],
    stack: 'PX4 · Pixhawk 6X · ROS 2 · MAVSDK · Gazebo',
    links: [{ note: 'Demo coming soon' }],
  },
  {
    id: 'boiler',
    group: 'y2026',
    cat: 'robotics',
    when: 'Mar 2026 – now',
    context: 'Getabec PCL · EIC Chula team',
    title: 'Boiler inspection crawler',
    summary: 'A magnetic-wheeled crawler robot that inspects boiler surfaces for dents, scratches and marks. Five of us from EIC Chula are building it under contract for Getabec.',
    details: [
      'Raspberry Pi 5 and Arduino stack with an IMU and a global-shutter camera.',
      'Uses photometric stereo imaging to detect and measure surface defects. Currently in bench testing.',
      'We demonstrated the working prototype under the Getabec name at ProPak Asia 2026 (BITEC, Bangkok).',
    ],
    stack: 'Raspberry Pi 5 · Arduino · IMU · photometric stereo',
    links: [{ note: 'Under NDA', nda: true }],
    highlight: {
      meta: '2026, Getabec',
      title: 'Boiler inspection crawler',
      summary: 'A magnetic-wheeled robot that inspects boiler surfaces and uses photometric stereo to find and measure dents and scratches. We demoed it at ProPak Asia 2026.',
      stack: 'Raspberry Pi 5 · Arduino · IMU · photometric stereo',
    },
  },
  {
    id: 'robocup',
    group: 'y2026',
    cat: 'robotics',
    when: '2026 · Incheon',
    context: 'EIC-Chula · 6th worldwide',
    title: 'Home-service robot for RoboCup@Home',
    summary: 'Our robot placed 6th worldwide in the Open Platform League at RoboCup@Home 2026. I worked on its AI components and on bringing perception, navigation and manipulation together.',
    details: [
      "Developed the robot's AI components.",
      'Integrated perception, navigation and manipulation in ROS.',
      'Implemented the manipulator-arm control routines for grasping and placing objects.',
    ],
    stack: 'ROS · perception · navigation · manipulation',
    links: [{ label: 'EIC Chula', href: 'https://www.eicchula.club/' }],
    highlight: {
      meta: '2026, Incheon',
      title: 'A home-service robot for RoboCup@Home',
      summary: "With EIC-Chula, I built the robot's AI components and brought perception, navigation and manipulation together in ROS, including the arm routines for grasping and placing objects.",
      stack: 'ROS · perception · navigation · manipulation',
      scribble: '6th in the world!',
    },
  },
  {
    id: 'aimet',
    group: 'y2026',
    cat: 'software',
    when: 'Dec 2024 – Oct 2026',
    context: 'AIMET',
    title: 'MDCU Wellness and CPIRD Mindful Hub',
    summary: 'Wellness center apps for medical students, live on the App Store and Google Play. MDCU Wellness runs on mobile and web, CPIRD Mindful Hub on mobile. I built features, fixed bugs, and kept the backend running on Google Cloud.',
    details: [
      'Developed the MDCU (mobile, web) and CPIRD (mobile) apps.',
      "Deployed and maintained the apps' backend services on Google Cloud.",
      'Tracked down and fixed bugs across development and testing to make the system more reliable.',
    ],
    stack: 'Mobile · web · Google Cloud',
    links: [
      {
        group: 'MDCU Wellness',
        links: [
          { label: 'App Store', href: 'https://apps.apple.com/th/app/mdcu-wellness/id6758370112' },
          { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=tech.aimet.mdcuwellness' },
        ],
      },
      {
        group: 'CPIRD Mindful Hub',
        links: [
          { label: 'App Store', href: 'https://apps.apple.com/th/app/cpird-mindful-hub/id6742197756' },
          { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=tech.aimet.cpirdmindfulhub' },
        ],
      },
    ],
    highlight: {
      meta: '2024 – 2026, AIMET',
      title: 'MDCU Wellness and CPIRD Mindful Hub',
      summary: 'Wellness center apps for medical students. I built features, fixed bugs, and kept the backend running on Google Cloud.',
      stack: 'Mobile · web · Google Cloud',
      scribble: 'live on both app stores',
    },
  },
  {
    id: 'icpc',
    group: 'y2025',
    cat: 'software',
    when: 'Sep – Nov 2025',
    context: 'Network / OS staff',
    title: 'Contest infrastructure for ICPC Asia Bangkok 2025',
    summary: 'Servers, judge and network for a regional programming contest of 58 teams from 25 universities across six countries, hosted by Chulalongkorn University.',
    details: [
      'Set up the competition server, the automated judge and the contest network.',
      'Imaged and configured contestant workstations.',
      'Ran a Squid proxy to control what contestants could reach, and kept the OS and network stable through the contest.',
    ],
    stack: 'Squid proxy · workstation imaging · networking',
  },
  {
    id: 'liver',
    group: 'y2025',
    cat: 'ai',
    when: 'Feb – May 2025',
    context: 'Faculty of Medicine, Chula',
    title: 'Predicting liver cancer recurrence from MRI',
    summary: 'A deep learning pipeline that segments the liver in MRI scans and predicts whether cancer will come back, using the images together with clinical metadata. Built with professors at the Faculty of Medicine.',
    details: [
      'Liver segmentation followed by recurrence prediction from MRI and clinical metadata.',
      'Evaluated with accuracy, F1 score and AUC.',
      'Part of ongoing medical research at MDCU.',
    ],
    stack: 'Deep learning · segmentation · medical imaging',
    links: [{ note: 'Under NDA', nda: true }],
  },
  {
    id: 'aspine',
    group: 'y2024',
    cat: 'ai',
    when: '2024 · iGEM',
    context: 'Silver medal',
    title: 'ASPINE: predicting neoantigen expression',
    summary: 'An ML model that predicts neoantigen expression from DNA sequences in breast cancer. I built it with a team of MDCU medical students, and the project won a Silver Medal at iGEM 2024, the worldwide synthetic biology competition, in France.',
    stack: 'Machine learning · genomics',
    links: [{ label: 'iGEM wiki', href: 'https://2024.igem.wiki/bangkok-nmh/' }],
  },
  {
    id: 'v89',
    group: 'y2024',
    cat: 'ai',
    when: 'Jul – Nov 2024',
    context: 'V89 Technology',
    title: 'Segmenting and summarising long-form video',
    summary: 'An AI system that breaks long-form videos into segments and produces summaries. I designed and built it as a research assistant and AI engineer.',
    stack: 'Video understanding · summarisation',
    links: [{ note: 'Under NDA', nda: true }],
  },
  {
    id: 'seclogs',
    group: 'yside',
    cat: 'ai',
    context: 'Personal project',
    title: 'Security logs as a knowledge graph',
    summary: 'Turns large volumes of security logs into a knowledge graph linking users, hosts, processes and network events, then looks for relationships that point to an attack.',
    details: [
      'Graph-based reasoning and machine learning to detect abnormal relationships and attacks.',
      'Designed and built the whole pipeline: log ingestion, graph construction and anomaly detection.',
    ],
    stack: 'Knowledge graphs · anomaly detection',
    links: [{ note: 'Repo coming soon' }],
  },
  {
    id: 'mocktest',
    group: 'yside',
    cat: 'software',
    context: 'Personal project',
    title: 'Mock test platform',
    summary: 'A full-stack site for timed mock exams, with instant scoring and charts of your results.',
    details: [
      'Timed exams, automatic grading and visualised results.',
      'Authentication plus separate user and admin dashboards.',
    ],
    stack: 'Go · React · Node.js · MongoDB',
    links: [{ note: 'Repo coming soon' }],
  },
];
