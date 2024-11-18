import {BaseModel} from "./base.model";
import {Prop} from "@nestjs/mongoose";

export type ChatDocument = ChatModel & Document;

export class ChatModel extends BaseModel{
    @Prop({ required: true })
    who: string;
    @Prop({ required: true })
    executorId: string;
    @Prop({ required: true })
    customerId: string;
    @Prop({ required: true })
    message: string;
    createdAt?: Date = new Date();
}