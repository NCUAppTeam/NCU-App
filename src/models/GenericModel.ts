// GenericModel class
export default abstract class GenericModel {
    // Abstract property for table name
    static TABLE_NAME: string;

    static DATABASE_MAP: Object;

    // Abstract method for parsing JSON
    static parseJson(json: any): GenericModel {
        throw new Error("parseJson method not implemented.");
        return json
    }
}
