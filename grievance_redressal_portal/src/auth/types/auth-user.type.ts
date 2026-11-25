import type { UserRole } from '../../generated/prisma/enums';
// Can this interface be replaced by a class that imports existing defintions of these fields?
export interface AuthUser {
    user_id: number;
    user_email: string;
    user_role: UserRole;
    user_is_moderator: boolean;
    outlet_id: number | null;
}