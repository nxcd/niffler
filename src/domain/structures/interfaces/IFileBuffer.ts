import { Body } from "aws-sdk/clients/s3";

export interface IFileBuffer {
  buffer: Body | undefined,
  mimetype: string | undefined
}
