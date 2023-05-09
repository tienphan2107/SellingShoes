function kiemtra() {
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("id_email").value;
  var mkhau = document.getElementById("id_mkhau").value;
  var confirm_mkhau = document.getElementById("confirm_mkhau").value;
  var userarray = JSON.parse(localStorage.getItem("user"));
  var error_msg = "";

  document.getElementById("dangky");
  for (var i = 0; i < userarray.length; i++)
    if (email == userarray[i].email) {
      document.getElementById("error").innerText = "Email đã tồn tại";
      return false;
    }
  if (fname.match("^[A-Z a-z]{2,30}$") == null) {
    error_msg += "Hãy nhập đúng tên của bạn\n";
  }
  if (lname.match("^[A-Z a-z]{2,30}$") == null) {
    error_msg += "Hãy nhập đúng họ của bạn\n";
  }
  if (phone.match("^((/+84)|0)[0-9]{9,10}$") == null) {
    error_msg += "Nhập sai số điện thoại\n";
  }
  if (email.match("^[a-z A-Z 0-9]*@[a-z.A-Z]*$") == null) {
    error_msg += "Email phải có ký tự @\n";
  }

  if (mkhau.match("^[A-Z a-z 0-9]{8,30}$") == null) {
    error_msg += "Mật khẩu phải bắt đầu bằng chữ và có ít nhất 8 ký tự\n";
  }
  if (confirm_mkhau != mkhau) {
    error_msg += "Mật khẩu xác nhận không đúng\n";
    console.log("true");
  }
  document.getElementById("error").innerText = error_msg;
  if (error_msg == "") {
    return true;
  } else {
    return false;
  }
}
function login() {
  var a = document.getElementById("login_container");
  a.style.display = "block";
}
function exit() {
  var a = document.getElementById("login_container");
  a.style.display = "none";
}
//user info
function user_popup() {
  document.getElementById("user_container").style.display = "block";
}
function exit_user() {
  var a = document.getElementById("user_container");
  a.style.display = "none";
}
function hide_password() {
  var x = document.getElementById("user_mkhau");
  var e = document.getElementById("eye");
  var es = document.getElementById("eye_slash");
  if (x.type === "password") {
    x.type = "text";
    e.style.display = "none";
    es.style.display = "inline-block";
  } else {
    x.type = "password";
    e.style.display = "inline-block";
    es.style.display = "none";
  }
}

// cái này không kiểm tra được nên nút đăng ký đang để onclick kiem tra
function xacnhandangki() {
  if (kiemtra() == false) return false;
  /*Khu vuc nay code them de lay thong tin dang ki luu vao mang user */
  var a = document.getElementById("register_container");
  var b = document.getElementById("login_container");
  b.style.display = "block";
  a.style.display = "none";
  document.getElementById("login_error").innerText = "";
  return true;
}
function reseterror() {
  console.log("in");
  var a = "";
  document.getElementById("error").innerText = a;
}
function find() {
  var value = translate(document.getElementById("search_text").value);
  var url = "index.html?search=" + value;
  document.getElementById("search_box").href = url;
}

function register() {
  var a = document.getElementById("register_container");
  a.style.display = "block";
  var b = document.getElementById("login_container");
  b.style.display = "none";
  var a = "";
  document.getElementById("register_form").reset();
  document.getElementById("error").innerText = a;
}
function exit_register() {
  var a = document.getElementById("register_container");
  a.style.display = "none";
}

/*Phần này làm về mảng sản phẩm  va user*/

