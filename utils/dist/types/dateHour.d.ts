import * as yup from "yup";
export declare const dateHourSchema: yup.ObjectSchema<import("yup/lib/object").Assign<{
    year: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    month: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    day: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}, {
    hour: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}>, Record<string, any>, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<{
    year: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    month: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    day: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}, {
    hour: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<{
    year: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    month: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    day: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}, {
    hour: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}>>>;
export declare type DateHour = yup.InferType<typeof dateHourSchema>;
export declare const duplicateDateHour: (oldDateHour: DateHour) => DateHour;
