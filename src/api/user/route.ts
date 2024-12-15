import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const program = req.nextUrl.searchParams.get("program");
    const docRef = collection(db, "programWL");
    const querySnapshot = await getDocs(docRef);
    const docSnap = querySnapshot.docs.find(doc => doc.id === program);

    if (docSnap) {
      const userData = docSnap;
      return new NextResponse(JSON.stringify({ user: userData }), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "Fetch error" }), {
        status: 404,
      });
    }
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({ message: "Erro ao buscar documento" }),
      {
        status: 500,
      }
    );
  }
};

