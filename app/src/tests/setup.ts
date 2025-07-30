// Mock Next.js imports
vi.mock('next/image', () => ({
  default: () => {
    return {
      type: 'img',
      props: {
        'data-testid': 'next-image',
      },
    }
  },
  __esModule: true,
}))