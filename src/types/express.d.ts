import { JwtPayload } from "jsonwebtoken";

declare global{
    interface Error{
        statusCode: number;
    }

    namespace Express{
        interface Request{
            user?: JwtPayload
        }
    }
}