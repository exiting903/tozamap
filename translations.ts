
import { PollutionCategory, ReportStatus } from "./types";

export const translations = {
  ru: {
    nav: { map: 'Карта', add: 'Добавить', profile: 'Профиль', guide: 'Эко-Гид' },
    map: { all: 'Все', locate: 'Моя локация' },
    guide: {
        title: 'Эко-Справочник',
        subtitle: 'Правила сортировки и полезные контакты',
        preparationTitle: 'Подготовка',
        sortTitle: 'Что можно сдавать',
        forbiddenTitle: 'Не принимают',
        contactsTitle: 'Службы и контакты',
        workingHours: 'Режим работы',
        phone: 'Телефон',
        accepts: 'Принимает'
    },
    auth: {
      title: 'Добро пожаловать',
      subtitle: 'Создайте аккаунт, чтобы сделать город чище',
      uploadPhoto: 'Загрузить фото',
      nickname: 'Никнейм (уникальный)',
      name: 'Ваше имя',
      password: 'Пароль',
      register: 'Зарегистрироваться',
      errorNickTaken: 'Этот никнейм уже занят',
      errorFillAll: 'Заполните все поля'
    },
    form: {
      title: 'Новая проблема',
      step1Title: 'Что случилось?',
      step1Desc: 'Выберите категорию загрязнения',
      step2Title: 'Где это?',
      step2Desc: 'Добавьте фото и проверьте адрес',
      locationFound: 'Локация определена',
      placeholderDesc: 'Опишите проблему подробнее...',
      submit: 'Отправить отчет',
      cancel: 'Отмена',
      addPhoto: 'Добавить фото',
      changePhoto: 'Изменить фото'
    },
    details: {
      resolved: 'Решено',
      aiTitle: 'TozaAI Анализ',
      analyzeBtn: 'Анализировать',
      analyzing: 'Анализ...',
      severity: 'Серьезность',
      health: 'Влияние на здоровье',
      recommendation: 'Рекомендация',
      placeholder: 'Нажмите кнопку анализа, чтобы получить оценку от ИИ.',
      support: 'Поддержать',
      supported: 'Вы поддержали',
      fix: 'Я исправил!',
      back: 'Назад',
      status: {
        [ReportStatus.NEW]: 'Новая',
        [ReportStatus.VERIFIED]: 'Подтверждена',
        [ReportStatus.RESOLVED]: 'Решена',
        [ReportStatus.IN_PROGRESS]: 'В работе'
      }
    },
    profile: {
      pointsLabel: 'Баллов экологии',
      reportsLabel: 'Отчетов подано',
      achievements: 'Достижения',
      settings: 'Настройки',
      notifications: 'Уведомления',
      language: 'Язык',
      help: 'Помощь',
      logout: 'Выйти',
      badges: {
        novice: 'Новичок',
        reporter: 'Репортер',
        volunteer: 'Волонтер'
      }
    },
    categories: {
      [PollutionCategory.TRASH]: 'Мусор',
      [PollutionCategory.AIR]: 'Воздух',
      [PollutionCategory.WATER]: 'Вода',
      [PollutionCategory.NOISE]: 'Шум',
      [PollutionCategory.CONSTRUCTION]: 'Стройка',
      [PollutionCategory.OTHER]: 'Другое'
    },
    toast: {
        added: 'Отчет успешно добавлен! +10 баллов',
        fixed: 'Спасибо за помощь! Начислено +50 баллов.'
    },
    aqi: {
        good: 'Отлично',
        moderate: 'Нормально',
        sensitive: 'Вредно для уязвимых',
        unhealthy: 'Вредно',
        hazardous: 'Опасно',
        label: 'AQI Ташкент'
    }
  },
  uz: {
    nav: { map: 'Xarita', add: "Qo'shish", profile: 'Profil', guide: "Qo'llanma" },
    map: { all: 'Barchasi', locate: 'Joylashuvim' },
    guide: {
        title: "Eko-Qo'llanma",
        subtitle: 'Saralash qoidalari va foydali aloqalar',
        preparationTitle: 'Tayyorgarlik',
        sortTitle: 'Nima topshirish mumkin',
        forbiddenTitle: 'Qabul qilinmaydi',
        contactsTitle: 'Xizmatlar va aloqalar',
        workingHours: 'Ish vaqti',
        phone: 'Telefon',
        accepts: 'Qabul qiladi'
    },
    auth: {
      title: 'Xush kelibsiz',
      subtitle: 'Shaharni tozalash uchun hisob yarating',
      uploadPhoto: 'Rasm yuklash',
      nickname: 'Nikneym (noyob)',
      name: 'Ismingiz',
      password: 'Parol',
      register: 'Ro\'yxatdan o\'tish',
      errorNickTaken: 'Bu nikneym band',
      errorFillAll: 'Barcha maydonlarni to\'ldiring'
    },
    form: {
      title: 'Yangi muammo',
      step1Title: 'Nima sodir bo\'ldi?',
      step1Desc: 'Ifloslanish toifasini tanlang',
      step2Title: 'Bu qayerda?',
      step2Desc: 'Rasm yuklang va manzilni tekshiring',
      locationFound: 'Joylashuv aniqlandi',
      placeholderDesc: 'Muammoni batafsil tavsiflang...',
      submit: 'Yuborish',
      cancel: 'Bekor qilish',
      addPhoto: 'Rasm qo\'shish',
      changePhoto: 'Rasmni o\'zgartirish'
    },
    details: {
      resolved: 'Hal qilindi',
      aiTitle: 'TozaAI Tahlili',
      analyzeBtn: 'Tahlil qilish',
      analyzing: 'Tahlil...',
      severity: 'Jiddiylik',
      health: 'Sog\'liqqa ta\'siri',
      recommendation: 'Tavsiya',
      placeholder: 'AI bahosini olish uchun tahlil tugmasini bosing.',
      support: 'Qo\'llab-quvvatlash',
      supported: 'Qo\'llab-quvvatladingiz',
      fix: 'Men tuzatdim!',
      back: 'Orqaga',
      status: {
        [ReportStatus.NEW]: 'Yangi',
        [ReportStatus.VERIFIED]: 'Tasdiqlangan',
        [ReportStatus.RESOLVED]: 'Hal qilingan',
        [ReportStatus.IN_PROGRESS]: 'Jarayonda'
      }
    },
    profile: {
      pointsLabel: 'Ekologiya ballari',
      reportsLabel: 'Hisobotlar',
      achievements: 'Yutuqlar',
      settings: 'Sozlamalar',
      notifications: 'Bildirishnomalar',
      language: 'Til',
      help: 'Yordam',
      logout: 'Chiqish',
      badges: {
        novice: 'Boshlovchi',
        reporter: 'Muxbir',
        volunteer: 'Ko\'ngilli'
      }
    },
    categories: {
      [PollutionCategory.TRASH]: 'Chiqindi',
      [PollutionCategory.AIR]: 'Havo',
      [PollutionCategory.WATER]: 'Suv',
      [PollutionCategory.NOISE]: 'Shovqin',
      [PollutionCategory.CONSTRUCTION]: 'Qurilish',
      [PollutionCategory.OTHER]: 'Boshqa'
    },
    toast: {
        added: 'Hisobot muvaffaqiyatli qo\'shildi! +10 ball',
        fixed: 'Yordamingiz uchun rahmat! +50 ball berildi.'
    },
    aqi: {
        good: 'A\'lo',
        moderate: 'O\'rtacha',
        sensitive: 'Ta\'sirchanlar uchun zararli',
        unhealthy: 'Zararli',
        hazardous: 'Xavfli',
        label: 'Toshkent AQI'
    }
  },
  en: {
    nav: { map: 'Map', add: 'Add', profile: 'Profile', guide: 'Guide' },
    map: { all: 'All', locate: 'My Location' },
    guide: {
        title: 'Eco-Guide',
        subtitle: 'Sorting rules and useful contacts',
        preparationTitle: 'Preparation',
        sortTitle: 'Accepted Items',
        forbiddenTitle: 'Not Accepted',
        contactsTitle: 'Services & Contacts',
        workingHours: 'Working Hours',
        phone: 'Phone',
        accepts: 'Accepts'
    },
    auth: {
      title: 'Welcome',
      subtitle: 'Create an account to clean up the city',
      uploadPhoto: 'Upload Photo',
      nickname: 'Nickname (unique)',
      name: 'Your Name',
      password: 'Password',
      register: 'Register',
      errorNickTaken: 'This nickname is taken',
      errorFillAll: 'Please fill all fields'
    },
    form: {
      title: 'New Issue',
      step1Title: 'What happened?',
      step1Desc: 'Select pollution category',
      step2Title: 'Where is it?',
      step2Desc: 'Add a photo and check location',
      locationFound: 'Location found',
      placeholderDesc: 'Describe the issue in detail...',
      submit: 'Submit Report',
      cancel: 'Cancel',
      addPhoto: 'Add Photo',
      changePhoto: 'Change Photo'
    },
    details: {
      resolved: 'Resolved',
      aiTitle: 'TozaAI Analysis',
      analyzeBtn: 'Analyze',
      analyzing: 'Analyzing...',
      severity: 'Severity',
      health: 'Health Impact',
      recommendation: 'Recommendation',
      placeholder: 'Press analyze button to get AI assessment.',
      support: 'Support',
      supported: 'Supported',
      fix: 'I fixed it!',
      back: 'Back',
      status: {
        [ReportStatus.NEW]: 'New',
        [ReportStatus.VERIFIED]: 'Verified',
        [ReportStatus.RESOLVED]: 'Resolved',
        [ReportStatus.IN_PROGRESS]: 'In Progress'
      }
    },
    profile: {
      pointsLabel: 'Eco Points',
      reportsLabel: 'Reports Filed',
      achievements: 'Achievements',
      settings: 'Settings',
      notifications: 'Notifications',
      language: 'Language',
      help: 'Help',
      logout: 'Logout',
      badges: {
        novice: 'Novice',
        reporter: 'Reporter',
        volunteer: 'Volunteer'
      }
    },
    categories: {
      [PollutionCategory.TRASH]: 'Trash',
      [PollutionCategory.AIR]: 'Air',
      [PollutionCategory.WATER]: 'Water',
      [PollutionCategory.NOISE]: 'Noise',
      [PollutionCategory.CONSTRUCTION]: 'Construction',
      [PollutionCategory.OTHER]: 'Other'
    },
    toast: {
        added: 'Report successfully added! +10 points',
        fixed: 'Thanks for helping! +50 points awarded.'
    },
    aqi: {
        good: 'Good',
        moderate: 'Moderate',
        sensitive: 'Unhealthy for Sensitive',
        unhealthy: 'Unhealthy',
        hazardous: 'Hazardous',
        label: 'Tashkent AQI'
    }
  }
};

