import {ErrorResponse} from "./ErrorResponse";

export type APIResponse<ResponseType> = ResponseType | ErrorResponse;
