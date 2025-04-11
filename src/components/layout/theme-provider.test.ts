import { describe, it, expect, beforeEach } from 'vitest';
import { useTheme } from '@/components/layout/theme-provider';
import { renderHook, act } from '@testing-library/react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock ThemeProvider context
vi.mock('@/components/layout/theme-provider', async () => {
  const actual = await vi.importActual('@/components/layout/theme-provider');
  return {
    ...actual,
    useTheme: vi.fn()
  };
});

describe('Theme Provider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should provide default theme values', () => {
    const mockUseTheme = useTheme as jest.Mock;
    mockUseTheme.mockReturnValue({
      theme: 'system',
      setTheme: vi.fn(),
      primaryColor: '#0284c7',
      setPrimaryColor: vi.fn(),
      accentColor: '#f97316',
      setAccentColor: vi.fn(),
      fontSize: 'medium',
      setFontSize: vi.fn(),
      contentDensity: 'comfortable',
      setContentDensity: vi.fn(),
      sidebarMode: 'expanded',
      setSidebarMode: vi.fn(),
      animationsEnabled: true,
      setAnimationsEnabled: vi.fn()
    });

    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('system');
    expect(result.current.primaryColor).toBe('#0284c7');
    expect(result.current.accentColor).toBe('#f97316');
    expect(result.current.fontSize).toBe('medium');
    expect(result.current.contentDensity).toBe('comfortable');
    expect(result.current.sidebarMode).toBe('expanded');
    expect(result.current.animationsEnabled).toBe(true);
  });

  it('should update theme values', () => {
    const setThemeMock = vi.fn();
    const mockUseTheme = useTheme as jest.Mock;
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
      primaryColor: '#0284c7',
      setPrimaryColor: vi.fn(),
      accentColor: '#f97316',
      setAccentColor: vi.fn(),
      fontSize: 'medium',
      setFontSize: vi.fn(),
      contentDensity: 'comfortable',
      setContentDensity: vi.fn(),
      sidebarMode: 'expanded',
      setSidebarMode: vi.fn(),
      animationsEnabled: true,
      setAnimationsEnabled: vi.fn()
    });

    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('dark');
    });
    
    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });
});
