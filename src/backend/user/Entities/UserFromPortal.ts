
export default class UserFromPortal {
    public chineseName: string = '';
    public email: string = '';
    public studentId: string = '';
    public gender: number = 0;
    public academyRecords: { name: string; grad: string; studySystemNo: string } = { name: '', grad: '', studySystemNo: ''};

    constructor(userInfo: { chineseName: string; email: string; gender:number; studentId: string; academyRecords: { name: string; grad: string, studySystemNo: string } }) {
        this.chineseName = userInfo.chineseName;
        this.email = userInfo.email;
        this.studentId = userInfo.studentId;
        this.academyRecords = userInfo.academyRecords;
        this.gender = userInfo.gender;
    }
}