var productarray = [];
var userarray = [];
window.onload = function () {
  default_product();
  create_admin();
  create_donhang();
  create_login_status();
  check_login_status();
  innernewproduct();
  showproduct();
};
function create_login_status() {
  if (localStorage.getItem("login_status") == null)
    localStorage.setItem("login_status", "false");
}
function check_login_status() {
  var login_status = JSON.parse(localStorage.getItem("login_status"));
  console.log(login_status);
  if (login_status) {
    console.log("check");
    document.getElementById("logo_user2").style.display = "block";
    show_user_info();
    check_admin();
  }
}
function check_admin() {
  var userarray = JSON.parse(localStorage.getItem("user"));
  var a = JSON.parse(localStorage.getItem("login_index"));
  console.log(userarray[a]);
  if (userarray[a].email == "admin")
    document.getElementById("btn_setting").style.display = "inline-block";
  else {
    document.getElementById("btn_logout").style.width = "100%";
    document.getElementById("btn_setting").style.display = "none";
  }
}
function show_user_info() {
  var userarray = JSON.parse(localStorage.getItem("user"));
  var index = JSON.parse(localStorage.getItem("login_index"));
  document.getElementById("user_fname").innerText =
    userarray[index].fname + " " + userarray[index].lname;
  document.getElementById("user_phone").innerText = userarray[index].phone;
  document.getElementById("user_email").innerText = userarray[index].email;
  document.getElementById("user_mkhau").value = userarray[index].mkhau;
}
function create_admin() {
  if (localStorage.getItem("user") == null) {
    var user0 = {
      fname: "A",
      lname: "Nguyen",
      phone: "0939333999",
      email: "admin",
      mkhau: "admin",
    };
    userarray.push(user0);
    localStorage.setItem("user", JSON.stringify(userarray));
  }
}
function new_user() {
  var userarray = JSON.parse(localStorage.getItem("user"));
  if (xacnhandangki()) {
    var newuser = {
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("id_email").value,
      mkhau: document.getElementById("id_mkhau").value,
    };

    userarray.push(newuser);
    localStorage.setItem("user", JSON.stringify(userarray));
  }
}
function login_check() {
  var userarray = JSON.parse(localStorage.getItem("user"));
  var email_login = document.getElementById("email").value;
  var mkhau_login = document.getElementById("mkhau").value;
  for (i = 0; i < userarray.length; i++) {
    if (
      userarray[i].email == email_login &&
      userarray[i].mkhau == mkhau_login
    ) {
      localStorage.setItem("login_status", "true");
      localStorage.setItem("login_index", JSON.stringify(i));
      return true;
    }
    if (userarray[i].email == email_login) {
      document.getElementById("login_error").innerText = "Sai mật khẩu";
      return false;
    }
  }
  document.getElementById("login_error").innerText =
    "Sai tài khoản hoặc mật khẩu";
  return false;
}
function logout() {
  localStorage.setItem("login_status", false);
  localStorage.setItem("GioHang", JSON.stringify([]));
  window.location.reload();
}
function default_product() {
  if (localStorage.getItem("product") == null) {
    var product1 = {
      product_name: "Giày Nike Dunk Low Scrap ‘Khaki-White-Burgundy-Baroque Brown-Smoky Plum’ DH7450-100",
      product_img:
        "image\\nike\\giay-nike-air-trainer-1-shima-shima-pack-baroque-brown-dv6998-200.png.webp",
      product_company: "NIKE",
      product_price: "4.090.000₫",
      product_type: "",
      product_id: "'DH7450-100'",
    };
    var product2 = {
      product_name:
        "Giày Nike Air Force 1 Low LXX “University Blue” DX1193-100",
      product_img:
        "image\\nike\\giay-nike-air-force-1-low-lxx-university-blue-dx1193-100.png.webp",
      product_company: "NIKE",
      product_price: "4.500.000đ",
      product_type: "",
      product_id: "'DX1193-100'",
    };
    var product3 = {
      product_name: "Giày Nike Dunk Low SE Fleece Pack Honeydew DQ7579-300",
      product_img:
        "image\\nike\\giay-nike-dunk-low-fleece-pack-dq7579-300.png.webp",
      product_company: "NIKE",
      product_price: "4.090.000đ",
      product_type: "10%",
      product_id: "'DQ7579-300'",
    };
    var product4 = {
      product_name:
        "Giày Nike Air Max Penny 1 “All Star Black Metallic Silver Varsity Royal” DN2487-002",
      product_img:
        "image\\nike\\giay-nike-air-max-penny-1-all-star-black-metallic-silver-varsity-royal-dn2487-002.png.webp",
      product_company: "NIKE",
      product_price: "5.890.000đ",
      product_type: "",
      product_id: "'DN2487-002'",
    };
    var product5 = {
      product_name:
        "Giày Nike Air Trainer 1 “Shima Shima Pack Baroque Brown” DV6998-200",
      product_img:
        "image\\nike\\giay-nike-air-trainer-1-shima-shima-pack-baroque-brown-dv6998-200.png.webp",
      product_company: "NIKE",
      product_price: "4.490.000đ",
      product_type: "30%",
      product_id: "'DV6998-200'",
    };
    var product6 = {
      product_name:
        "Giày Nike Dunk High Retro PRM Year Of The Tiger DQ4978-001",
      product_img:
        "image\\nike\\giay-nike-dunk-high-retro-prm-year-of-the-tiger-dq4978-001.jpg.webp",
      product_company: "NIKE",
      product_price: "3.590.000đ",
      product_type: "",
      product_id: "'DQ4978-001'",
    };
    var product7 = {
      product_name:
        "Giày Nike Court Borough Low 2 ‘Orange’ BQ5448-119",
      product_img:
        "image\\nike\\giay-nike-court-borough-low-2-orange-bq5448-119-1.jpg.webp",
      product_company: "NIKE",
      product_price: "2.790.000₫",
      product_type: "30%",
      product_id: "'BQ5448-119'",
    };
    var product8 = {
      product_name:
        "Giày Nike Air More Uptempo 96 “Cargo Khaki Alpha Orange” DX2669-300",
      product_img:
        "image\\nike\\giay-nike-air-more-uptempo-96-cargo-khaki-alpha-orange-dx2669-300.png.webp",
      product_company: "NIKE",
      product_price: "3.590.000đ",
      product_type: "",
      product_id: "'DX2669-300'",
    };
    var product9 = {
      product_name: "Giày Jordan 1 Retro High OG SP Utility Stash DN4336-001",
      product_img:
        "image\\jordan\\giay-jordan-1-retro-high-og-sp-utility-stash-dn4336-001.jpg.webp",
      product_company: "JORDAN",
      product_price: "4.890.000đ",
      product_type: "",
      product_id: "'DN4336-001'",
    };
    var product10 = {
      product_name: "Giày Jordan 4 Retro Midnight Navy (GS) DM0521-001",
      product_img:
        "image\\jordan\\giay-jordan-4-retro-midnight-navy-gs-dm0521-001.png.webp",
      product_company: "JORDAN",
      product_price: "2.890.000đ",
      product_type: "",
      product_id: "'DM0521-001'",
    };
    var product11 = {
      product_name: "Giày Jordan 1 Mid Mystic Navy Mint Foam (GS) 554725-413",
      product_img:
        "image\\jordan\\giay-jordan-1-mid-mystic-navy-mint-foam-gs-554725-413.png.webp",
      product_company: "JORDAN",
      product_price: "3.890.000đ",
      product_type: "10%",
      product_id: "'554725-413'",
    };
    var product12 = {
      product_name: "Giày Jordan 1 Mid SE Elephant Print (GS) DM6216-016",
      product_img:
        "image\\jordan\\giay-jordan-1-mid-se-elephant-print-gs-dm6216-016-11.png.webp",
      product_company: "JORDAN",
      product_price: "4.090.000đ",
      product_type: "",
      product_id: "'DM6216-016'",
    };
    var product13 = {
      product_name:
        "Giày Air Jordan 1 ELevate Low “Exploration Unit” FB1867-141",
      product_img:
        "image\\jordan\\giay-air-jordan-1-elevate-low-exploration-unit-fb1867-141.jpg.webp",
      product_company: "JORDAN",
      product_price: "3.890.000đ",
      product_type: "",
      product_id: "'FB1867-141'",
    };
    var product14 = {
      product_name:
        "GGiày Air Jordan 11 Retro Low IE Light Orewood Brown 919712-102",
      product_img:
        "image\\jordan\\giay-air-jordan-11-retro-low-ie-light-orewood-brown-919712-102.png.webp",
      product_company: "JORDAN",
      product_price: "4.890.000đ",
      product_type: "10%",
      product_id: "'919712-102'",
    };
    var product15 = {
      product_name: "Giày Jordan 36 Low “Light Orewood Brown” DH0832-160",
      product_img:
        "image\\jordan\\giay-jordan-36-low-light-orewood-brown-dh0832-160.png.webp",
      product_company: "JORDAN",
      product_price: "4.290.000đ",
      product_type: "",
      product_id: "'DH0832-160'",
    };
    var product16 = {
      product_name: "Giày Air Jordan Legacy 312 Low Fire Red CD7069-160",
      product_img:
        "image\\jordan\\giay-air-jordan-legacy-312-low-fire-red-cd7069-160.png.webp",
      product_company: "JORDAN",
      product_price: "3.090.000đ",
      product_type: "10%",
      product_id: "'CD7069-160'",
    };
    var product17 = {
      product_name: "Giày Vans Old Skool Mule White Red 590747-0002",
      product_img:
        "image\\vans\\giay-Vans-Old-Skool-Mule-White-Red-590747-0002.png.webp",
      product_company: "VANS",
      product_price: "1.980.000đ",
      product_type: "",
      product_id: "'590747-0002'",
    };
    var product18 = {
      product_name: "Giày Vans Old Skool Mule Beige 590747-0004",
      product_img:
        "image\\vans\\giay-Vans-Old-Skool-Mule-Beige-590747-0004.png.webp",
      product_company: "VANS",
      product_price: "1.890.000đ",
      product_type: "",
      product_id: "'590747-0004'",
    };
    var product19 = {
      product_name:
        "Giày Vans Ua Style 36 Decon Sf Pumpkin Spice/Antique VN0A3MVL25T",
      product_img:
        "image\\vans\\Giay-Vans-Ua-Style-36-Decon-Sf-Pumpkin-SpiceAntique-VN0A3MVL25T.jpg.webp",
      product_company: "VANS",
      product_price: "2.890.000đ",
      product_type: "",
      product_id: "'VN0A3MVL25T'",
    };
    var product20 = {
      product_name: "Giày Vans Old Skool Winter Sky VN0A54F69LY1",
      product_img:
        "image\\vans\\giay-vans-old-skool-winter-sky-vn0a54f69ly1-4.png.webp",
      product_company: "VANS",
      product_price: "1.890.000đ",
      product_type: "",
      product_id: "'VN0A54F69LY1'",
    };
    var product21 = {
      product_name: "Giày Vans Old Skool Black Teal VN0A3WKT4FV1",
      product_img:
        "image\\vans\\giay-vans-old-skool-black-teal-vn0a3wkt4fv1-13.png.webp",
      product_company: "VANS",
      product_price: "1.690.000đ",
      product_type: "10%",
      product_id: "'VN0A3WKT4FV1'",
    };
    var product22 = {
      product_name: "Giày Vans Old Skool Black Flame VN0A38G1K681",
      product_img:
        "image\\vans\\Giay-Vans-Old-Skool-Black-Flame-VN0A38G1K681.png.webp",
      product_company: "VANS",
      product_price: "1.690.000đ",
      product_type: "",
      product_id: "'VN0A38G1K681'",
    };
    var product23 = {
      product_name: "Giày Vans Authentic Mule Red VN0A54F7JV61",
      product_img:
        "image\\vans\\Giay-Vans-Authentic-Mule-Red-VN0A54F7JV61.png.webp",
      product_company: "VANS",
      product_price: "1.590.000đ",
      product_type: "30%",
      product_id: "'VN0A54F7JV61'",
    };
    var product24 = {
      product_name: "Giày Vans Slip Skool Black Multi VN0A3WM5219",
      product_img: "image\\vans\\vans-slip-skool-black-multi.png.webp",
      product_company: "VANS",
      product_price: "1.290.000đ",
      product_type: "",
      product_id: "'VN0A3WM5219'",
    };
    var product25 = {
      product_name: "Giày Air Jordan 1 Low ‘Black Dark Powder Blue’ CZ0775-104",
      product_img:
        "image/jordan1_low/giay-air-jordan-1-low-powder-blue-cz0775-104.png.webp",
      product_company: "JORDAN",
      product_price: "5.290.000đ",
      product_type: "new",
      product_id: "'CZ0775-104'",
    };
    var product26 = {
      product_name:
        "Giày Air Jordan 1 Retro Low OG Zion Williamson Voodoo DZ7292-200",
      product_img:
        "image/jordan1_low/giay-air-jordan-1-low-zion-williamson-voodoo-dz7292-200.png.webp",
      product_company: "JORDAN",
      product_price: "6.290.000đ",
      product_type: "new",
      product_id: "'DZ7292-200'",
    };
    var product27 = {
      product_name: "Giày Nike Jordan 1 Low Reverse Black Toe (W) DC0774-160",
      product_img:
        "image/jordan1_low/giay-nike-jordan-1-low-reverse-black-toe-w-dc0774-160.png.webp",
      product_company: "JORDAN",
      product_price: "3.690.000đ",
      product_type: "new",
      product_id: "'DC0774-160'",
    };
    var product28 = {
      product_name:
        "Giày Nike Air Jordan 1 Low x Travis Scott ‘Sail and Ridgerock’ DM7866-162",
      product_img:
        "image/jordan1_low/giay-nike-air-jordan-1-low-x-travis-scott-sail-and-ridgerock-dm7866-162-18.png.webp",
      product_company: "JORDAN",
      product_price: "38.690.000đ",
      product_type: "new",
      product_id: "'DM7866-162'",
    };
    var product29 = {
      product_name:
        "Giày Nike Jordan 1 Mid SE ‘Beach Cherrywood Red’ DR0501-200",
      product_img:
        "image/jordan1_mid/giay-nike-jordan-1-mid-se-beach-cherrywood-red-dr0501-200.jpg.webp",
      product_company: "JORDAN",
      product_price: "5.290.000đ",
      product_type: "new",
      product_id: "'DR0501-200'",
    };
    var product30 = {
      product_name: "Giày Nike Jordan 1 Mid “Lakers” DQ8426-517",
      product_img:
        "image/jordan1_mid/giay-nike-jordan-1-midlakers-dq8426-517.png.webp",
      product_company: "JORDAN",
      product_price: "4.890.000đ",
      product_type: "new",
      product_id: "'DQ8426-517'",
    };
    var product30 = {
      product_name: "Giày Nike Air Jordan 1 Mid “Rookie Season” DR6496-116",
      product_img:
        "image/jordan1_mid/giay-nike-air-jordan-1-mid-rookie-dr6496-116.png.webp",
      product_company: "JORDAN",
      product_price: "4.090.000đ",
      product_type: "new",
      product_id: "'DR6496-116'",
    };
    var product31 = {
      product_name:
        "Giày Nike Air Jordan 1 Mid SE ‘Wear-Away Chicago’ DV9565-006",
      product_img:
        "image/jordan1_mid/giay-nike-air-jordan-1-mid-se-wear-away-chicago-dv9565-006-11.png.webp",
      product_company: "JORDAN",
      product_price: "5.890.000đ",
      product_type: "new",
      product_id: "'DV9565-006'",
    };
    var product32 = {
      product_name:
        "Giày Nike Air Zoom G.T. Jump “Black Racer Pink Game Royal” DX4111-064",
      product_img:
        "image/nike_az/giay-nike-air-zoom-g-t-jump-black-racer-pink-game-royal-dx4111-064.png.webp",
      product_company: "NIKE",
      product_price: "4.890.000đ",
      product_type: "new",
      product_id: "'DX4111-064'",
    };
    var product33 = {
      product_name: "Giày Nike Zoom GT Cut 2 “Crosshairs” FB1961-141",
      product_img:
        "image/nike_az/giay-nike-zoom-gt-cut-2-crosshairs-fb1961-141.png.webp",
      product_company: "NIKE",
      product_price: "5.890.000đ",
      product_type: "new",
      product_id: "'FB1961-141'",
    };
    var product34 = {
      product_name: "Giày Nike Air Max 270 Golf ‘White Black’ CK6483-102",
      product_img:
        "image/nike_am/giay-nike-air-max-270-golf-white-black-ck6483-102.png.webp",
      product_company: "NIKE",
      product_price: "4.152.000đ",
      product_type: "new",
      product_id: "'CK6483-102'",
    };
    var product35 = {
      product_name:
        "Giày Nike Air Max Pre-Day ‘Voodoo – Mystic Navy’ DQ5082-400",
      product_img:
        "image/nike_am/giay-nike-air-max-pre-day-voodoo-mystic-navy-dq5082-400.jpg.webp",
      product_company: "NIKE",
      product_price: "4.390.000đ",
      product_type: "new",
      product_id: "'DQ5082-400'",
    };
    var product36 = {
      product_name:
        "Giày Nike Air Force 1 ’07 LX ‘Toasty – Brown Kelp’ DC8744-301",
      product_img:
        "image/nike_af1/giay-nike-air-force-1-07-lx-toasty-brown-kelp-dc8744-301.png.webp",
      product_company: "NIKE",
      product_price: "3.490.000đ",
      product_type: "new",
      product_id: "'DC8744-301'",
    };
    var product37 = {
      product_name:
        "Giày Nike Air Force 1 React Low White Sail Black DQ7669-100",
      product_img:
        "image/nike_af1/giay-nike-air-force-1-low-white-sail-black-dq7669-100-9.png.webp",
      product_company: "NIKE",
      product_price: "4.690.000đ",
      product_type: "new",
      product_id: "'DQ7669-100'",
    };
    var product38 = {
      product_name: "Giày Nike Air Force 1 Mid Sun Club White DM0119-100",
      product_img:
        "image/nike_af1/giay-nike-air-force-1-mid-sun-club-whire-dm0119-100.png.webp",
      product_company: "NIKE",
      product_price: "3.890.000đ",
      product_type: "new",
      product_id: "'DM0119-100'",
    };
    var product39 = {
      product_name: "Giày Nike Air Force 1 Mid React ‘White Black’ DQ7668-100",
      product_img:
        "image/nike_af1/giay-nike-air-force-1-mid-react-white-black-dq7668-100.png.webp",
      product_company: "NIKE",
      product_price: "3.890.000đ",
      product_type: "new",
      product_id: "'DQ7668-10'",
    };
    var product40 = {
      product_name:
        "Giày Vans Ua Style 36 Decon Sf Pumpkin Spice/Antique VN0A3MVL25T",
      product_img:
        "image/vans_os/Giay-Vans-Ua-Style-36-Decon-Sf-Pumpkin-SpiceAntique-VN0A3MVL25T.jpg.webp",
      product_company: "VANS",
      product_price: "2.890.000đ",
      product_type: "new",
      product_id: "'VN0A3MVL25T'",
    };
    var product41 = {
      product_name: "Giày Vans UA Authentic ‘Disruptive’ VN0A348A3Z2",
      product_img: "image\\vans_so\\115.png.webp",
      product_company: "VANS",
      product_price: "1.690.000đ",
      product_type: "new",
      product_id: "'VN0A348A3Z2'",
    };
    var product42 = {
      product_name: "Giày Vans Classic Era 'Pink' VN0A54F14FW1",
      product_img:
        "image\\vans_cl\\hkenpvans-era-women-shoes-4378v315550473102searchCategoryall-1.png.webp",
      product_company: "VANS",
      product_price: "1.790.000đ",
      product_type: "new",
      product_id: "'VN0A54F14FW1'",
    };
    var product43 = {
      product_name: "Giày Vans Classic Slip-On Flame VN0A33TBK681",
      product_img:
        "image\\vans_so\\giay-vans-classic-slip-on-flame-vn0a33tbk681-9.png.webp",
      product_company: "VANS",
      product_price: "1.490.000đ",
      product_type: "new",
      product_id: "'VN0A33TBK681'",
    };

    productarray.push(product1);
    productarray.push(product2);
    productarray.push(product3);
    productarray.push(product4);
    productarray.push(product5);
    productarray.push(product6);
    productarray.push(product7);
    productarray.push(product8);
    productarray.push(product9);
    productarray.push(product10);
    productarray.push(product11);
    productarray.push(product12);
    productarray.push(product13);
    productarray.push(product14);
    productarray.push(product15);
    productarray.push(product16);
    productarray.push(product17);
    productarray.push(product18);
    productarray.push(product19);
    productarray.push(product20);
    productarray.push(product21);
    productarray.push(product22);
    productarray.push(product23);
    productarray.push(product24);
    productarray.push(product25);
    productarray.push(product26);
    productarray.push(product27);
    productarray.push(product28);
    productarray.push(product29);
    productarray.push(product30);
    productarray.push(product31);
    productarray.push(product32);
    productarray.push(product33);
    productarray.push(product34);
    productarray.push(product35);
    productarray.push(product36);
    productarray.push(product37);
    productarray.push(product38);
    productarray.push(product39);
    productarray.push(product40);
    productarray.push(product41);
    productarray.push(product42);
    productarray.push(product43);
    localStorage.setItem("product", JSON.stringify(productarray));
  }

}

