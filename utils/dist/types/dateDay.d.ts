import * as yup from "yup";
export declare const dateDaySchema: import("yup/lib/object").OptionalObjectSchema<{
    year: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    month: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    day: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    year: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    month: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    day: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
}>>;
export declare type DateDay = yup.InferType<typeof dateDaySchema>;
export declare const duplicateDateDay: (oldDateDay: DateDay) => DateDay;
