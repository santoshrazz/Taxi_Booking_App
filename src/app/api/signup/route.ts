import { connectToDb } from "@/Db/db.config";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const POST = async (req: NextRequest) => {
  connectToDb();
  try {
    const { name, email, password } = await req.json();
    //----------> Checking for require field <-----------
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all the field",
        },
        { status: 400 }
      );
    }
    //----------> Checking for existing user <-----------
    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists) {
      return NextResponse.json(
        {
          success: false,
          message: "User Already Exists",
        },
        { status: 400 }
      );
    }
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //----------> Creating New user <-----------
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({
      success: true,
      message: "User Account Created",
      newUser,
    });
  } catch (error: any) {
    console.log(`Error while creating user`);
    throw new Error(error.message);
  }
};
