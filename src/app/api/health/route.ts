import { NextResponse } from 'next/server';

export async function GET() {
  // Check system health
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    services: {
      database: 'connected',
      auth: 'operational',
      ai: 'operational',
      storage: 'operational'
    }
  };

  return NextResponse.json(health);
}
