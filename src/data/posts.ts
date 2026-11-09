export interface Post {
  title: string;
  url: string;
  date: string;
  lang: { code: string; label: string };
  publication?: string;
  excerpt: string; // home page
  intro: string; // writing page
  cover: { src: string; width: number; height: number };
}

const thai = { code: 'th', label: 'Thai' };

export const posts: Post[] = [
  {
    title: 'How .ZIP file work??',
    url: 'https://medium.com/ruffblitz/how-zip-file-work-16f05b99558a',
    date: 'Jul 16, 2025',
    lang: thai,
    publication: 'RuffBlitz',
    excerpt: 'เคยสงสัยมั้ยว่า เวลาเราโหลดงานจาก Google Drive หรือส่งไฟล์ผ่าน Discord แล้วมันอยู่ในรูป .zip ไฟล์เนี่ย มันทำงานยังไง?',
    intro: 'เคยสงสัยมั้ยว่า เวลาเราโหลดงานจาก Google Drive หรือส่งไฟล์ผ่าน Discord แล้วมันอยู่ในรูป .zip ไฟล์เนี่ย มันทำงานยังไง? บางทีไฟล์เดียวกันแค่ “ยัด ZIP” แล้วขนาดลดจาก 100MB เหลือ 40MB งี้ เอ้าา… อะไรหายไป?',
    cover: { src: '/assets/img/writing/zip.jpg', width: 720, height: 419 },
  },
  {
    title: 'โดดเรียน 101 By EarthBBMP',
    url: 'https://medium.com/@theearthbbmp/%E0%B9%82%E0%B8%94%E0%B8%94%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99-101-by-whatonearth-26fd03ae7620',
    date: 'Jan 23, 2025',
    lang: thai,
    excerpt: 'โดดเรียนยังไงให้เก่งกว่าคนที่เข้าเรียน',
    intro: 'โดดเรียนยังไงให้เก่งกว่าคนที่เข้าเรียน',
    cover: { src: '/assets/img/writing/skip.jpg', width: 720, height: 480 },
  },
];
