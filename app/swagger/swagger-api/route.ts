import { NextResponse } from 'next/server';
import { getSwaggerSpec } from '@/lib/swagger';

export async function GET() {
  const swaggerSpec = getSwaggerSpec();
  return NextResponse.json(swaggerSpec);
}