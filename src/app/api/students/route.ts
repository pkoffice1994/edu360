import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "db", "students.json");

function readDB() {
  if (!existsSync(DB_PATH)) return [];
  try {
    return JSON.parse(readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeDB(data: unknown[]) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  const students = readDB();
  return NextResponse.json({ students, total: students.length });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, city, course, board, marks } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, phone required" }, { status: 400 });
    }

    const students = readDB();
    const newStudent = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      city: city || "",
      course: course || "",
      board: board || "",
      marks: marks || "",
      registeredAt: new Date().toISOString(),
    };

    students.push(newStudent);
    writeDB(students);

    return NextResponse.json({ success: true, student: newStudent });
  } catch (error) {
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
