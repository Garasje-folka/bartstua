import { DateHour } from "./dateHour";
export declare const eventDataSchema: import("yup/lib/object").OptionalObjectSchema<{
    spacesTaken: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    date: any;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    spacesTaken: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    date: any;
}>>;
export declare type EventData = {
    spacesTaken: number;
    date: DateHour;
};
export declare const initialEventData: (dateHour: DateHour) => EventData;
export declare const duplicateEventData: (oldEventData: EventData) => EventData;