function check_url() {
  var url = window.location.href;
  if (url.indexOf("type=") != -1) return "product";
  if (url.indexOf("search=") != -1) return "search";
  return " ";
}

function showproduct() {
  var status = check_url();
  console.log("status la: " + status);
  if (status.indexOf(" ") == 0) return false;
  document.getElementById("poster_container").style.display = "none";
  document.getElementById("product_content").style.display = "none";
  document.getElementById("main_product_content").style.display = "block";
  innerproduct(arrayproduct());
  return true;
}

function arrayproduct() {
  var product = whichproduct();
  if (product != undefined) {
    if (product.indexOf("new") != -1) {
      if (product.indexOf("nike") != -1) return newnikeproduct();
      if (product.indexOf("jordan") != -1) return newjordanproduct();
      if (product.indexOf("vans") != -1) return newvansproduct();
      return newproduct();
    }
    if (product.indexOf("jordan") != -1) {
      if (product.indexOf("1low") != -1) return jordan1lowproduct();
      if (product.indexOf("1mid") != -1) return jordan1midproduct();
      if (product.indexOf("1high") != -1) return jordan1highproduct();
      if (product.indexOf("4") != -1) return jordan4product();
      return jordanproduct();
    }
    if (product.indexOf("nike") != -1) {
      if (product.indexOf("af1") != -1) return nikeaf1product();
      if (product.indexOf("am") != -1) return nikeamproduct();
      if (product.indexOf("az") != -1) return nikeazproduct();
      return nikeproduct();
    }
    if (product.indexOf("vans") != -1) {
      if (product.indexOf("os") != -1) return vansosproduct();
      if (product.indexOf("so") != -1) return vanssoproduct();
      if (product.indexOf("cls") != -1) return vansclsproduct();
      return vansproduct();
    }
    if (product.indexOf("sale") != -1) {
      if (product.indexOf("10") != -1) return sale10product();
      if (product.indexOf("30") != -1) return sale30product();
      return saleproduct();
    }
    if (product.indexOf("all") != -1)
      return JSON.parse(localStorage.getItem("product"));
  }
  return searchproduct();
}
function whichproduct() {
  var href = window.location.href;
  var a = href.split("type=");
  return a[1];
}
function translate(str) {
  // ham chuyen doi tieng viet sang tieng anh
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  str = str.replace(/ + /g, " ");
  str = str.trim(); // loai bo cac khoảng trống thừa ở đầu và cuối chuỗi
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

function whichsearch() {
  var href = window.location.href;
  var searchresult = href.split("search=");
  var result = searchresult[1];
  while (result.indexOf("%20") != -1) {
    //thay cac dau %20 thanh dau space
    result = result.replace("%20", " ");
  }
  result = result.trim(); // loai bo cac khoảng trống thừa ở đầu và cuối chuỗi
  for (var i = 0; i < result.length; i++) {
    // xóa khoảng trống thừa giữa các từ
    if (result[i] == " ") {
      for (var j = i + 1; j < result.length; j++) {
        if (i == j) result = result.replace(result[j], "");
      }
    }
  }
  result = result.toLowerCase();
  return result;
}

function searchproduct() {
  var allproduct = JSON.parse(localStorage.getItem("product"));
  var i;
  var search = whichsearch();
  var allsearch = [];
  for (i = 0; i < allproduct.length; i++) {
    var nameproduct = translate(allproduct[i].product_name);
    nameproduct = nameproduct.toLowerCase();
    if (nameproduct.indexOf(search) != -1) allsearch.push(allproduct[i]);
  }
  return allsearch;
}

function jordanproduct() {
  var allproduct = JSON.parse(localStorage.getItem("product"));
  var i;
  var alljordan = [];
  for (i = 0; i < allproduct.length; i++) {
    if (allproduct[i].product_company.indexOf("JORDAN") == 0)
      alljordan.push(allproduct[i]);
  }
  return alljordan;
}

function jordan1lowproduct() {
  var i;
  var alljordan = jordanproduct();
  var jordanlow = [];
  for (i = 0; i < alljordan.length; i++) {
    if (alljordan[i].product_name.indexOf("Low") != -1)
      jordanlow.push(alljordan[i]);
  }
  return jordanlow;
}

function jordan1midproduct() {
  var i;
  var alljordan = jordanproduct();
  var jordanmid = [];
  for (i = 0; i < alljordan.length; i++) {
    if (alljordan[i].product_name.indexOf("Mid") != -1)
      jordanmid.push(alljordan[i]);
  }
  return jordanmid;
}

function jordan1highproduct() {
  var i;
  var alljordan = jordanproduct();
  var jordanhigh = [];
  for (i = 0; i < alljordan.length; i++) {
    if (alljordan[i].product_name.indexOf("High") != -1)
      jordanhigh.push(alljordan[i]);
  }
  return jordanhigh;
}

function jordan4product() {
  var i;
  var alljordan = jordanproduct();
  var jordan4 = [];
  for (i = 0; i < alljordan.length; i++) {
    if (alljordan[i].product_name.indexOf("Jordan 4") != -1)
      jordan4.push(alljordan[i]);
  }
  return jordan4;
}

function nikeproduct() {
  var allproduct = JSON.parse(localStorage.getItem("product"));
  var i;
  var allnike = [];
  for (i = 0; i < allproduct.length; i++) {
    if (allproduct[i].product_company.indexOf("NIKE") == 0)
      allnike.push(allproduct[i]);
  }
  return allnike;
}

function nikeaf1product() {
  var allnike = nikeproduct();
  var i;
  var nikeaf1 = [];
  for (i = 0; i < allnike.length; i++) {
    if (allnike[i].product_name.indexOf("Force") != -1)
      nikeaf1.push(allnike[i]);
  }
  return nikeaf1;
}

function nikeamproduct() {
  var allnike = nikeproduct();
  var i;
  var nikeam = [];
  for (i = 0; i < allnike.length; i++) {
    if (allnike[i].product_name.indexOf("Max") != -1) nikeam.push(allnike[i]);
  }
  return nikeam;
}

function nikeazproduct() {
  var allnike = nikeproduct();
  var i;
  var nikeaz = [];
  for (i = 0; i < allnike.length; i++) {
    if (allnike[i].product_name.indexOf("Zoom") != -1) nikeaz.push(allnike[i]);
  }
  return nikeaz;
}

function vansproduct() {
  var allproduct = JSON.parse(localStorage.getItem("product"));
  var i;
  var allvans = [];
  for (i = 0; i < allproduct.length; i++) {
    if (allproduct[i].product_company.indexOf("VANS") == 0)
      allvans.push(allproduct[i]);
  }
  return allvans;
}

function vansosproduct() {
  var allvans = vansproduct();
  var i;
  var vansos = [];
  for (i = 0; i < allvans.length; i++) {
    if (allvans[i].product_name.indexOf("Old") != -1) vansos.push(allvans[i]);
  }
  return vansos;
}

function vanssoproduct() {
  var allvans = vansproduct();
  var i;
  var vansso = [];
  for (i = 0; i < allvans.length; i++) {
    if (allvans[i].product_name.indexOf("Slip") != -1) vansso.push(allvans[i]);
  }
  return vansso;
}

function vansclsproduct() {
  var allvans = vansproduct();
  var i;
  var vanscls = [];
  for (i = 0; i < allvans.length; i++) {
    if (allvans[i].product_name.indexOf("Classic") != -1)
      vanscls.push(allvans[i]);
  }
  return vanscls;
}

function newproduct() {
  var allproduct = JSON.parse(localStorage.getItem("product"));
  var i;
  var allnew = [];
  for (i = 0; i < allproduct.length; i++) {
    if (allproduct[i].product_type.indexOf("new") == 0)
      allnew.push(allproduct[i]);
  }
  return allnew;
}

function newnikeproduct() {
  var allnew = newproduct();
  var i;
  var newnike = [];
  for (i = 0; i < allnew.length; i++) {
    if (allnew[i].product_company.indexOf("NIKE") == 0) newnike.push(allnew[i]);
  }
  return newnike;
}

function newjordanproduct() {
  var allnew = newproduct();
  var i;
  var newjordan = [];
  for (i = 0; i < allnew.length; i++) {
    if (allnew[i].product_company.indexOf("JORDAN") == 0)
      newjordan.push(allnew[i]);
  }
  return newjordan;
}

function newvansproduct() {
  var allnew = newproduct();
  var i;
  var newvans = [];
  for (i = 0; i < allnew.length; i++) {
    if (allnew[i].product_company.indexOf("VANS") == 0) newvans.push(allnew[i]);
  }
  return newvans;
}

function saleproduct() {
  var allproduct = JSON.parse(localStorage.getItem("product"));
  var i;
  var allsale = [];
  for (i = 0; i < allproduct.length; i++) {
    if (allproduct[i].product_type.indexOf("%") != -1)
      allsale.push(allproduct[i]);
  }
  return allsale;
}

function sale10product() {
  var allsale = saleproduct();
  var i;
  var sale10 = [];
  for (i = 0; i < allsale.length; i++) {
    if (allsale[i].product_type.indexOf("10") != -1) sale10.push(allsale[i]);
  }
  return sale10;
}

function sale30product() {
  var allsale = saleproduct();
  var i;
  var sale30 = [];
  for (i = 0; i < allsale.length; i++) {
    if (allsale[i].product_type.indexOf("30") != -1) sale30.push(allsale[i]);
  }
  return sale30;
}

function innertitle() {
  if (check_url().indexOf("search") != -1) {
    return '<div  class="title_sp"> RESULT </div>';
  } else if (check_url().indexOf("product") != -1) {
    var value = whichproduct();
    if (value.indexOf("new") != -1) {
      if (value.indexOf("new_jordan") != -1)
        return '<div  class="title_sp"> New Jordan </div>';
      if (value.indexOf("new_nike") != -1)
        return '<div  class="title_sp"> New Nike </div>';
      if (value.indexOf("new_vans") != -1)
        return '<div  class="title_sp"> New Vans </div>';
      return '<div  class="title_sp"> New Items </div>';
    }
    if (value.indexOf("jordan") != -1) {
      if (value.indexOf("1low") != -1)
        return '<div  class="title_sp"> Jordan 1 Low </div>';
      if (value.indexOf("1mid") != -1)
        return '<div  class="title_sp"> Jordan 1 Mid </div>';
      if (value.indexOf("1high") != -1)
        return '<div  class="title_sp"> Jordan 1 High </div>';
      if (value.indexOf("4") != -1)
        return '<div  class="title_sp"> Jordan 4 </div>';
      return '<div  class="title_sp"> Jordan </div>';
    }
    if (value.indexOf("nike") != -1) {
      if (value.indexOf("af1") != -1)
        return '<div  class="title_sp"> Nike Air Force 1 </div>';
      if (value.indexOf("am") != -1)
        return '<div  class="title_sp"> Nike Air Max </div>';
      if (value.indexOf("az") != -1)
        return '<div  class="title_sp"> Nike Air Zoom </div>';
      return '<div  class="title_sp"> Nike Air </div>';
    }
    if (value.indexOf("vans") != -1) {
      if (value.indexOf("os") != -1)
        return '<div  class="title_sp"> Vans Old School </div>';
      if (value.indexOf("so") != -1)
        return '<div  class="title_sp"> Vans Slip On </div>';
      if (value.indexOf("cls") != -1)
        return '<div  class="title_sp"> Vans Classic </div>';
      return '<div  class="title_sp"> Vans </div>';
    }
    if (value.indexOf("sale") != -1) {
      if (value.indexOf("10") != -1)
        return '<div  class="title_sp"> Sale 10% </div>';
      if (value.indexOf("30") != -1)
        return '<div  class="title_sp"> Sale 30% </div>';
      return '<div  class="title_sp"> Sale </div>';
    }

    return '<div  class="title_sp"> All </div>';
  }
}

function innerproduct(array) {
  var i;
  var x = document.getElementById("main_product_container");
  var a = innertitle();
  if (array.length <= 8) {
    for (i = 0; i < array.length; i++) {
      a +=
        '<div class="main_product_item">\n<a onclick="detail_show(' +
        array[i].product_id +
        ')" class="main_product_info">\n<img src="' +
        array[i].product_img +
        '" />\n<a onclick="onClickDuaVaoGioHang(' +
        array[i].product_id +
        ')" class="main_product_buy">Thêm Vào Giỏ Hàng</a>\n<h3 class="main_product_name">' +
        array[i].product_name +
        '</h3>\n<div class="main_product_company" >' +
        array[i].product_company +
        '</div>\n<div class="main_product_price"><b>' +
        array[i].product_price +
        "</b></div>\n</a>\n</div>\n";
    }
    return (x.innerHTML = a);
  } else {
    for (i = 0; i < 8; i++) {
      a +=
        '<div class="main_product_item">\n<a onclick="detail_show(' +
        array[i].product_id +
        ')" class="main_product_info">\n<img src="' +
        array[i].product_img +
        '" />\n<a onclick="onClickDuaVaoGioHang(' +
        array[i].product_id +
        ')" class="main_product_buy">Thêm Vào Giỏ Hàng</a>\n<h3 class="main_product_name">' +
        array[i].product_name +
        '</h3>\n<div class="main_product_company" >' +
        array[i].product_company +
        '</div>\n<div class="main_product_price"><b>' +
        array[i].product_price +
        "</b></div>\n</a>\n</div>\n";
    }
    return (x.innerHTML = a);
  }
}

function innernewproduct() {
  var i;
  var x = document.getElementById("product_container");
  var array = newproduct();
  var a = "";
  if (array.length <= 8) {
    for (i = 0; i < array.length; i++) {
      a +=
        '<div class="main_product_item">\n<a onclick="detail_show(' +
        array[i].product_id +
        ')" class="main_product_info">\n<img src="' +
        array[i].product_img +
        '" />\n<a onclick="onClickDuaVaoGioHang(' +
        array[i].product_id +
        ')" class="main_product_buy">Thêm Vào Giỏ Hàng</a>\n<h3 class="main_product_name">' +
        array[i].product_name +
        '</h3>\n<div class="main_product_company" >' +
        array[i].product_company +
        '</div>\n<div class="main_product_price"><b>' +
        array[i].product_price +
        "</b></div>\n</a>\n</div>\n";
    }
    x.innerHTML = a;
  } else {
    for (i = 0; i < 8; i++) {
      a +=
        '<div class="main_product_item">\n<a onclick="detail_show(' +
        array[i].product_id +
        ')" class="main_product_info">\n<img src="' +
        array[i].product_img +
        '" />\n<a onclick="onClickDuaVaoGioHang(' +
        array[i].product_id +
        ')" class="main_product_buy">Thêm Vào Giỏ Hàng</a>\n<h3 class="main_product_name">' +
        array[i].product_name +
        '</h3>\n<div class="main_product_company" >' +
        array[i].product_company +
        '</div>\n<div class="main_product_price"><b>' +
        array[i].product_price +
        "</b></div>\n</a>\n</div>\n";
    }
    x.innerHTML = a;
  }
}
/*------------------Mảng sản phẩm---------------*/

/*-------------Phân Trang Sản Phẩm--------*/

function nextpage() {
  var x = document.getElementById("main_product_container");
  var a = innertitle();
  var recent = document.getElementById("pagination_center").value;
  var array = arrayproduct();
  var page;
  if (array.length % 8 == 0) page = array.length / 8;
  else page = (array.length - (array.length % 8)) / 8 + 1; // công thức chia lấy phần nguyên vì page là số thực
  if (recent >= page) {
    document.getElementById("pagination_right").style.color = "#e0e0e0";
    return false;
  }
  var start = recent * 8;
  if (start + 8 <= array.length) {
    var end = start + 8;
  } else var end = start + 8 - (start + 8 - array.length); // truong hop trang cuoi khong đủ 8sp
  for (i = start; i < end; i++) {
    a +=
      '<div class="main_product_item">\n<a onclick="detail_show(' +
      array[i].product_id +
      ')" class="main_product_info">\n<img src="' +
      array[i].product_img +
      '" />\n<a onclick="onClickDuaVaoGioHang(' +
      array[i].product_id +
      ')" class="main_product_buy">Thêm Vào Giỏ Hàng</a>\n<h3 class="main_product_name">' +
      array[i].product_name +
      '</h3>\n<div class="main_product_company" >' +
      array[i].product_company +
      '</div>\n<div class="main_product_price"><b>' +
      array[i].product_price +
      "</b></div>\n</a>\n</div>\n";
  }
  document.getElementById("pagination_center").value = Number(recent) + 1;
  document.getElementById("pagination_left").style.color = "black";
  x.innerHTML = a;
}

function prevpage() {
  var x = document.getElementById("main_product_container");
  var a = innertitle();
  var recent = document.getElementById("pagination_center").value;
  var array = arrayproduct();
  if (recent == 1) {
    document.getElementById("pagination_left").style.color = "#e0e0e0";
    return false;
  }
  var start = (recent - 2) * 8;
  var end = start + 8;
  for (i = start; i < end; i++) {
    a +=
      '<div class="main_product_item">\n<a onclick="detail_show(' +
      array[i].product_id +
      ')" class="main_product_info">\n<img src="' +
      array[i].product_img +
      '" />\n<a onclick="onClickDuaVaoGioHang(' +
      array[i].product_id +
      ')" class="main_product_buy">Thêm Vào Giỏ Hàng</a>\n<h3 class="main_product_name">' +
      array[i].product_name +
      '</h3>\n<div class="main_product_company" >' +
      array[i].product_company +
      '</div>\n<div class="main_product_price"><b>' +
      array[i].product_price +
      "</b></div>\n</a>\n</div>\n";
  }
  document.getElementById("pagination_center").value = Number(recent) - 1;
  document.getElementById("pagination_right").style.color = "black";
  x.innerHTML = a;
}

/*----Phan nay la ham nextpage prevpage cho sp moi o index---------- */

function newproduct_nextpage() {
  var x = document.getElementById("product_container");
  var a = "";
  var recent = document.getElementById("new_pagination_center").value;
  var array = newproduct();
  var page;
  if (array.length % 8 == 0) page = array.length / 8;
  else page = (array.length - (array.length % 8)) / 8 + 1; // công thức chia lấy phần nguyên vì page là số thực
  if (recent >= page) {
    document.getElementById("new_pagination_right").style.color = "#e0e0e0";
    return false;
  }
  var start = recent * 8;
  if (start + 8 <= array.length) {
    var end = start + 8;
  } else var end = start + 8 - (start + 8 - array.length); // truong hop trang cuoi khong đủ 8sp
  for (i = start; i < end; i++) {
    a +=
      '<div class="main_product_item">\n<a onclick="detail_show(' +
      array[i].product_id +
      ')" class="main_product_info">\n<img src="' +
      array[i].product_img +
      '" />\n<a onclick="onClickDuaVaoGioHang(' +
      array[i].product_id +
      ')" class="main_product_buy">Thêm Vào Giỏ Hàng</a>\n<h3 class="main_product_name">' +
      array[i].product_name +
      '</h3>\n<div class="main_product_company" >' +
      array[i].product_company +
      '</div>\n<div class="main_product_price"><b>' +
      array[i].product_price +
      "</b></div>\n</a>\n</div>\n";
  }
  document.getElementById("new_pagination_center").value = Number(recent) + 1;
  document.getElementById("new_pagination_left").style.color = "black";
  x.innerHTML = a;
}

function newproduct_prevpage() {
  var i;
  var x = document.getElementById("product_container");
  var recent = document.getElementById("new_pagination_center").value;
  var array = newproduct();
  var a = "";
  if (recent == 1) {
    document.getElementById("new_pagination_left").style.color = "#e0e0e0";
    return false;
  }
  var start = (recent - 2) * 8;
  var end = start + 8;
  for (i = start; i < end; i++) {
    a +=
      '<div class="main_product_item">\n<a onclick="detail_show(' +
      array[i].product_id +
      ')" class="main_product_info">\n<img src="' +
      array[i].product_img +
      '" />\n<a onclick="onClickDuaVaoGioHang(' +
      array[i].product_id +
      ')" class="main_product_buy">Thêm Vào Giỏ Hàng</a>\n<h3 class="main_product_name">' +
      array[i].product_name +
      '</h3>\n<div class="main_product_company" >' +
      array[i].product_company +
      '</div>\n<div class="main_product_price"><b>' +
      array[i].product_price +
      "</b></div>\n</a>\n</div>\n";
  }
  document.getElementById("new_pagination_center").value = Number(recent) - 1;
  document.getElementById("new_pagination_right").style.color = "black";
  x.innerHTML = a;
}

/* ----------------------------------Phan Chi Tiet SP----------------------------- */
function detail_exit() {
  document.getElementById("detail_container").style.display = "none";
}

function detail_inner(product_id) {
  var array = JSON.parse(localStorage.getItem("product"));
  var a = "";
  product_id = "'" + product_id + "'"; // id sp có thêm 2 nháy ở đầu
  for (var i = 0; i < array.length; i++) {
    if (product_id.localeCompare(array[i].product_id) == 0) {
      a +=
        '<img id="detail_img" src="' +
        array[i].product_img +
        '"><div id="detail_name">' +
        array[i].product_name +
        '</div> <div id="detail_company">Hãng Sản Xuất: ' +
        array[i].product_company +
        '</div><div id="detail_price">Giá: ' +
        array[i].product_price +
        '</div><div id="detail_text"><i class="bx bxs-calendar-check"></i>Hoặc trả góp trước với giá 1.000.000 ₫.</div>' +
        '<div id="detail_text1"><i class="bx bxs-bookmarks"></i>Giảm đến 500K cho Sinh Viên ĐHSG khi thanh toán ngay !!!</div>' +
        '<a id="detail_exit" style="background-image: url(image/logo_header/x.png) ;background-size:100% 100%; width: 30px; height: 30px; border: none;"  onclick="detail_exit()"></a>' +
        '<a id="detail_buy" onclick="onClickDuaVaoGioHang(' +
        array[i].product_id +
        ')" href="cart.html">Mua Ngay</a>' +
        '<a id="detail_cart" onclick="onClickDuaVaoGioHang(' +
        array[i].product_id +
        ')" href=index.html?type=all> Thêm Vào Giỏ Hàng </a>';
      console.log(a);
      x = document.getElementById("detail_form");
      return (x.innerHTML = a);
    }
  }
  return false;
}

function detail_show(product_id) {
  if (detail_inner(product_id))
    document.getElementById("detail_container").style.display = "block";
}

/*----Phan chinh gio hang--------- */
// Đưa vào giỏ hàng

// var keyLocalStorageItemGioHang = 'danhSachItemGioHang';
function show_giohang() {
  document.getElementById("body").style.display = "none";
  document.getElementById("cart_container").style.display = "block";
  hienThiDanhSachItemGioHang();
}
function exit_giohang() {
  document.getElementById("body").style.display = "block";
  document.getElementById("cart_container").style.display = "none";
}

function onClickDuaVaoGioHang(product_id) {
  console.log("ALO1;")
  if (JSON.parse(localStorage.getItem("login_status")) == true) {
    thongbao_ok();
    const products = JSON.parse(localStorage.getItem("product"));
    const product = products.find(
      (product) => product.product_id === `'${product_id}'`
    );
    var danhSachItemGioHang = layDanhSachItemGioHang();
    var coTonTaiTrongItemGioHang = false;
    for (var i = 0; i < danhSachItemGioHang.length; i++) {
      var itemGioHangHienTai = danhSachItemGioHang[i];

      // nếu tồn tại thì tăng số lượng
      if (itemGioHangHienTai.product_id == `'${product_id}'`) {
        danhSachItemGioHang[i].soluong++;
        coTonTaiTrongItemGioHang = true;
      }
    }
    //  nếu không tồn tại thì tạo ra đối tượng và thêm vào danh sách giỏ hàng
    if (coTonTaiTrongItemGioHang == false) {
      var itemGioHang = taoDoiTuongItemGioHang(product);
      danhSachItemGioHang.push(itemGioHang);
    }

    luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang);
  } else {
    thongbao_loi();
  }
}

