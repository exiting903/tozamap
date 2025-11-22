import { PollutionCategory, Report, ReportStatus, User } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Aziz Rahimov',
  nickname: 'aziz_eco',
  rank: 'Eco-Activist', // Ranks could be dynamic, keeping simple for now
  points: 340,
  avatarUrl: 'https://picsum.photos/id/64/200/200'
};

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'r1',
    userId: 'u2',
    category: PollutionCategory.TRASH,
    description: 'Свалка строительного мусора возле канала Анхор. Лежит уже неделю.',
    location: { lat: 41.311081, lng: 69.240562, addressName: 'Shaykhantahur District' },
    timestamp: Date.now() - 86400000 * 2, // 2 days ago
    status: ReportStatus.NEW,
    likes: 15,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ05NliFzM-Yhh5KM6goEMgA4NGGws4PN0vw&s'
  },
  {
    id: 'r2',
    userId: 'u3',
    category: PollutionCategory.AIR,
    description: 'Сильный запах гари и пыль. Трудно дышать.',
    location: { lat: 41.299496, lng: 69.240177, addressName: 'Chilanzar District' },
    timestamp: Date.now() - 3600000 * 5, // 5 hours ago
    status: ReportStatus.VERIFIED,
    likes: 42,
    imageUrl: 'https://upl.uz/uploads/posts/2021-11/1636051172_taha.jpg'
  },
  {
    id: 'r3',
    userId: 'u4',
    category: PollutionCategory.WATER,
    description: 'Сброс непонятной жидкости в арык. Вода стала зеленой.',
    location: { lat: 41.320000, lng: 69.280000, addressName: 'Mirzo-Ulugbek District' },
    timestamp: Date.now() - 86400000 * 5,
    status: ReportStatus.IN_PROGRESS,
    likes: 8,
    imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fnikita.lemeshko.2025%2Fposts%2F%25D1%2583%25D0%25B7%25D0%25B1%25D0%25B5%25D0%25BA%25D0%25B8%25D1%2581%25D1%2582%25D0%25B0%25D0%25BD-%25D0%25B8-%25D0%25B5%25D0%25B3%25D0%25BE-%25D0%25B0%25D1%2580%25D1%258B%25D0%25BA%25D0%25B8%25D0%25B2-%25D0%25BF%25D0%25BE%25D1%2581%25D0%25BB%25D0%25B5%25D0%25B4%25D0%25BD%25D0%25B5%25D0%25B5-%25D0%25B2%25D1%2580%25D0%25B5%25D0%25BC%25D1%258F-%25D0%25B2-%25D1%2583%25D0%25B7%25D0%25B1%25D0%25B5%25D0%25BA%25D0%25B8%25D1%2581%25D1%2582%25D0%25B0%25D0%25BD%25D0%25B5%25D0%25B0-%25D0%25B8%25D0%25BC%25D0%25B5%25D0%25BD%25D0%25BD%25D0%25BE-%25D0%25B2-%25D1%2582%25D0%25B0%25D1%2588%25D0%25BA%25D0%25B5%25D0%25BD%25D1%2582%25D0%25B5-%25D0%25BF%25D1%2580%25D0%25BE%25D0%25B8%25D1%2581%25D1%2585%25D0%25BE%2F24035433362814437%2F&psig=AOvVaw3O3hhJ-3VGqC5YsqdWRqKB&ust=1763877792913000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCD9v6KhZEDFQAAAAAdAAAAABAE'
  }
];

export const CATEGORY_COLORS: Record<PollutionCategory, string> = {
  [PollutionCategory.TRASH]: 'bg-orange-500',
  [PollutionCategory.AIR]: 'bg-gray-500',
  [PollutionCategory.WATER]: 'bg-blue-500',
  [PollutionCategory.NOISE]: 'bg-purple-500',
  [PollutionCategory.CONSTRUCTION]: 'bg-yellow-600',
  [PollutionCategory.OTHER]: 'bg-red-500',
};

export const CATEGORY_ICONS: Record<PollutionCategory, string> = {
  [PollutionCategory.TRASH]: 'fa-trash',
  [PollutionCategory.AIR]: 'fa-smog',
  [PollutionCategory.WATER]: 'fa-water',
  [PollutionCategory.NOISE]: 'fa-volume-up',
  [PollutionCategory.CONSTRUCTION]: 'fa-truck',
  [PollutionCategory.OTHER]: 'fa-exclamation-triangle',
};
