import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const programId = req.nextUrl.searchParams.get("programId");

    if (!programId) {
      return new NextResponse(
        JSON.stringify({ error: `Program ID is required` }),
        { status: 400 }
      );
    }

    const programDocRef = doc(db, "programsWL", programId);
    const docSnap = await getDoc(programDocRef);

    if (docSnap.exists()) {
      const users = docSnap.data()?.users;
      return new NextResponse(JSON.stringify(users), { status: 200 });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Program not found" }),
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error(error.message);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
