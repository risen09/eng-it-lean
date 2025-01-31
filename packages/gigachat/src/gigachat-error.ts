import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';
import { z } from 'zod';

const gigachatErrorDataSchema = z.object({
  object: z.literal('error'),
  message: z.string(),
  type: z.string(),
  param: z.string().nullable(),
  code: z.string().nullable()
});

export type GigachatErrorData = z.infer<typeof gigachatErrorDataSchema>;

export const gigachatFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: gigachatErrorDataSchema,
  errorToMessage: (data) => data.message
});
