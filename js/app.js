/* ==========================================================
   إعدادات قابلة للتعديل — MEDINA
   ========================================================== */
const BRAND_NAME = "MEDINA";
const SERVICE_PHONE = "0617139424";           // رقم خدمة العملاء المعروض فوق الموقع
const WHATSAPP_NUMBER = "212617139424";       // رقم واتساب بصيغة دولية بدون + أو 00

const FEATURED_PRODUCT_NAME = "MEDINA SCALE S400";
const FEATURED_PRICE = 299;   // السعر الحالي (درهم)
const FEATURED_OLD_PRICE = 399; // السعر قبل الخصم (درهم)

const WHATSAPP_MESSAGE = `Bonjour, je souhaite commander : ${FEATURED_PRODUCT_NAME}.`;

/* ==========================================================
   شريط الهاتف العلوي
   ========================================================== */
function initTopBar() {
  const phoneLink = document.getElementById("topBarPhone");
  if (!phoneLink) return;
  phoneLink.textContent = SERVICE_PHONE;
  phoneLink.setAttribute("href", `tel:${SERVICE_PHONE.replace(/\s+/g, "")}`);
}

/* ==========================================================
   السعر المميز
   ========================================================== */
function initOffer() {
  const newEl = document.getElementById("offerPriceNew");
  const oldEl = document.getElementById("offerPriceOld");
  if (newEl) newEl.textContent = `${FEATURED_PRICE} DH`;
  if (oldEl) oldEl.textContent = `${FEATURED_OLD_PRICE} DH`;
}

/* ==========================================================
   روابط واتساب (الزر العائم + كل أزرار الطلب عبر واتساب)
   ========================================================== */
function initWhatsapp() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  document.querySelectorAll(".js-whatsapp-link, #heroWhatsapp, #footerWhatsapp").forEach((link) => {
    link.setAttribute("href", url);
  });
}

/* ==========================================================
   القائمة على الهاتف
   ========================================================== */
function initMobileNav() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !header || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================
   تشغيل كل شيء
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initTopBar();
  initOffer();
  initWhatsapp();
  initMobileNav();
});
