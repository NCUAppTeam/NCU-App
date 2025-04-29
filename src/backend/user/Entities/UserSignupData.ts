
export default class UserSignupData {
    public name: string = ''
    public email: string = ''
    public password: string = ''
    public studentId: string = ''
    public username: string = ''

    constructor(userSignupData: { name: string, email: string, password: string, studentId: string, username: string }) {
        this.name = userSignupData.name;
        this.email = userSignupData.email;
        this.password = userSignupData.password;
        this.studentId = userSignupData.studentId;
        this.username = userSignupData.username;
    }
}