function thongbao_ok() {
  var x = document.getElementById("thongbao");
  document.getElementById("thongbao").style.display = "block";
  var a = innertitle();
  a = `
  <div class="thongbao" id="thongbao" onclick="exit_tb()">      <video src="image/check/themok.mp4" autoplay muted >    </div>`;
  return (x.innerHTML = a);
}
function thongbao_loi() {
  var x = document.getElementById("thongbao");
  document.getElementById("thongbao").style.display = "block";
  var a = innertitle();
  a = `
  <div class="thongbao" id="thongbao" onclick="exit_tb()">      <video src="image/check/themloi.mp4" autoplay muted >    </div>`;
  return (x.innerHTML = a);
}
function exit_tb() {
  document.getElementById("thongbao").style.display = "none";
}

function taoDoiTuongItemGioHang(product) {
  var itemGioHang = new Object();

  
  itemGioHang = {
    product_id: product.product_id,
    product_img: product.product_img,
    product_name:product.product_name,
    product_price:product.product_price,
    soluong: 1
  };

  return itemGioHang;
}

function layDanhSachItemGioHang() {
  var danhSachItemGioHang = new Array();

  var jsonDanhSachItemGioHang = localStorage.getItem("GioHang");

    danhSachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);
  return danhSachItemGioHang;
}

function luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang) {
  var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);

  localStorage.setItem("GioHang", jsonDanhSachItemGioHang);
}

function hienThiDanhSachItemGioHang() {
  var danhSachItemGioHang = layDanhSachItemGioHang();

  var HTML = chuyenDanhSachItemGioHangHTML(danhSachItemGioHang);
  console.log(HTML);

  var nodeGioHang = document.getElementById("inner_giohang");
  nodeGioHang.innerHTML = HTML;
  tongThanhToan()

}

//chuyen 1 danh sách thanh html
//input danh sách item giỏ hàng
// output html hiện thị danh sách item giỏ hàng
function chuyenDanhSachItemGioHangHTML(danhSachItemGioHang) {
  var htmlTong = " ";
  for (var i = 0; i < danhSachItemGioHang.length; i++) {
    htmlTong =
      htmlTong + chuyenDoiTuongItemGioHangSangHTML(danhSachItemGioHang[i], i);
  }
  return htmlTong;
}

// chuyen 1 doi tuong thanh html
// input la doi tuong gio hang
// outtup la html hien thi item gio hang
function chuyenDoiTuongItemGioHangSangHTML(itemGioHang, num) {
  var html = `
    <div class="item-gio-hang">
      <div class="hinhAnh">
        <img src=${itemGioHang.product_img} />
      </div>
      <p class="ten">${itemGioHang.product_name}</p>
      <div class="gia">
        <span class="giagoc">${itemGioHang.product_price}</span>
      </div>
      <p class="soluong" value=>${itemGioHang.soluong}  </p>
      <p class="tongtien" id="tongtien">
        ${(parseInt(itemGioHang.product_price.replaceAll(".", "").replace("đ", "")) * itemGioHang.soluong).toLocaleString() +" đ"}
      </p>
      <div class="hanhdong">
        <div onclick="xoaSpTrongGio(${num})"><i class="fa-solid fa-trash"></i></div>
      </div>
      
    </div>
  `;
  return html;
}
function tongThanhToan(){
  const result = JSON.parse(localStorage.getItem("GioHang"))
  let sum = result.reduce((acc, item) => {
    console.log(item)
    return acc + (parseInt(item["product_price"].replaceAll(".", "").replaceAll("đ", "")) * item.soluong)
  }, 0)
  document.getElementById("tongThanhToan").innerHTML=`Tổng số tiền đơn hàng:<span> ${(sum).toLocaleString()+"đ"}</span>`;
}

