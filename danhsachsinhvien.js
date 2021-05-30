function DanhSachSinhVien() {
    this.list = [];

    this.themSinhVien = function (sv) {
        this.list.push(sv);
    };

    this._timViTri = function (maSV) {
        /**
         * * tìm vị trí maSV muốn xóa thông qua mảng list
         * 0. var index = -1;
         * 1. duyệt mảng this.list
         * 2. Nếu item.maSV == maSV => lấy index (i)
         * 3. splice(index, 1);
         */
        var index = -1;
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].maSV == maSV) {
                index = i;
                break;
            }
        }
        return index;
    };

    this._xoaSinhVien = function (maSV) {
        var index = this._timViTri(maSV);
        //Xóa SV
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    };
    this.layThongTinSinhVien = function(maSV){
        var index = this._timViTri(maSV);
        if(index !== -1){
            return this.list[index];
        }
    };
    this.capNhatSinhVien = function(sinhVien){
        var index = this._timViTri(sinhVien.maSV);
        if(index !== -1){
            this.list[index] = sinhVien;
        }
    };
    // this.timKiemSinhVien = function(){

    // }
}

DanhSachSinhVien.prototype.timKiemSinhVien = function(keyWork){
    /**
     * 0. Tạo mangTimKiem = [];
     * 1. Duyệt mảng list
     * 2. Nếu như keywork trùng với sinhVien.tenSV
     * 3.Trả về mangTimKiem
     */
    var mangTimKiem = [];
    for(var i = 0; i<this.list.length;i++){
        if(this.list[i].tenSV.toLowerCase().indexOf(keyWork.toLowerCase()) !== -1){
            mangTimKiem.push(this.list[i])
        }
    }
    return mangTimKiem;
}
