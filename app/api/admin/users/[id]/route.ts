import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDecodedToken, verifyToken } from '@/lib/auth';
import { ResponseClass } from '@/utils/response';

type ParamsType = { params: { id: string; } }

export async function GET(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new NextResponse('Unauthorized', { status: 401 });

  const decodedToken = getDecodedToken(request)
  if (decodedToken?.role !== "admin") return new ResponseClass().custom(403);

  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new NextResponse('Unauthorized', { status: 401 });

  const decodedToken = getDecodedToken(request)
  if (decodedToken?.role !== "admin") return new ResponseClass().custom(403);

  const id = params.id
  const { phone, password, email, firstName, lastName, role, gender } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { phone, password, email, firstName, lastName, role, gender },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new NextResponse('Unauthorized', { status: 401 });

  const decodedToken = getDecodedToken(request)
  if (decodedToken?.role !== "admin") return new ResponseClass().custom(403);

  const id = params.id
  const data = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error?.code === "P2025") {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 500 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new NextResponse('Unauthorized', { status: 401 });

  const decodedToken = getDecodedToken(request)
  if (decodedToken?.role !== "admin") return new ResponseClass().custom(403);

  const id = params.id

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}