function xoaSpTrongGio(num) {
  var jsonDonHang = JSON.parse(localStorage.getItem("GioHang"));
  jsonDonHang.splice(num, 1);
  localStorage.setItem("GioHang", JSON.stringify(jsonDonHang));
  hienThiDanhSachItemGioHang();
}
// kiểm tra form thông tin nhận hàng

function create_donhang() {
  if (localStorage.getItem("DonHang") == null) {
    var DonHangArray = [];
    localStorage.setItem("DonHang", JSON.stringify(DonHangArray));
  }
  if(localStorage.getItem("GioHang") == null){
    var giohangarray = [];
    localStorage.setItem("GioHang",JSON.stringify(giohangarray));
  }
}
function taoDonHang() {
  var userarray = JSON.parse(localStorage.getItem("user"));
  var login_index = JSON.parse(localStorage.getItem("login_index"));
  if (kiemtratt() == true) {
    var DonHangArray = JSON.parse(localStorage.getItem("DonHang"));
    var newDonHang = {
      email: userarray[login_index].email,
      hoten: document.getElementById("hoten").value,
      sdt: document.getElementById("sdt").value,
      diachi: document.getElementById("diachi").value,
      giohang: JSON.parse(localStorage.getItem("GioHang")),
      thanhtoan: document.getElementById("payment").value,
      tongtiendonhang: document.getElementById("tongThanhToan").querySelector('span').innerText,
      xuli: "false",
    };

    DonHangArray.push(newDonHang);
    localStorage.setItem("DonHang", JSON.stringify(DonHangArray));
    alert("đặt hàng thành công");
    localStorage.setItem("GioHang", JSON.stringify([]));
    window.location.reload();
    show_giohang();

  }
}

