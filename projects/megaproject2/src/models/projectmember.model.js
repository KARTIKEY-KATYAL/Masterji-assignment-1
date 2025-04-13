import { Schema } from "mongoose";
import mongoose from "mongoose";
import { UserRolesEnum, AvailableUserRoles } from "../utils/constants";

const projetmemberschema = new Schema(
  {
    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: UserRolesEnum,
      default: AvailableUserRoles.MEMBER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectMember = mongoose.model("ProjectMember", projetmemberschema);

export default ProjectMember;
