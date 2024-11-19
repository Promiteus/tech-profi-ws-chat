import {BaseModel} from "./base.model";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type ChatDocument = ChatMessage & Document;

@Schema()
export class ChatMessage extends BaseModel{
    @Prop({ required: true })
    userId: string;
    @Prop({ required: true })
    fromUserId: string;
    @Prop({ required: true })
    message: string;
    @Prop({ required: true })
    room: string;
    @Prop()
    createdAt?: Date;
    @Prop()
    isRead: boolean;
    @Prop()
    isNotified: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(ChatMessage);