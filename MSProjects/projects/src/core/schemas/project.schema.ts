import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProjectStatus } from '../dto/create-project.dto';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop({ required: true})
    name: string;

    @Prop()
    idProject: number;

    @Prop()
    description: string;

    @Prop()
    state?: ProjectStatus;

    @Prop()
    dateStart: string;

    @Prop()
    dateUpdate?: string;

    @Prop()
    deliveryDate: string;

    @Prop()
    updates?: string[]

    @Prop()
    expectedBilling: number;

    @Prop()
    onGoingCosts: number;

    @Prop({ required: false})
    department?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);