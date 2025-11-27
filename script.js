// ===============================
// script.js - ملف الجافاسكريبت المراجع
// ===============================

// ===============================
// بيانات المستخدمين (طلاب + مشرفين)
// ===============================
const accounts = {
  "d92k1a9m3": { // يحيى حسين احمد
    pass: "p9f2k1a8",
    name: "يحيى حسين احمد",
    grade: "الفرقة الثانية",
    section: "3/8",
    health: "جيدة",
    rating: 4.5,
    achievements: [
      "امين مساعد اتحاد طلاب المدرسة",
      "نائب رئيس جماعة مناهضة التدخين والإدمان بالمدرسة",
      "قام بإلقاء ندوة عن ذلك في المدرسة وموثقة على صفحة المدرسة في فيسبوك",
      "مقرر اجتماعي لاتحاد العام السابق"
    ]
  },
  "k29xqp811": { // محمود أبو العزايم محمود
    pass: "m4k1a2q9",
    name: "محمود أبو العزايم محمود",
    grade: "الفرقة الثانية",
    section: "2/1",
    health: "جيدة",
    rating: 4.5,
    achievements: [
      "امين عام اتحاد الطلاب في المدرسة",
      "طالب إذاعة مدرسية"
    ]
  },
  "a12k9m3n7": { // مصطفى أحمد محمد أحمد مصطفى
    pass: "z9x1c3v8",
    name: "مصطفى أحمد محمد أحمد مصطفى",
    grade: "الفرقة الثانية",
    section: "4/2",
    health: "جيدة",
    rating: 3.5,
    achievements: [
      "مقرر اجتماعي اتحاد الطلاب لهذا العام",
      "أمين فصل 2/4"
    ],
    absent: 5
  },
  "q8w2e9r3t": { // عبدالله محمد عبدالله
    pass: "b3v7m1k9",
    name: "عبدالله محمد عبدالله",
    grade: "الفرقة الثانية",
    section: "2/8",
    health: "جيدة",
    rating: 3.5,
    achievements: [
      "مقرر رياضي لهذا العام اتحاد الطلاب",
      "مقرر علمي للعام الدراسي السابق"
    ],
    absent: 7
  },
  "m9n2b3v7x": { // محمد سيد أحمد
    pass: "k4j1l2p9",
    name: "محمد سيد أحمد",
    grade: "الفرقة الثانية",
    section: "2/6",
    health: "جيدة",
    rating: 3.5,
    achievements: []
  },
  "z8x1c3v6b": { // أياد محمد ياسر
    pass: "t9y1u2o7",
    name: "أياد محمد ياسر",
    grade: "الفرقة الأولى",
    section: "1/6",
    health: "جيدة",
    rating: 3.5,
    achievements: [
      "مقرر فني اتحاد الطلاب"
    ]
  },

  // الحساب الجديد الذي طلبته (مصطفى أشرف)
  "new2/10": {
    pass: "default",
    name: "مصطفى أشرف",
    grade: "الفرقة الثانية",
    section: "2/10",
    health: "جيدة",
    rating: 3.5,
    achievements: [
      "مقرر ثقافي وديني اتحاد الطلاب"
    ]
  },

  // المشرفين (ادمن)
  "adm9x1k2b": {
    pass: "adm12345",
    name: "أ/ عمري كامل",
    role: "admin",
    title: "مدير عام المدرسة"
  },
  "adm8v2p9m": {
    pass: "adm98765",
    name: "أ/ محمد عارف",
    role: "admin",
    title: "مشرف اتحاد الطلاب"
  },
  "adm7b3n4k": {
    pass: "adm24680",
    name: "أ/ عز كدواني",
    role: "admin",
    title: "مسؤول IT بالمدرسة"
  }
};

// ===============================
// تهيئة: ضمان وجود role لجميع الحسابات (student | admin | guest)
// ===============================
Object.keys(accounts).forEach(key => {
  if (!accounts[key].role) {
    // إذا كان الحقل title موجود و يبدو كـ admin، لا نغيّره
    // لكن بشكل افتراضي نعتبرهم طلاب
    accounts[key].role = "student";
  }
});

// ===============================
// إضافة حساب الضيف (إذا لم يكن موجود)
// ===============================
if (!accounts["guest"]) {
  accounts["guest"] = {
    pass: null,
    name: "زائر",
    role: "guest"
  };
}

// ===============================
// دوال واجهة المستخدم للضيف
// ===============================
function guestLogin() {
  localStorage.setItem("loggedInUser", "guest");
  showGuestScreen();
}

function showGuestScreen() {
  hideAll();
  const gs = document.getElementById("guest-screen");
  if (gs) gs.classList.remove("hidden");
  else showHome(); // fallback آمن لو شاشة الضيف غير موجودة
}

function openGuestPage(page) {
  hideAll();
  // صفحات الضيف مُعرّفة في HTML كـ "about-page", "competitions-page", ...
  const el = document.getElementById(page + "-page");
  if (el) el.classList.remove("hidden");
  else {
    console.warn("صفحة الضيف غير موجودة:", page);
    showGuestScreen();
  }
}

function backGuest() {
  hideAll();
  const gs = document.getElementById("guest-screen");
  if (gs) gs.classList.remove("hidden");
  else showHome();
}

