import {errorToast} from "@/common/utils/errorToast.ts";
import type {ZodType} from "zod";

import type {
  FetchBaseQueryError,
  NamedSchemaError
} from "@reduxjs/toolkit/query";

export const withZodCatch = <T extends ZodType>(schema: T) => ({
  responseSchema: schema,
  catchSchemaFailure: (error: NamedSchemaError): FetchBaseQueryError => {
    errorToast('Zod error', error.issues)
    return {
      status: 'CUSTOM_ERROR',
      error: 'schema validation failed ',
    }

  },
});
