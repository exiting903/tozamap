
import { PollutionCategory, Report, ReportStatus, User, EcoPoint, EcoPointType } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Aziz Rahimov',
  nickname: 'aziz_eco',
  rank: 'Eco-Activist', 
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
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1502682219545-8084a1638295?auto=format&fit=crop&w=800&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80'
  }
];

export const ECO_POINTS: EcoPoint[] = [
  {
    id: 'ep1',
    type: EcoPointType.RECYCLING,
    name: 'Hashar Week Point',
    description: 'Пункт приема пластика и бумаги.',
    location: { lat: 41.315, lng: 69.250 },
    workingHours: '09:00 - 18:00',
    contact: '+998 90 123 45 67',
    acceptedItems: ['Пластик (PET)', 'Бумага', 'Стекло']
  },
  {
    id: 'ep2',
    type: EcoPointType.RECYCLING,
    name: 'EcoMac',
    description: 'Прием макулатуры и картона.',
    location: { lat: 41.285, lng: 69.210 },
    workingHours: '10:00 - 17:00',
    contact: '+998 71 200 00 00',
    acceptedItems: ['Картон', 'Газеты', 'Книги']
  },
  {
    id: 'ep3',
    type: EcoPointType.VOLUNTEER,
    name: 'Волонтеры "Чистый Город"',
    description: 'Частный сбор батареек и электроники.',
    location: { lat: 41.330, lng: 69.290 },
    workingHours: 'По звонку',
    contact: '+998 93 999 88 77',
    acceptedItems: ['Батарейки', 'Лампочки', 'Старая техника']
  }
];

export const GUIDE_CONTENT = [
  {
    id: 'sort',
    icon: 'fa-recycle',
    titleKey: 'guide.sortTitle',
    items: [
      { label: 'Пластик', desc: 'Сполосните бутылки, сомните их. Крышки сдавайте отдельно.' },
      { label: 'Бумага', desc: 'Очистите от скрепок и скотча. Картон складывайте компактно.' },
      { label: 'Стекло', desc: 'Только целые бутылки и банки. Битое стекло не принимается.' }
    ]
  },
  {
    id: 'forbidden',
    icon: 'fa-ban',
    titleKey: 'guide.forbiddenTitle',
    items: [
      { label: 'Опасные отходы', desc: 'Ртутные градусники, лампы (сдавать в спец. пункты).' },
      { label: 'Грязная упаковка', desc: 'Упаковка от жирной еды (коробки от пиццы) не перерабатывается.' }
    ]
  },
  {
    id: 'contacts',
    icon: 'fa-phone',
    titleKey: 'guide.contactsTitle',
    items: [
      { label: 'Эко-патруль', desc: '102 или +998 71 200-00-00' },
      { label: 'Вывоз мусора (Махсустранс)', desc: '+998 71 247-02-11' }
    ]
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

export const CATEGORY_IMAGES: Record<PollutionCategory, string> = {
  [PollutionCategory.TRASH]: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
  [PollutionCategory.AIR]: 'https://images.unsplash.com/photo-1565897192084-150d7e784636?auto=format&fit=crop&w=800&q=80',
  [PollutionCategory.WATER]: 'https://images.unsplash.com/photo-1572432960362-eb83901501c0?auto=format&fit=crop&w=800&q=80',
  [PollutionCategory.NOISE]: 'https://images.unsplash.com/photo-1484504390176-61b456590938?auto=format&fit=crop&w=800&q=80',
  [PollutionCategory.CONSTRUCTION]: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
  [PollutionCategory.OTHER]: 'https://images.unsplash.com/photo-1611273426761-53c8577a20fa?auto=format&fit=crop&w=800&q=80',
};
