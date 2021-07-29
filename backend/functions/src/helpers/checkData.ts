import * as yup from "yup";

export const checkData = async (data: any, schema: yup.SchemaOf<any>) => {
  try {
    await schema.validate(data);
    return true;
  } catch (error) {
    return false;
  }
};
