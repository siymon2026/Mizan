/* ==========================================================
   إعدادات قابلة للتعديل
   ========================================================== */
const PRODUCT_NAME = "ميزان إلكتروني للحساب والتسعير";
const PRODUCT_PRICE = 349;       // السعر الحالي (درهم)
const OLD_PRICE = 499;           // السعر قبل الخصم (درهم)
const WHATSAPP_NUMBER = "212XXXXXXXXX"; // رقم واتساب بصيغة دولية بدون + أو 00
const DELIVERY_TEXT = "التوصيل متوفر لجميع المدن";

const WHATSAPP_MESSAGE = "السلام عليكم، أريد طلب الميزان الإلكتروني للحساب والتسعير.";

const FAQ_ITEMS = [
  {
    q: "هل الميزان مناسب للمحلات؟",
    a: "نعم، الميزان مصمم لتلبية احتياجات المحلات التجارية والمشاريع الصغيرة، ويساعد في تسريع عملية الوزن والحساب اليومي."
  },
  {
    q: "كيف يتم حساب السعر؟",
    a: "تقوم بإدخال سعر الوحدة، ويقوم الميزان تلقائياً بحساب السعر الإجمالي حسب وزن المنتج الموضوع عليه."
  },
  {
    q: "هل يوجد الدفع عند الاستلام؟",
    a: "نعم، الدفع يتم عند استلام الطلب مباشرة."
  },
  {
    q: "هل يوجد توصيل؟",
    a: DELIVERY_TEXT + "."
  },
  {
    q: "ما هي أقصى حمولة؟",
    a: "أقصى وزن يمكن للميزان قياسه هو 30 كغ، مع حد أدنى للوزن يبلغ 200 غ."
  },
  {
    q: "هل الميزان سهل الاستخدام؟",
    a: "نعم، واجهة الميزان بسيطة وواضحة، ويمكن استخدامه يومياً دون الحاجة لخبرة تقنية."
  }
];

/* ==========================================================
   تهيئة السعر والعرض
   ========================================================== */
function initOffer() {
  const priceNewEl = document.getElementById("priceNew");
  const priceOldEl = document.getElementById("priceOld");
  if (priceNewEl) priceNewEl.textContent = `${PRODUCT_PRICE} درهم`;
  if (priceOldEl) priceOldEl.textContent = `${OLD_PRICE} درهم`;
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
   زر واتساب العائم
   ========================================================== */
function initWhatsapp() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const fab = document.getElementById("whatsappFab");
  if (fab) fab.setAttribute("href", url);
  const footerLink = document.getElementById("footerWhatsapp");
  if (footerLink) footerLink.setAttribute("href", url);
}

/* ==========================================================
   الأسئلة الشائعة (Accordion)
   ========================================================== */
function initFaq() {
  const wrap = document.getElementById("faqAccordion");
  if (!wrap) return;

  FAQ_ITEMS.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "accordion-item";

    const panelId = `faq-panel-${index}`;
    const triggerId = `faq-trigger-${index}`;

    itemEl.innerHTML = `
      <h3>
        <button class="accordion-trigger" id="${triggerId}" aria-expanded="false" aria-controls="${panelId}">
          <span>${item.q}</span>
          <svg class="accordion-icon" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </h3>
      <div class="accordion-panel" id="${panelId}" role="region" aria-labelledby="${triggerId}">
        <div class="accordion-panel-inner">${item.a}</div>
      </div>
    `;
    wrap.appendChild(itemEl);
  });

  wrap.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      // إغلاق كل العناصر الأخرى
      wrap.querySelectorAll(".accordion-trigger").forEach((t) => {
        if (t !== trigger) {
          t.setAttribute("aria-expanded", "false");
          const p = document.getElementById(t.getAttribute("aria-controls"));
          if (p) p.style.maxHeight = null;
        }
      });

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
    });
  });
}

/* ==========================================================
   نموذج الطلب
   ========================================================== */
function isValidMoroccanPhone(value) {
  const cleaned = value.replace(/[\s-]/g, "");
  // 0[5-7]XXXXXXXX أو +212[5-7]XXXXXXXX أو 00212[5-7]XXXXXXXX
  return /^(0[5-7][0-9]{8}|(\+212|00212)[5-7][0-9]{8})$/.test(cleaned);
}

function initOrderForm() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  const submitBtn = document.getElementById("orderSubmitBtn");
  const successMsg = document.getElementById("orderSuccess");

  const fields = {
    fullName: { el: form.fullName, validate: (v) => v.trim().length >= 3, message: "الرجاء إدخال الاسم الكامل." },
    phone: { el: form.phone, validate: isValidMoroccanPhone, message: "الرجاء إدخال رقم هاتف مغربي صحيح." },
    city: { el: form.city, validate: (v) => v.trim().length >= 2, message: "الرجاء إدخال المدينة." },
    address: { el: form.address, validate: (v) => v.trim().length >= 5, message: "الرجاء إدخال العنوان بالتفصيل." },
    quantity: { el: form.quantity, validate: (v) => Number(v) >= 1, message: "الرجاء إدخال كمية صحيحة." }
  };

  function setError(name, message) {
    const row = fields[name].el.closest(".form-row");
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (message) {
      row.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
    } else {
      row.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    }
  }

  function validateField(name) {
    const { el, validate, message } = fields[name];
    const ok = validate(el.value);
    setError(name, ok ? "" : message);
    return ok;
  }

  Object.keys(fields).forEach((name) => {
    fields[name].el.addEventListener("blur", () => validateField(name));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allValid = true;
    Object.keys(fields).forEach((name) => {
      if (!validateField(name)) allValid = false;
    });

    if (!allValid) return;

    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
      form.querySelectorAll("input").forEach((input) => (input.style.display = "none"));
      form.querySelectorAll(".form-row label").forEach((label) => (label.style.display = "none"));
      submitBtn.style.display = "none";
      successMsg.hidden = false;
    }, 1100);
  });
}

/* ==========================================================
   تشغيل كل شيء
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initOffer();
  initMobileNav();
  initWhatsapp();
  initFaq();
  initOrderForm();
});
