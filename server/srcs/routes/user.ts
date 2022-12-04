import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserSchema } from "../database/schema";

const router = express.Router();

async function verifAdmin(req: any, res: any, next: any) {
    if (req.user.username === process.env.ADMIN_ID && await bcrypt.compare(process.env.ADMIN_PSWD!, req.user.password))
        next();
    else return res.status(400).send("Routes not allowed please connect as admin");
}

router.get(
    "/users",
    verifAdmin,
    async (req, res, next) => {
        const userModel = mongoose.model('UserModel', UserSchema);
        const users = await userModel.find();
        return res.status(200).json(users);
    }
)

router.delete(
    "/users/:id",
    verifAdmin,
    async (req, res, next) => {
        const userModel = mongoose.model('UserModel', UserSchema);

        if (req.params.id.length != 24)
            return res.status(400).send("User does not exist");

        const deleted = await userModel.findOneAndDelete({_id: req.params.id});
        if (deleted == null)
            return res.status(400).send("User does not exist");
        return res.sendStatus(200);
    }
)

module.exports = router;