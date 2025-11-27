// ===============================
// بيانات المستخدمين (طلاب + مشرفين)
// ===============================

// الطلاب
const accounts = {
  "d92k1a9m3": { /*... موجود سابقاً ...*/ },
  "k29xqp811": { /*... موجود سابقاً ...*/ },
  "a12k9m3n7": { /*... موجود سابقاً ...*/ },
  "q8w2e9r3t": { /*... موجود سابقاً ...*/ },
  "m9n2b3v7x": { /*... موجود سابقاً ...*/ },
  "z8x1c3v6b": { /*... موجود سابقاً ...*/ },

  // الحساب الجديد المطلوب
  "new2/10": { // مصطفى أشرف
    pass: "default", // يمكن تغييره لاحقًا إذا أردت كلمة سر
    name: "مصطفى أشرف",
    grade: "الفرقة الثانية",
    section: "2/10",
    health: "جيدة",
    rating: 3.5,
    achievements: [
      "مقرر ثقافي وديني اتحاد الطلاب"
    ]
  },

  // المشرفين
  "adm9x1k2b": { /*... موجود سابقاً ...*/ },
  "adm8v2p9m": { /*... موجود سابقاً ...*/ },
  "adm7b3n4k": { /*... موجود سابقاً ...*/ }
};

// ===============================
// إضافة حساب الضيف (إذا لم يكن موجود)
// ===============================
if(!accounts["guest"]){
  accounts["guest"] = {
    pass: null,
    name: "زائر",
    role: "guest"
  };
}

// ===============================
// تسجيل الدخول كضيف
// ===============================
function guestLogin(){
  localStorage.setItem("loggedInUser", "guest");
  showGuestScreen();
}

// ===============================
// عرض شاشة الضيف
// ===============================
function showGuestScreen(){
  hideAll();
  document.getElementById("guest-screen").classList.remove("hidden");
}

// ===============================
// فتح صفحات الضيف
// ===============================
function openGuestPage(page){
  hideAll();
  document.getElementById(page + "-page").classList.remove("hidden");
}

// ===============================
// الرجوع لشاشة الضيف
// ===============================
function backGuest(){
  hideAll();
  document.getElementById("guest-screen").classList.remove("hidden");
}

// ===============================
// إخفاء جميع الشاشات
// ===============================
function hideAll(){
  document.querySelectorAll(".container").forEach(div => {
    div.classList.add("hidden");
  });
}

// ===============================
// تسجيل الدخول
// ===============================
function login() {
  const code = document.getElementById("code").value.trim();
  const pass = document.getElementById("password").value;

  if(!code || !pass){ alert("من فضلك أدخل الكود وكلمة السر"); return; }

  if(accounts[code] && accounts[code].pass === pass){
    localStorage.setItem("loggedInUser", code);
    showHome();
  } else {
    alert("الكود أو كلمة السر غير صحيحة");
  }
}

// ===============================
// عرض الشاشة الرئيسية
// ===============================
function showHome() {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("student-screen").classList.add("hidden");
  document.getElementById("initiatives-screen").classList.add("hidden");
  document.getElementById("home-screen").classList.remove("hidden");
}

// ===============================
// عرض بيانات الطالب
// ===============================
function showStudent() {
  const code = localStorage.getItem("loggedInUser");
  if(!code || !accounts[code]){ alert("سجل الدخول أولاً"); return; }

  const user = accounts[code];
  let achievementsHTML = user.achievements.map(a => `<li>${a}</li>`).join("");

  document.getElementById("user-info").innerHTML = `
    <div class="user-card">
      <h3>${user.name}</h3>
      <p>الفرقة: ${user.grade}</p>
      <p>الفصل: ${user.section}</p>
      <p>الحالة الصحية: ${user.health}</p>
      <p>التقييم: ${user.rating}</p>
      ${user.absent ? `<p>أيام الغياب: ${user.absent}</p>` : ""}
      <h4>الإنجازات:</h4>
      <ul>${achievementsHTML}</ul>
    </div>
  `;
  document.getElementById("home-screen").classList.add("hidden");
  document.getElementById("student-screen").classList.remove("hidden");
}

// ===============================
// البحث عن الطلاب للمشرفين
// ===============================
function searchStudent() {
  const searchInput = document.getElementById("search-student").value.toLowerCase();
  const resultsDiv = document.getElementById("search-results");
  resultsDiv.innerHTML = "";

  Object.keys(accounts).forEach(code => {
    const user = accounts[code];
    if(user.role === "student" && user.name.toLowerCase().includes(searchInput)){
      let achievementsHTML = user.achievements.map(a => `<li>${a}</li>`).join("");
      resultsDiv.innerHTML += `
        <div class="user-card">
          <h3>${user.name}</h3>
          <p>الفرقة: ${user.grade}</p>
          <p>الفصل: ${user.section}</p>
          <p>الحالة الصحية: ${user.health}</p>
          <p>التقييم: ${user.rating}</p>
          ${user.absent ? `<p>أيام الغياب: ${user.absent}</p>` : ""}
          <h4>الإنجازات:</h4>
          <ul>${achievementsHTML}</ul>
        </div>
      `;
    }
  });
}

// ===============================
// عرض المبادرات
// ===============================
function showInitiatives() {
  document.getElementById("home-screen").classList.add("hidden");
  document.getElementById("student-screen").classList.add("hidden");
  document.getElementById("initiatives-screen").classList.remove("hidden");
}

// ===============================
// العودة للشاشة الرئيسية
// ===============================
function backHome(){
  showHome();
}

// ===============================
// فتح الروابط والخدمات
// ===============================
function openPage(name){
  switch(name){
    case "حالة":
      showStudent();
      break;
    case "المبادرات":
      showInitiatives();
      break;
    case "وزارة":
      window.location.href = "https://ellibrary.moe.gov.eg/books/";
      break;
    case "مسابقات":
      window.location.href = "https://ellibrary.moe.gov.eg/books/";
      break;
    case "اعلانات":
      window.location.href = "https://whatsapp.com/channel/0029VbBX4wo1SWstPmiejS0F";
      break;
    default:
      alert("الرابط غير موجود");
  }
}

// ===============================
// فتح بوت التليجرام
// ===============================
function openTelegram(){
  window.open("https://t.me/nasr_military_students_bot", "_blank");
}

// ===============================
// حفظ الجلسة عند فتح الموقع
// ===============================
window.onload = function(){
  const code = localStorage.getItem("loggedInUser");
  if(code && accounts[code]){
    showHome();
  }
}

// ===============================
// تسجيل خروج
// ===============================
function logout(){
  localStorage.removeItem("loggedInUser");
  location.reload();
  }
