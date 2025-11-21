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
    imageUrl: 'https://picsum.photos/id/1/800/600'
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
    imageUrl: 'https://picsum.photos/id/2/800/600'
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
    imageUrl: 'https://picsum.photos/id/3/800/600'
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