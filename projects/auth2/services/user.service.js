import { PrismaClient } from "../../generated/prisma";
import { hashPassword } from "../utils/auth";
import crypto from "crypto";

const prisma = new PrismaClient();

/**
 * Create a new user with hashed password
 */
export const createUser = async (userData) => {
  // Hash the password before saving
  const hashedPassword = await hashPassword(userData.password);

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Create the user with hashed password
  const user = await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      verificationToken: verificationToken,
      passwordtoken: "",
      passwordresetexpiry: "",
    },
  });

  return user;
};

/**
 * Update user password
 */
export const updateUserPassword = async (userId, newPassword) => {
  const hashedPassword = await hashPassword(newPassword);

  return await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
};
