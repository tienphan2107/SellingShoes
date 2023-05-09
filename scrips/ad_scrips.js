window.onload = function () {
  admin_menu();
};
function check_url() {
  var url = window.location.href;
  if (url.indexOf("info") != -1) return "info";
  if (url.indexOf("user") != -1) return "user";
  if (url.indexOf("product") != -1) return "product";
  if (url.indexOf("order") != -1) return "order";
  if (url.indexOf("statis") != -1) return "statis";
  return " ";
}
function admin_menu() {
  var a = document.getElementById("content_admin");
  var menu = check_url();
  if (menu == " ") return false;
  if (menu == "info") {
  }
  if (menu == "user") {
    a.innerHTML =
      '<div class="title_user"> Danh sách người đăng ký </div>\n\
      <div id="user_setting_container">\n\
      <div id="user_list"></div></div>';
    admin_user();
  }
  if (menu == "product") {
    a.innerHTML =
      '<div id="product_setting_container">\n\
      <div class="title_user" >Danh sách sản phẩm</div>\n\
      <button class="btn_xoaProduct" id="btn_themsp" type="button" onclick="show_themsp()"> Thêm sản phẩm</button>\n\
      <div id="product_list"></div></div>';
    admin_product();
  }
  if (menu == "order") {
    a.innerHTML =
      '<div id="product_setting_container">\n\
      <div class="title_user" >Danh sách đơn hàng</div>\n\
      <div id="product_list"></div></div>';
    order();
  }
  if (menu == "statis") {
  }
}
function admin_user() {
  var userarray = JSON.parse(localStorage.getItem("user"));
  var msg = "";
  for (var i = 1; i < userarray.length; i++) {
    msg +=
      '<div class="user_block" ><div>' +
      userarray[i].fname +
      " " +
      userarray[i].lname +
      '</div><div style="width:73%; text-align:center">Phone: ' +
      userarray[i].phone +
      '</div><div style="width:40%">Email: ' +
      userarray[i].email +
      '</div><div style="width:45%">Mật khẩu: <input type="password" style="font-size:20px;" id="user_mkhau' +
      i +
      '" readonly="true" value="' +
      userarray[i].mkhau +
      '"><i class="fa-solid fa-eye-slash eye" onclick="hide_password(' +
      i +
      ',this)" ></i>' +
      '<i class="fa-solid fa-eye eye" onclick="hide_password(' +
      i +
      ',this)" id="eye' +
      i +
      '" ></i>' +
      '</div><button type="button" class="btn_xoaUser" onclick="del_user(' +
      i +
      ')">Xóa user</button></div>';
  }
  console.log(msg);
  document.getElementById("user_list").innerHTML = msg;
} //style="position:fixed; background-color: rgba(0, 0, 0, 0.5);;width:100%;height:100%;z-index: 10;"
function del_user(index) {
  var userarray = JSON.parse(localStorage.getItem("user"));
  userarray.splice(index, 1);
  localStorage.setItem("user", JSON.stringify(userarray));
  admin_user();
}
function hide_password(a, obj) {
  var x = document.getElementById("user_mkhau" + a);
  var e = document.getElementById("eye" + a);
  if (x.type === "password") {
    x.type = "text";
    obj.style.display = "none";
  } else {
    x.type = "password";
    e.style.display = "inline-block";
  }
}
//fucntion san pham
function admin_product() {
  var productarray = JSON.parse(localStorage.getItem("product"));
  var msg = "";
  for (var i = 0; i < productarray.length; i++) {
    msg +=
      '<div class="product_block">\n\
        <div style="width: 13.5%;padding:0 0 0 3%;height:100%"><img style="width:100%;height:100%" src="' +
      productarray[i].product_img +
      '"></div>\n\
        <div style="width:70%">' +
      productarray[i].product_name +
      '</div>\n\
        <div class="admin_product_price" style="width:15%;height:50%;font-size:larger">Giá: ' +
      productarray[i].product_price +
      '</div>\n\
        <div style="width:30%">Nhà sản xuất: ' +
      productarray[i].product_company +
      '</div>\n\
        <div style="width:20%">ID: ' +
      productarray[i].product_id +
      '</div>\n\
        <div style="position:absolute;bottom:5%;left:50%;padding:0;width:30%"><button class="btn_xoaProduct"onclick="inner_sua_sp(' +
      i +
      ')">Sửa</button> </div>\n\
        <div style="width:30%;position:absolute;bottom:5%;left:70%;padding:0"><button class="btn_xoaProduct" onclick="xacNhan_xoaSanPham(' +
      i +
      ')">Xóa</button></div>\n\
      </div>';
  }
  console.log(msg);
  document.getElementById("product_list").innerHTML = msg;
}
var index_product;
function cancel() {
  document.getElementById("admin_alert").style.display = "none";
}
function yes() {
  cancel();
  xoaSanPham();
}
function xacNhan_xoaSanPham(index) {
  var a = document.getElementById("admin_alert");
  a.style.display = "block";
  a.innerHTML =
    '<div class="adminform" id="alert_xoa_sp" style="width: 30%; padding:1%;margin:5%;">\n\
    <div class="chamthang">!</div>\n\
    <div id="text_confirm_xoa_sp">Thao tác xóa sẽ không thể hoàn tác, bạn có chắc muốn xóa chứ?</div>\n\
    <div style="padding:10px 0 10px 10%; float:left;width:40%"><button class="btn_confirm_xoa_sp" id="cancel" onclick="cancel()">Cancel</button></div>\n\
    <div style="padding:10px; float:left;width:40%"><button class="btn_confirm_xoa_sp" id="yes" onclick="yes()">Yes</button></div>\n\
  </div>';
  index_product = index;
}
function xoaSanPham() {
  var productarray = JSON.parse(localStorage.getItem("product"));
  productarray.splice(index_product, 1);
  localStorage.setItem("product", JSON.stringify(productarray));
  if (productarray.length == 0) localStorage.removeItem("product");
  admin_product();
}
function inner_sua_sp(i) {
  var a = document.getElementById("admin_alert");
  a.style.display = "block";
  var productarray = JSON.parse(localStorage.getItem("product"));
  var msg = "";
  msg =
    '<div class="adminform" id="form_sua_sp" style="width:45%; font-size: larger; top:300px;height:fit-content">\n\
      <div id="div_sua_tensp"><input id="suaSP_name"  type="text" value="' +
    productarray[i].product_name +
    '" ></div>\n\
      <div id="div_sua_img"><img id="img_sua_sp" alt="hello thầy" style="color:black"  src="' +
    productarray[i].product_img +
    '">\n\
      <label >Thêm ảnh\n\
      <input type="file" id="input_img" accept="image/*" onchange="change_img(event)">\n\
      </label>\n\
      </div>\n\
      <div id="bo3_input">\n\
      <div ">Giá:<input id="suaSP_price" type="text" style="width:40  %"  value="' +
    productarray[i].product_price +
    '" ></div>\n\
      <div>Nhà sản xuất:  <input id="suaSP_company" type="text"  value="' +
    productarray[i].product_company +
    '" ></div>\n\
      <div >ID:            <input id="suaSP_id" type="text"  value="' +
    productarray[i].product_id +
    '"></div>\n\
      </div>\n\
      <button class="btn_confirm_xoa_sp" onclick="bo_hinh()"  id="btn_boHinh">Bỏ hình</button>\n\
      <button class="btn_confirm_xoa_sp" onclick="luu_sp(' +
    i +
    ')" id="btn_luu">Lưu</button>\n\
      <button class="btn_confirm_xoa_sp" onclick="cancel()" id="btn-cancel">Cancel</button>\n\
    </div>';
  a.innerHTML = msg;
}
var source = "";
function change_img(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();
  var imgtag = document.getElementById("img_preview_sp");
  imgtag.title = selectedFile.name;
  reader.onload = function (event) {
    imgtag.src = event.target.result;
    source = event.target.result;
  };
  reader.readAsDataURL(selectedFile);
}
function bo_hinh() {
  source = "";
  var imgtag = document.getElementById("img_preview_sp");
  imgtag.src = null;
}
function luu_sp(num) {
  console.log(source);
  var productarray = JSON.parse(localStorage.getItem("product"));
  productarray[num].product_name = document.getElementById("suaSP_name").value;
  productarray[num].product_price =
    document.getElementById("suaSP_price").value;
  productarray[num].product_company =
    document.getElementById("suaSP_company").value;
  productarray[num].product_id = document.getElementById("suaSP_id").value;
  if (source != "") productarray[num].product_img = source;
  localStorage.setItem("product", JSON.stringify(productarray));
  console.log(productarray[num]);
  cancel();
  window.location.reload();
}
function show_themsp() {
  var a = document.getElementById("admin_alert");
  a.style.display = "block";
  a.innerHTML =
    '<div class="adminform" id="form_them_sp" style="width:45%; font-size: larger; top:300px;height:fit-content">\n\
    <div id="div_them_tensp"><input id="themSP_name" style="font-size:larger" type="text" placeholder="Nhập tên sản phẩm"></div>\n\
    <div id="div_them_img"><img id="img_preview_sp" style="color:black"  src="">\n\
      <label >Thêm ảnh\n\
      <input type="file" id="input_img" accept="image/*" onchange="change_img(event)">\n\
      </label>\n\
    </div>\n\
    <div id="bo3_input_themsp">\n\
    <div >Giá:<input id="themSP_price" type="text"  placeholder="Nhập giá của sản phẩm"  ></div>\n\
    <div>Nhà sản xuất:  <input id="themSP_company" style="padding:0;"type="text"  placeholder="Nhập hãng" ></div>\n\
    <div >ID:            <input id="themSP_id" type="text" placeholder="Nhập ID" ></div>\n\
    </div>\n\
    <button type="button" class="btn_confirm_xoa_sp" onclick="cancel()" id="btn-cancel">Cancel</button>\n\
    <button type="button" class="btn_confirm_xoa_sp" onclick="themsp()" id="btn_luu">Lưu</button>\n\
    <div id="themsp_error"> </div>\n\
  </div>';
}
function check_themsp() {
  var name = document.getElementById("themSP_name").value;
  var price = document.getElementById("themSP_price").value;
  var company = document.getElementById("themSP_company").value;
  var id = document.getElementById("themSP_id").value;
  msg = "";
  if (name == "") msg += "Vui lòng nhập tên\n";
  if (price == "") msg += "Vui lòng nhập giá\n";
  if (company == "") msg += "Vui lòng nhập nhà sản xuất\n";
  if (id == "") msg += "Vui lòng nhập id\n";
  document.getElementById("themsp_error").innerText = msg;
  if (msg == "") return true;
  return false;
}
function themsp() {
  if (check_themsp()) {
    var productarray = JSON.parse(localStorage.getItem("product"));
    var newSP = {
      product_name: document.getElementById("themSP_name").value,
      product_img: source,
      product_company: document.getElementById("themSP_company").value,
      product_price: document.getElementById("themSP_price").value,
      product_type: "",
      product_id: document.getElementById("themSP_id").value,
    };
    productarray.push(newSP);
    localStorage.setItem("product", JSON.stringify(productarray));
    cancel();
    admin_product();
  }
  //
}
function order(){
  var orderarray = JSON.parse(localStorage.getItem("DonHang"));
  var msg = "";
  for (var i = 0; i < orderarray.length; i++) {
    msg +=
      '<div class="order_block" >\n\
        <div class="div_noidung_order" onclick="inner_giohang('+i+')"> \n\
          <div id="order_name">Tên: '+orderarray[i].hoten+'</div>\n\
          <div id="order_sdt">Phone: '+orderarray[i].sdt+'</div>\n\
          <div id="order_tong">Tổng: '+orderarray[i].tongtiendonhang+' </div>\n\
          <div id="order_diachi">Địa chỉ: '+orderarray[i].diachi+' </div>\n\
          <div id="order_email">Email: '+orderarray[i].email+' </div>\n\
          <div id="order_thanhtoan">Phương thức thanh toán: '+orderarray[i].thanhtoan+'</div>\n\
        </div>\n\
      <div id="div_trangthai">Trạng thái: <select id="xuli'+i+'" onchange="xuli(this,'+i+')">\n\
          <option value="true" >Đã xử lí</option>\n\
          <option value="false" >Chưa xử lí</option>\n\
        </select></div>\n\
        <hr>\n\
      <div class="order_sp" id="order_sp'+i+'"></div>\n\
    </div>';
  }
  document.getElementById("product_list").innerHTML = msg;
  for(var i = 0; i < orderarray.length; i++){
    document.getElementById("xuli"+i).value = orderarray[i].xuli;
  }
}
function inner_giohang(num){
  var orderarray = JSON.parse(localStorage.getItem("DonHang"));
  var ordersp = document.getElementById("order_sp"+num);
  var msg = "";
  var a = ordersp.innerHTML;
  if(a == ""){
    for(var i=0; i<orderarray[num].giohang.length; i++){
      msg += `
      <div class="item-gio-hang">
        <div class="hinhAnh">
          <img src=${orderarray[num].giohang[i].product_img} />
        </div>
        <p class="ten">${orderarray[num].giohang[i].product_name}</p>
        <div class="gia">
          <span class="giagoc" id="gia">${orderarray[num].giohang[i].product_price}</span>
        </div>
        <p class="soluong" >${orderarray[num].giohang[i].soluong}  </p>
        <p class="tongtien" id="tongtien">
          ${(parseInt(orderarray[num].giohang[i].product_price.replaceAll(".", "").replace("đ", "")) * orderarray[num].giohang[i].soluong).toLocaleString() +" đ"}
        </p>
      </div>`;
    }
  }
  ordersp.innerHTML = msg;
}
function xuli(obj,num){
  var DonHangArray = JSON.parse(localStorage.getItem("DonHang"));
  console.log(DonHangArray);
  DonHangArray[num].xuli = obj.value;
localStorage.setItem("DonHang",JSON.stringify(DonHangArray));
}