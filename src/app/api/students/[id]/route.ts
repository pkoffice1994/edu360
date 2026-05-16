import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "db", "students.json");

function readDB() {
  if (!existsSync(DB_PATH)) return [];
  try { return JSON.parse(readFileSync(DB_PATH, "utf-8")); } catch { return []; }
}
function writeDB(data: unknown[]) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const students = readDB();
    const updated = students.filter((s: { id: string }) => s.id !== params.id);
    writeDB(updated);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const students = readDB();
  const student = students.find((s: { id: string }) => s.id === params.id);
  if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ student });
}
