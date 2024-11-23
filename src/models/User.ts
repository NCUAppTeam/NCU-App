import GenericModel from "./GenericModel"

export default class User extends GenericModel {

    static TABLE_NAME = "members"
    static DATABASE_MAP: Object = {
        id:         "uuid",
        username:   "username",
        email:      "fk_email",
        identity:   "fk_identity",
        avatar:     "avatar",
    }

    public id:                  String  = ""
    public username:            String  = ""
    public email:               String  = ""
    public phone:               String  = ""
    public avatar:              String  = ""
    public profileBackground:   String  = ""
    public joinedAt:            Date    = new Date()
    public identity:            String  = ""
    public department:          String  = ""
    public grade:               String  = ""
    public bio:                 String  = ""


    static parseJson(json: any) : User {
        const user = new User()

        for (const [userProperty, jsonField] of Object.entries(this.DATABASE_MAP))
            if (json[jsonField] !== undefined)
                (user as any)[userProperty] = json[jsonField];

        return user
    }
}