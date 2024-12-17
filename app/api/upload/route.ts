import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueFilename = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), 'public/uploads', uniqueFilename);
    await writeFile(path, buffer);
    return NextResponse.json({
      url: `/uploads/${uniqueFilename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}