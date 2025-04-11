import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../test/route';
import { GET as getHealth } from '../health/route';

describe('API Integration Tests', () => {
  it('should return correct response from test endpoint', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('message', 'API is working correctly');
  });

  it('should return health information', async () => {
    const response = await getHealth();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status', 'healthy');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('uptime');
    expect(data).toHaveProperty('services');
    expect(data.services).toHaveProperty('database', 'connected');
    expect(data.services).toHaveProperty('auth', 'operational');
  });
});