// ===============================
// دوال مساعدة لإدارة الشاشات
// ===============================
function hideAll() {
  document.querySelectorAll(".container").forEach(div => {
    div.classList.add("hidden");
  });
}

// ===============================
// تسجيل الدخول (طلاب / مشرفين)
// ===============================
function login() {
  const code = document.getElementById("code").value.trim();
  const pass = document.getElementById("password").value;

  if (!code || !pass) {
    alert("من فضلك أدخل الكود وكلمة السر");
    return;
  }

  if (accounts[code] && accounts[code].pass === pass) {
    localStorage.setItem("loggedInUser", code);
    // توجيه بحسب الدور
    const role = accounts[code].role;
    if (role === "guest") showGuestScreen();
    else showHome();
  } else {
    alert("الكود أو كلمة السر غير صحيحة");
  }
}

// ===============================
// عرض الشاشة الرئيسية (الخدمات)
// ===============================
function showHome() {
  // اخفاء كل الشاشات ثم اظهار الشاشة الرئيسية
  hideAll();
  const home = document.getElementById("home-screen");
  if (home) home.classList.remove("hidden");
}

// ===============================
// عرض بيانات الطالب
// ===============================
function showStudent() {
  const code = localStorage.getItem("loggedInUser");
  if (!code || !accounts[code]) {
    alert("سجل الدخول أولاً");
    return;
  }

  const user = accounts[code];

  // تحسّن: تأكد أن achievements مصفوفة
  const achievements = Array.isArray(user.achievements) ? user.achievements : [];
  const achievementsHTML = achievements.length ? achievements.map(a => `<li>${escapeHtml(a)}</li>`).join("") : `<li>لا توجد إنجازات</li>`;

  // استخدم template literal بشكل صحيح
  document.getElementById("user-info").innerHTML = `
    <div class="user-card">
      <h3>${escapeHtml(user.name || "")}</h3>
      <p>الفرقة: ${escapeHtml(user.grade || "")}</p>
      <p>الفصل: ${escapeHtml(user.section || "")}</p>
      <p>الحالة الصحية: ${escapeHtml(user.health || "")}</p>
      <p>التقييم: ${escapeHtml(user.rating != null ? user.rating : "")}</p>
      ${user.absent ? `<p>أيام الغياب: ${escapeHtml(user.absent)}</p>` : ""}
      <h4>الإنجازات:</h4>
      <ul>${achievementsHTML}</ul>
    </div>
  `;
  // اظهار شاشة الطالب
  hideAll();
  const studentScreen = document.getElementById("student-screen");
  if (studentScreen) studentScreen.classList.remove("hidden");
}

// ===============================
// البحث عن الطلاب للمشرفين
// ===============================
function searchStudent() {
  const inputEl = document.getElementById("search-student");
  if (!inputEl) return; // لا توجد واجهة بحث حالياً

  const searchInput = inputEl.value.toLowerCase();
  const resultsDiv = document.getElementById("search-results");
  if (!resultsDiv) return;

  resultsDiv.innerHTML = "";

  Object.keys(accounts).forEach(code => {
    const user = accounts[code];
    if (user && user.role === "student" && user.name && user.name.toLowerCase().includes(searchInput)) {
      const achievements = Array.isArray(user.achievements) ? user.achievements : [];
      const achievementsHTML = achievements.length ? achievements.map(a => `<li>${escapeHtml(a)}</li>`).join("") : `<li>لا توجد إنجازات</li>`;

      resultsDiv.innerHTML += `
        <div class="user-card">
          <h3>${escapeHtml(user.name)}</h3>
          <p>الفرقة: ${escapeHtml(user.grade || "")}</p>
          <p>الفصل: ${escapeHtml(user.section || "")}</p>
          <p>الحالة الصحية: ${escapeHtml(user.health || "")}</p>
          <p>التقييم: ${escapeHtml(user.rating != null ? user.rating : "")}</p>
          ${user.absent ? `<p>أيام الغياب: ${escapeHtml(user.absent)}</p>` : ""}
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
  hideAll();
  const el = document.getElementById("initiatives-screen");
  if (el) el.classList.remove("hidden");
}

// ===============================
// العودة للشاشة الرئيسية
// ===============================
function backHome() {
  showHome();
}

// ===============================
// فتح الروابط والخدمات (الخدمات العامة)
// ===============================
function openPage(name) {
  switch (name) {
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
function openTelegram() {
  window.open("https://t.me/nasr_military_students_bot", "_blank");
}

// ===============================
// حفظ الجلسة عند فتح الموقع - توجيه ذكي حسب الدور
// ===============================
window.onload = function () {
  const code = localStorage.getItem("loggedInUser");
  if (code && accounts[code]) {
    const role = accounts[code].role;
    if (role === "guest") {
      showGuestScreen();
    } else {
      showHome();
    }
  } else {
    // عرض شاشة الدخول فقط
    hideAll();
    const login = document.getElementById("login-screen");
    if (login) login.classList.remove("hidden");
  }
};

// ===============================
// تسجيل خروج
// ===============================
function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

// ===============================
// دالة مساعدة: هروب عن النصوص لحماية الHTML (أمنة وبسيطة)
// ===============================
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
    }
