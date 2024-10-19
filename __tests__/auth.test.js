import { login } from '../src/js/api/auth/login';
import { logout } from '../src/js/api/auth/logout';


const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Authentication-login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login stores a token when provided with valid credentials', async () => {
    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: 'fake-token' }),
        ok: true
      })
    );

    await login('validuser@example.com', 'password123');

    expect(localStorage.setItem).toHaveBeenCalledWith('profile', expect.stringContaining('fake-token'));
  });
});

describe('Authentication-logout', () => {

  test('logout clears the token from browser storage', () => {
    localStorage.setItem('token', 'fake-token');

    logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});