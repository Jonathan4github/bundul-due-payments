# Bundul Due Payments

![Tests](https://img.shields.io/badge/tests-109%20passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-94.92%25-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61dafb)
![Expo](https://img.shields.io/badge/Expo-54.0-000020)

A React Native mobile application for viewing and managing upcoming subscription payments. Built with Expo and TypeScript, this app provides a clean and intuitive interface for tracking payment due dates with urgency indicators.

## 📱 Features

- **Payment Dashboard** - View all upcoming subscription payments in one place
- **Smart Sorting** - Payments prioritized by status (Overdue → Due Soon → Upcoming)
- **Overdue Alerts** - "Overdue" badges for past-due payments with darker red border
- **Urgency Indicators** - "Due Soon" badges with pulse animation for payments due within 3 days
- **Urgent Highlighting** - Light red background for payments requiring immediate attention
- **Total Overview** - See total amount due and breakdown of urgent payments at a glance
- **Pull-to-Refresh** - Swipe down to reload payment data
- **Payment Actions** - "Pay Now" and "Pay Later" options with confirmation modals
- **Responsive Design** - Clean UI that works across different screen sizes

## 🛠 Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** (~54.0.13) - Development platform and tooling
- **TypeScript** (~5.9.2) - Type-safe JavaScript
- **Jest** (^30.2.0) - Testing framework
- **React Native Testing Library** (^13.3.3) - Component testing utilities
- **ESLint & Prettier** - Code quality and formatting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download here](https://nodejs.org/))
- **npm** or **yarn**
- **Expo Go app** (for testing on physical device)
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bundul-due-payments.git
cd bundul-due-payments
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npx expo start
```

**Note:** If you encounter network issues, use the offline flag:

```bash
npx expo start --offline
```

### 4. Run the App

After starting the dev server:

- **On Physical Device**:
  1. Install Expo Go app
  2. Scan the QR code shown in the terminal

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

**Test Coverage:** The project includes 109 comprehensive tests with 94.92% overall coverage:
- **Utility Tests (95.74% coverage)**:
  - Date formatting and calculations (89.47% coverage)
  - Currency formatting (100% coverage)
  - Payment sorting, filtering, and calculations (100% coverage)
- **Component Tests (100% coverage)**:
  - PaymentCard rendering and interactions (100% coverage)
  - DueSoonBadge animations (100% coverage)
  - StatusBadge rendering and styling (100% coverage)
  - TotalDueHeader display logic with overdue and urgent badges (100% coverage)
  - ErrorBoundary error handling (100% coverage)
- **Screen Tests (85.71% coverage)**:
  - DuePaymentsScreen states and interactions
- **Hook Tests (94.11% coverage)**:
  - usePayments data fetching, sorting, and state management

## 📁 Project Structure

```
bundul-due-payments/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── PaymentCard.tsx
│   │   ├── DueSoonBadge.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── TotalDueHeader.tsx
│   │   └── ErrorBoundary.tsx
│   ├── screens/             # Main app screens
│   │   └── DuePaymentsScreen.tsx
│   ├── utils/               # Helper functions
│   │   ├── dateUtils.ts
│   │   ├── currencyUtils.ts
│   │   └── paymentUtils.ts
│   ├── hooks/               # Custom React hooks
│   │   └── usePayments.ts
│   ├── types/               # TypeScript type definitions
│   │   └── payment.types.ts
│   ├── constants/           # App constants
│   │   ├── colors.ts
│   │   └── mockData.ts
│   └── __tests__/           # Test files
│       ├── dateUtils.test.ts
│       ├── currencyUtils.test.ts
│       ├── paymentUtils.test.ts
│       ├── PaymentCard.test.tsx
│       ├── DueSoonBadge.test.tsx
│       ├── StatusBadge.test.tsx
│       ├── TotalDueHeader.test.tsx
│       ├── DuePaymentsScreen.test.tsx
│       ├── usePayments.test.ts
│       └── ErrorBoundary.test.tsx
├── App.tsx                  # Root component
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 🎯 Key Implementation Details

### Payment Urgency Logic
- **Overdue**: Past due date - shown with "Overdue" badge and darker red border
- **Due Soon**: Payments due within 0-2 days from today
- **Upcoming**: Payments due 3+ days from today

### Custom Hooks
- **`usePayments()`**: Manages payment data fetching, sorting, and refresh state

### Utility Functions
- **Date Utils**: Format dates, calculate days until due, check urgency
- **Currency Utils**: Format amounts as currency with proper locale
- **Payment Utils**: Sort, filter, and calculate totals for payments

## 🎨 Design Decisions

- **TypeScript**: Ensures type safety and better developer experience
- **Modular Components**: Each component is self-contained and reusable
- **Pure Functions**: Utility functions are side-effect free for easy testing
- **Custom Hooks**: Business logic separated from UI components
- **Error Boundaries**: Graceful error handling with user-friendly fallback UI
- **Performance Optimization**: React.memo and useCallback for optimal rendering
- **Accessibility**: WCAG-compliant labels and roles for screen readers
- **Centralized Theming**: Color constants for consistent design system
- **Comprehensive Testing**: 109 tests with 94.92% coverage for reliability

## 📝 Mock Data

The app uses mock payment data defined in `src/constants/mockData.ts`:

## 🐛 Troubleshooting

### Network Issues During `npx expo start`

If you encounter network timeout errors:

```bash
npx expo start --offline
```

### Tests Not Running

Ensure all dependencies are installed:

```bash
npm install
```

Clear Jest cache if needed:

```bash
npx jest --clearCache
```

## 🚀 Future Improvements

- Backend API integration for real payment data
- User authentication and multi-user support
- Payment gateway integration (Stripe, PayPal)
- Push notifications for upcoming payments
- Payment history and analytics
- Multi-currency support
- Recurring payment management
- Export payment reports

## 📄 License

MIT

## 👤 Author

Jonathan Williams

## 🙏 Acknowledgments

Built as part of the Bundul Frontend Engineer Assessment.
