import { NextResponse } from "next/server";

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const xummModule = require("xumm");
  return NextResponse.json({
    keys: Object.keys(xummModule),
    typeofDefault: typeof xummModule.default,
    typeofXumm: typeof xummModule.Xumm,
    typeofModule: typeof xummModule,
  });
}