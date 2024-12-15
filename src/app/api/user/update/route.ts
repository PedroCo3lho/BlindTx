import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { programId, address, tx } = await req.json();
    if (!programId || !address) {
      return new NextResponse(
        JSON.stringify({
          error: `Parameters programId and address are required`,
        }),
        { status: 400 }
      );
    }

    const programDocRef = doc(db, "programsWL", programId);
    const docSnap = await getDoc(programDocRef);

    if (docSnap.exists()) {
      const users = docSnap.data()?.users;
      const userIndex = users?.findIndex((user: any) => user.address === address);

      if (userIndex === -1) {
        return new NextResponse(
          JSON.stringify({
            message: "User not found in this program.",
          }),
          { status: 404 }
        );
      }

      // Update the 'minted' property of the found user
      users[userIndex].minted = true;
      users[userIndex].txHash = tx;

      await updateDoc(programDocRef, { users: users });

      return new NextResponse(
        JSON.stringify({
          message: "User 'minted' status updated successfully",
        }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          message: "Program not found.",
        }),
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