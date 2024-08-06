import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const prisma = new PrismaClient();
    const { email, password, username } = await req.json();

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name: username,
        password: hashedPassword,
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });

  } catch (err) {
    console.error("Error creating user:", err);
    return new Response(
      JSON.stringify({ message: "Failed to create user" }),
      { status: 500 }
    );
  }
};
