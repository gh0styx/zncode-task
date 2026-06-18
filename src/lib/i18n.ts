export const dictionary = {
  ru: {
    orders: 'Приходы',
    products: 'Продукты',
    groups: 'Группы',
    users: 'Пользователи',
    settings: 'Настройки',
    search: 'Поиск',
    type: 'Тип',
    specification: 'Спецификация',
    deleteOrderQuestion: 'Вы уверены, что хотите удалить этот приход?',
    cancel: 'Отменить',
    delete: 'Удалить',
    free: 'Свободен',
    repair: 'В ремонте',
    new: 'новый',
    used: 'Б / У',
    sessions: 'активных вкладок'
  },
  en: {
    orders: 'Orders',
    products: 'Products',
    groups: 'Groups',
    users: 'Users',
    settings: 'Settings',
    search: 'Search',
    type: 'Type',
    specification: 'Specification',
    deleteOrderQuestion: 'Are you sure you want to delete this order?',
    cancel: 'Cancel',
    delete: 'Delete',
    free: 'Available',
    repair: 'Repair',
    new: 'new',
    used: 'used',
    sessions: 'active tabs'
  }
};

export type Locale = keyof typeof dictionary;
