
export default class UserFromPortal {
    public chineseName: string = '';
    public email: string = '';
    public studentId: string = '';
    public academyRecords: { name: string; grad: string; studySystemNo: string } = { name: '', grad: '', studySystemNo: ''};

    constructor(userInfo: { chineseName: string; email: string; studentId: string; academyRecords: { name: string; grad: string, studySystemNo: string } }) {
        this.chineseName = userInfo.chineseName;
        this.email = userInfo.email;
        this.studentId = userInfo.studentId;
        this.academyRecords = userInfo.academyRecords;
    }
}