function kiemtratt() {
  var nodeHoten = document.getElementById("hoten").value;
  var nodeSdt = document.getElementById("sdt").value;
  var nodeDiaChi = document.getElementById("diachi").value;

  var error_msg = "";

  if (nodeHoten.match("^[A-Z a-z]{2,30}$") == null) {
    error_msg += "Hãy nhập đúng họ tên của bạn\n";
  }
  if (nodeSdt.match("^((/+84)|0)[0-9]{9,10}$") == null) {
    error_msg += "Nhập sai số điện thoại\n";
  }
  if (nodeDiaChi == null || nodeDiaChi.length == 0) {
    error_msg +=
      "Nhập đúng địa chỉ của bạn (Nếu nhập sai đơn sẽ không được giao)\n";
  }

  document.getElementById("error1").innerText = error_msg;
  if (error_msg == "") {
    return true;
  } else {
    return false;
  }
}
function kiemTraDonHang() {
  var userarray = JSON.parse(localStorage.getItem("user"));
  var login_index = JSON.parse(localStorage.getItem("login_index")); //chỉ số của user hiện đang đăng nhập
  var DonHangArray = JSON.parse(localStorage.getItem("DonHang"));
  for (var i = 0; i < DonHangArray.length; i++)
    if (userarray[login_index].email == DonHangArray[i].email) {
    }
  // GỌI hàm inner ra đơn hàng
}

/*----Ket thuc phan chinh gio hang---- */
