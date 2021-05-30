//Tạo đối tượng dssv từ lớp đối tượng DanhSachSinhVien
var dssv = new DanhSachSinhVien();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

/**
 * lấy data từ localStorage show ra ngoài table
 */
getLocalStorage();

function layDuLieuDauVao(isAdd){
    var _maSV = getEle("txtMaSV").value;
    var _tenSV = getEle("txtTenSV").value;
    var _email = getEle("txtEmail").value;
    var _matKhau = getEle("txtPass").value;
    var _ngaySinh = getEle("txtNgaySinh").value;
    var _khoaHoc = getEle("khSV").value;
    var _diemToan = getEle("txtDiemToan").value;
    var _diemLy = getEle("txtDiemLy").value;
    var _diemHoa = getEle("txtDiemHoa").value;

    var isValid = true;

    /**
     * Validation (kiểm tra tính hợp lệ của dữ liệu đầu vào)
     */
    //Kiểm tra Validation cho input maSV
    if(isAdd){
    isValid &=
        validation.kiemTraRong(_maSV, "divMaErr", "(*) Mã SV k dc rỗng") &&
        validation.kiemTraDoDaiKyTu(
            _maSV,
            "divMaErr",
            "(*) Độ dài ký tự từ 4 - 10",
            4,
            10
        ) &&
        validation.kiemTraMaSVTrung(
            _maSV,
            "divMaErr",
            "(*) Mã SV đã tồn tại!",
            dssv.list
        );
    }

    isValid &=
        validation.kiemTraRong(_tenSV, "divTenErr", "(*) Ten SV k dc rong") &&
        validation.kiemTraKyTuChuoi(
            _tenSV,
            "divTenErr",
            "(*) Tên SV phải là chữ"
        );

    isValid &=
        validation.kiemTraRong(_email, "divEmailErr", "(*) Email k dc rong") &&
        validation.kiemTraEmail(
            _email,
            "divEmailErr",
            "Email k đúng định dạng!"
        );

    isValid &=
        validation.kiemTraRong(
            _matKhau,
            "divMatKhauErr",
            "(*) Mat khau k dc rong"
        ) &&
        validation.kiemTraMatKhau(
            _matKhau,
            "divMatKhauErr",
            "(*) Mật khẩu chưa đúng định dạng!"
        );

    isValid &=
        validation.kiemTraRong(
            _ngaySinh,
            "divNgaySinhErr",
            "(*) Ngay sinh k dc rong"
        ) &&
        validation.kiemTraNgaySinh(
            _ngaySinh,
            "divNgaySinhErr",
            "(*) Ngày sinh k đúng định dạng!"
        );

    isValid &= validation.kiemTraKhoaHoc(
        "khSV",
        "divKHErr",
        "(*) Vui lòng chọn KH"
    );

    isValid &=
        validation.kiemTraRong(
            _diemToan,
            "divToanErr",
            "(*) Diem Toan k dc rong"
        ) &&
        validation.kiemTraSo(
            _diemToan,
            "divToanErr",
            "(*) Vui lòng nhập vào số"
        );

    isValid &=
        validation.kiemTraRong(_diemLy, "divLyErr", "(*) Diem Ly k dc rong") &&
        validation.kiemTraSo(_diemLy, "divLyErr", "(*) Vui lòng nhập vào số");

    isValid &=
        validation.kiemTraRong(
            _diemHoa,
            "divHoaErr",
            "(*) Diem Hoa k dc rong"
        ) &&
        validation.kiemTraSo(_diemHoa, "divHoaErr", "(*) Vui lòng nhập vào số");

    //Tạo đối tượng sinhVien từ lớp đối tượng SinhVien
    //Từ khóa new: tạo đối tượng từ lớp đối tượng
    if(isValid){
    var sinhVien = new SinhVien(
        _maSV,
        _tenSV,
        _email,
        _matKhau,
        _ngaySinh,
        _khoaHoc,
        _diemToan,
        _diemLy,
        _diemHoa
    );
    return sinhVien;
    }
    return null;
}


/**
 * Thêm sinh viên
 */
// getEle("btnAdd").onclick = function () {
//     console.log(123);
// };

//callback function: tham số của 1 hàm, là 1 hàm khác
getEle("btnAdd").addEventListener("click", function (event) {
    //Chặn reload trang web
    event.preventDefault();
    var sinhVien = layDuLieuDauVao(true);
    //Kiểm tra => Nếu như thông tin hợp lệ => Add SV
    if (sinhVien) {
        sinhVien.tinhDTB();
        dssv.themSinhVien(sinhVien);
        taoBang(dssv.list);

        //Lưu mảng list xuống localStorage
        setLocalStorage();
    }
});

