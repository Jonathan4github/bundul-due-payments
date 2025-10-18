import { Payment } from '../types/payment.types';

/**
 * Mock payment data for testing and development
 * Includes a variety of services with different due dates
 */
export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 1,
    service: 'Netflix',
    amount: 14.99,
    dueDate: '2025-10-19',
    category: 'Entertainment',
    color: '#E50914',
    icon: '🎬',
  },
  {
    id: 2,
    service: 'Apple One',
    amount: 29.99,
    dueDate: '2025-11-01',
    category: 'Productivity',
    color: '#000000',
    icon: '🍎',
  },
  {
    id: 3,
    service: 'Spotify',
    amount: 9.99,
    dueDate: '2025-10-18',
    category: 'Music',
    color: '#1DB954',
    icon: '🎵',
  },
  {
    id: 4,
    service: 'Amazon Prime',
    amount: 12.99,
    dueDate: '2025-10-20',
    category: 'Shopping',
    color: '#FF9900',
    icon: '📦',
  },
  {
    id: 5,
    service: 'Disney+',
    amount: 7.99,
    dueDate: '2025-10-25',
    category: 'Entertainment',
    color: '#113CCF',
    icon: '🏰',
  },
  {
    id: 6,
    service: 'YouTube Premium',
    amount: 11.99,
    dueDate: '2025-10-22',
    category: 'Entertainment',
    color: '#FF0000',
    icon: '▶️',
  },
  {
    id: 7,
    service: 'Adobe Creative Cloud',
    amount: 54.99,
    dueDate: '2025-11-05',
    category: 'Productivity',
    color: '#FF0000',
    icon: '🎨',
  },
  {
    id: 8,
    service: 'GitHub Pro',
    amount: 4.0,
    dueDate: '2025-10-21',
    category: 'Developer Tools',
    color: '#181717',
    icon: '💻',
  },
];
