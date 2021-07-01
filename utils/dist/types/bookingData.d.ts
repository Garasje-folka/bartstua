import { DateHour } from "./dateHour";
export declare const bookingDataSchema: import("yup/lib/object").OptionalObjectSchema<{
    date: any;
    spaces: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    uid: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    date: any;
    spaces: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    uid: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
}>>;
export declare type BookingData = {
    date: DateHour;
    spaces: number;
    uid: string;
};