function taoBang(arr) {
    //reset tbody
    getEle("tbodySinhVien").innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        //Tạo dòng (tr)
        var tagTR = document.createElement("tr");

        //Tạo cột (td) - 6 cột
        var tagTD_MaSV = document.createElement("td");
        var tagTD_TenSV = document.createElement("td");
        var tagTD_Email = document.createElement("td");
        var tagTD_NgaySinh = document.createElement("td");
        var tagTD_KhoaHoc = document.createElement("td");
        var tagTD_DTB = document.createElement("td");
        var tagTD_Button_Edit = document.createElement("td");
        var tagTD_Button_Delete = document.createElement("td");

        //Tạo nội dung cho 7 cột
        tagTD_MaSV.innerHTML = arr[i].maSV;
        tagTD_TenSV.innerHTML = arr[i].tenSV;
        tagTD_Email.innerHTML = arr[i].email;
        tagTD_NgaySinh.innerHTML = arr[i].ngaySinh;
        tagTD_KhoaHoc.innerHTML = arr[i].khoaHoc;
        tagTD_DTB.innerHTML = arr[i].diemTB;
        tagTD_Button_Edit.innerHTML = '<button class="btn btn-info" onclick="suaSinhVien(\'' + arr[i].maSV + '\')">Sửa</button>';
        tagTD_Button_Delete.innerHTML =
            '<button class="btn btn-danger" onclick="xoaSinhVien(\'' + arr[i].maSV + '\')">Xóa</button>';
            

        //appendChild 6 cột vào dòng
        tagTR.appendChild(tagTD_MaSV);
        tagTR.appendChild(tagTD_TenSV);
        tagTR.appendChild(tagTD_Email);
        tagTR.appendChild(tagTD_NgaySinh);
        tagTR.appendChild(tagTD_KhoaHoc);
        tagTR.appendChild(tagTD_DTB);
        tagTR.appendChild(tagTD_Button_Edit);
        tagTR.appendChild(tagTD_Button_Delete);

        //appendChild dòng vào tbody
        getEle("tbodySinhVien").appendChild(tagTR);
    }
}

/**
 * Xóa Sinh Viên
 */
function xoaSinhVien(maSV) {
    dssv._xoaSinhVien(maSV);
    taoBang(dssv.list);
    setLocalStorage();
}

function suaSinhVien(maSV){
    var sinhVien = dssv.layThongTinSinhVien(maSV);
    //Mo lai nut Button
    getEle("btnUpdate").style.display = "inline-block";
    //Dom toi cac the input roi show ra value
    getEle("txtMaSV").value = sinhVien.maSV;
    getEle("txtMaSV").disabled = true;
    getEle("txtTenSV").value = sinhVien.tenSV;
    getEle("txtEmail").value = sinhVien.email;
    getEle("txtPass").value = sinhVien.matKhau;
    getEle("txtNgaySinh").value = sinhVien.ngaySinh;
    getEle("khSV").value = sinhVien.khoaHoc;
    getEle("txtDiemToan").value = sinhVien.diemToan;
    getEle("txtDiemLy").value = sinhVien.diemLy;
    getEle("txtDiemHoa").value = sinhVien.diemHoa;
}

getEle("btnUpdate").addEventListener("click", function(){
    var sinhVien = layDuLieuDauVao(false);
    sinhVien.tinhDTB(sinhVien);
    dssv.capNhatSinhVien(sinhVien);
    taoBang(dssv.list);
    setLocalStorage();
});

getEle("btnReset").addEventListener("click", function(){
    getEle("formSV").reset();
    getEle("btnUpdate").style.display = "none";
    getEle("txtMaSV").disabled = false;
});

function setLocalStorage() {
    //chuyển kiểu JSON => String (JSON.stringify)
    var arrString = JSON.stringify(dssv.list);
    localStorage.setItem("DSSV", arrString);
}

/**
 * Tìm kiếm Sinh Viên
 */

getEle("txtSearch").addEventListener("keyup", function(){
    var keyWork = getEle("txtSearch").value;
    // dssv.timKiemSinhVien(keyWork);
    var mangTimKiem = dssv.timKiemSinhVien(keyWork);
    taoBang(mangTimKiem);
});

function getLocalStorage() {
    //Chuyển từ kiểu String => JSON
    if (localStorage.getItem("DSSV")) {
        var data = localStorage.getItem("DSSV");
        dssv.list = JSON.parse(data);
        taoBang(dssv.list);
    }
}
