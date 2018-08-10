import {Media} from "./media";
import {User} from "./user";

export class UserPojo {
    id: number;
    email: string;
    fullname ?: string;
    photo ?: Media;
    created: string;
    updated: string;
    
    constructor(u: User, m ?: Media) {
        this.id = u.id;
        this.email = u.email;
        this.fullname = (u.fullname) ? u.fullname : '';
        this.photo = (m) ? m : null;
        this.created = u.created;
        this.updated = u.updated;
    }

    deconstruct(up: UserPojo) : User {
        let returnUser = new User();
        returnUser.id = up.id;
        returnUser.email = up.email;
        returnUser.fullname = (up.fullname) ? up.fullname : '';
        returnUser.photo = (up.photo) ? up.photo.id : null;
        returnUser.created = up.created;
        returnUser.updated = up.updated;
        return returnUser;
    }
}