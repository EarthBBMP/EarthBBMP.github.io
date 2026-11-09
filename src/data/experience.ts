export interface Role {
  org: string;
  role: string;
  when: string;
  current?: boolean;
  bullets?: string[];
  // home page version (leave out to hide)
  home?: { org: string; role: string };
}

export const experience: Role[] = [
  {
    org: 'EIC-ARRT, Aerial Robotics Research Team',
    role: 'Team Lead',
    when: 'Apr 2026 – now',
    current: true,
    bullets: [
      'We build and fly autonomous multirotors, running PX4 on a Pixhawk 6X with ROS 2 and MAVSDK on a companion computer for vision and mission autonomy.',
      'Every mission is flown in Gazebo first, including waypoint mapping and precision landing.',
    ],
    home: { org: 'EIC-ARRT, Aerial Robotics Research Team', role: 'Team Lead' },
  },
  {
    org: 'Getabec Public Company Limited · Robotic Boiler Inspection',
    role: 'Robotics Engineer, five-person EIC Chula contract team',
    when: 'Mar 2026 – now',
    current: true,
    bullets: [
      'Developing a magnetic-wheeled crawler robot that inspects boiler surfaces for dents, scratches and marks.',
      'Raspberry Pi 5 / Arduino stack, IMU and global-shutter camera with photometric stereo imaging to detect and measure surface defects. Currently in bench testing.',
      'Demonstrated the working prototype under the Getabec name at ProPak Asia 2026 (BITEC, Bangkok).',
    ],
    home: { org: 'Getabec PCL · Robotic Boiler Inspection', role: 'Robotics Engineer, EIC Chula contract team' },
  },
  {
    org: 'AIMET',
    role: 'Software Developer',
    when: 'Dec 2024 – Oct 2026',
    bullets: [
      'Developed the MDCU (mobile, web) and CPIRD (mobile) wellness center apps for medical students.',
      "Deployed and maintained the apps' backend services on Google Cloud.",
      'Analysed and fixed bugs across development and testing, improving system reliability.',
    ],
    home: { org: 'AIMET', role: 'Software Developer' },
  },
  {
    org: '2025 ICPC Asia Bangkok Regional Contest',
    role: 'Network / OS Staff',
    when: 'Sep – Nov 2025',
    bullets: [
      'Set up the competition server, automated judge and network for a regional contest of 58 teams from 25 universities across six countries, hosted by Chulalongkorn University.',
      'Imaged and configured contestant workstations, set up a Squid proxy to control network access, and kept the OS and network stable throughout the contest.',
    ],
    home: { org: 'ICPC Asia Bangkok Regional Contest 2025', role: 'Network / OS Staff' },
  },
  {
    org: 'Faculty of Medicine, Chulalongkorn University',
    role: 'AI Research Assistant',
    when: 'Feb – May 2025',
    bullets: [
      'Worked with MDCU professors on an AI model that predicts liver cancer recurrence from MRI images, as part of ongoing medical research.',
    ],
    home: { org: 'Faculty of Medicine, Chulalongkorn University', role: 'AI Research Assistant' },
  },
  {
    org: 'Leagues of Code',
    role: 'Programming Tutor',
    when: 'Oct 2023 – Oct 2025',
    bullets: ['Taught C++, Python, data structures and AI fundamentals.'],
  },
  {
    org: 'V89 Technology Co., Ltd.',
    role: 'Research Assistant & AI Engineer',
    when: 'Jul – Nov 2024',
    bullets: ['Designed and implemented an AI system that segments long-form videos and produces summaries.'],
    home: { org: 'V89 Technology', role: 'Research Assistant & AI Engineer' },
  },
];

export const education: Role[] = [
  {
    org: 'Chulalongkorn University, International School of Engineering (ISE)',
    role: 'Bachelor of Engineering (B.Eng.)',
    when: 'Aug 2025 – now',
  },
  {
    org: 'Chulalongkorn University Demonstration Secondary School',
    role: 'Science and Mathematics Program',
    when: 'May 2022 – Mar 2025',
  },
];

export const skills = [
  { title: 'Languages', items: 'Python, C++, Java, JavaScript, TypeScript, Go, SQL, MATLAB' },
  { title: 'AI & Robotics', items: 'PyTorch, ROS / ROS 2, PX4, Gazebo, Linux' },
  { title: 'Web, Data & Cloud', items: 'React, Node.js, MongoDB, Firestore, Google Cloud, Power BI, Tableau' },
];
