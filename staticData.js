const questions = [
  // 📁 غذا و خوراکی
  {
    question: "زعفران بیشتر در کدام کشور تولید می‌شود؟",
    answerOne: "ایران",
    answerTwo: "هند",
    answerThree: "چین",
    answerFour: "اسپانیا",
    correctAnswer: "ایران",
    category: "غذا و خوراکی",
    publish: true,
  },
  {
    question: "معروف‌ترین غذای ایتالیایی چیست؟",
    answerOne: "پیتزا",
    answerTwo: "کوسکوس",
    answerThree: "سوپ",
    answerFour: "خورش کاری",
    correctAnswer: "پیتزا",
    category: "غذا و خوراکی",
    publish: true,
  },
  {
    question: "کدام ماده غذایی سرشار از پروتئین است؟",
    answerOne: "گوشت",
    answerTwo: "سیب",
    answerThree: "برنج",
    answerFour: "شکلات",
    correctAnswer: "گوشت",
    category: "غذا و خوراکی",
    publish: true,
  },
  {
    question: 'در تهیه "فسنجان" از چه نوع مغزی استفاده می‌شود؟',
    answerOne: "فندق",
    answerTwo: "گردو",
    answerThree: "بادام",
    answerFour: "پسته",
    correctAnswer: "گردو",
    category: "غذا و خوراکی",
    publish: true,
  },
  {
    question: "سوشی غذای سنتی کدام کشور است؟",
    answerOne: "ژاپن",
    answerTwo: "کره",
    answerThree: "چین",
    answerFour: "تایلند",
    correctAnswer: "ژاپن",
    category: "غذا و خوراکی",
    publish: true,
  },
  {
    question: '"چلوکباب" معروف‌ترین غذای کدام کشور است؟',
    answerOne: "ترکیه",
    answerTwo: "عراق",
    answerThree: "ایران",
    answerFour: "لبنان",
    correctAnswer: "ایران",
    category: "غذا و خوراکی",
    publish: true,
  },
  {
    question: '"پاستا" با چه ماده‌ای درست می‌شود؟',
    answerOne: "برنج",
    answerTwo: "گندم",
    answerThree: "ذرت",
    answerFour: "جو",
    correctAnswer: "گندم",
    category: "غذا و خوراکی",
    publish: true,
  },
  {
    question: "معروف‌ترین نوشیدنی گرم جهان چیست؟",
    answerOne: "قهوه",
    answerTwo: "آب",
    answerThree: "دوغ",
    answerFour: "آبمیوه",
    correctAnswer: "قهوه",
    category: "غذا و خوراکی",
    publish: true,
  },
  {
    question: "خرما بیشتر در چه اقلیمی رشد می‌کند؟",
    answerOne: "معتدل",
    answerTwo: "کوهستانی",
    answerThree: "بیابانی",
    answerFour: "سردسیر",
    correctAnswer: "بیابانی",
    category: "غذا و خوراکی",
    publish: true,
  },
  {
    question: "پنیر از چه ماده‌ای تهیه می‌شود؟",
    answerOne: "شیر",
    answerTwo: "تخم‌مرغ",
    answerThree: "آرد",
    answerFour: "روغن",
    correctAnswer: "شیر",
    category: "غذا و خوراکی",
    publish: true,
  },

  // 🌍 جغرافیا
  {
    question: "بلندترین کوه جهان کدام است؟",
    answerOne: "اورست",
    answerTwo: "دماوند",
    answerThree: "کلیمانجارو",
    answerFour: "آلپ",
    correctAnswer: "اورست",
    category: "جغرافیا",
    publish: true,
  },
  {
    question: "پایتخت فرانسه چیست؟",
    answerOne: "لندن",
    answerTwo: "پاریس",
    answerThree: "رم",
    answerFour: "برلین",
    correctAnswer: "پاریس",
    category: "جغرافیا",
    publish: true,
  },
  {
    question: "رود نیل در کدام قاره قرار دارد؟",
    answerOne: "آسیا",
    answerTwo: "آفریقا",
    answerThree: "اروپا",
    answerFour: "آمریکا",
    correctAnswer: "آفریقا",
    category: "جغرافیا",
    publish: true,
  },
  {
    question: "کشور آلمان در کدام قاره است؟",
    answerOne: "آسیا",
    answerTwo: "اروپا",
    answerThree: "آمریکا",
    answerFour: "آفریقا",
    correctAnswer: "اروپا",
    category: "جغرافیا",
    publish: true,
  },
  {
    question: "کویر لوت در کدام کشور قرار دارد؟",
    answerOne: "مصر",
    answerTwo: "ایران",
    answerThree: "عربستان",
    answerFour: "هند",
    correctAnswer: "ایران",
    category: "جغرافیا",
    publish: true,
  },
  {
    question: "طولانی‌ترین رود جهان چیست؟",
    answerOne: "آمازون",
    answerTwo: "نیل",
    answerThree: "می‌سی‌سی‌پی",
    answerFour: "دانوب",
    correctAnswer: "نیل",
    category: "جغرافیا",
    publish: true,
  },
  {
    question: "پرجمعیت‌ترین کشور جهان کدام است؟",
    answerOne: "هند",
    answerTwo: "آمریکا",
    answerThree: "چین",
    answerFour: "روسیه",
    correctAnswer: "چین",
    category: "جغرافیا",
    publish: true,
  },
  {
    question: "قطب شمال در کدام اقیانوس قرار دارد؟",
    answerOne: "آرام",
    answerTwo: "اطلس",
    answerThree: "هند",
    answerFour: "منجمد شمالی",
    correctAnswer: "منجمد شمالی",
    category: "جغرافیا",
    publish: true,
  },
  {
    question: "کدام کشور به سرزمین هزار دریاچه معروف است؟",
    answerOne: "سوئیس",
    answerTwo: "فنلاند",
    answerThree: "کانادا",
    answerFour: "نروژ",
    correctAnswer: "فنلاند",
    category: "جغرافیا",
    publish: true,
  },
  {
    question: "جزیره کیش در کدام خلیج قرار دارد؟",
    answerOne: "خلیج فارس",
    answerTwo: "دریای عمان",
    answerThree: "خزر",
    answerFour: "مدیترانه",
    correctAnswer: "خلیج فارس",
    category: "جغرافیا",
    publish: true,
  },

  {
    question: "بزرگ‌ترین سیاره منظومه شمسی چیست؟",
    answerOne: "زمین",
    answerTwo: "مشتری",
    answerThree: "مریخ",
    answerFour: "نپتون",
    correctAnswer: "مشتری",
    category: "نجوم",
    publish: true,
  },
  {
    question: "خورشید یک ... است؟",
    answerOne: "سیاره",
    answerTwo: "قمر",
    answerThree: "ستاره",
    answerFour: "شهاب‌سنگ",
    correctAnswer: "ستاره",
    category: "نجوم",
    publish: true,
  },
  {
    question: "نزدیک‌ترین سیاره به خورشید چیست؟",
    answerOne: "زمین",
    answerTwo: "عطارد",
    answerThree: "زهره",
    answerFour: "مریخ",
    correctAnswer: "عطارد",
    category: "نجوم",
    publish: true,
  },
  {
    question: "ماه به دور چه چیزی می‌چرخد؟",
    answerOne: "خورشید",
    answerTwo: "مریخ",
    answerThree: "زهره",
    answerFour: "زمین",
    correctAnswer: "زمین",
    category: "نجوم",
    publish: true,
  },
  {
    question: "کدام سیاره به عنوان سیاره سرخ شناخته می‌شود؟",
    answerOne: "زهره",
    answerTwo: "مشتری",
    answerThree: "نپتون",
    answerFour: "مریخ",
    correctAnswer: "مریخ",
    category: "نجوم",
    publish: true,
  },
  {
    question: "کهکشان راه شیری شامل چند ستاره است؟",
    answerOne: "۱۰۰۰",
    answerTwo: "یک میلیون",
    answerThree: "۱۰۰ میلیارد",
    answerFour: "بی‌نهایت",
    correctAnswer: "۱۰۰ میلیارد",
    category: "نجوم",
    publish: true,
  },
  {
    question: "سیاره زحل به چه چیزی معروف است؟",
    answerOne: "رنگ قرمز",
    answerTwo: "داشتن قمر زیاد",
    answerThree: "داشتن حلقه",
    answerFour: "دمای بالا",
    correctAnswer: "داشتن حلقه",
    category: "نجوم",
    publish: true,
  },
  {
    question: "در چه واحدی فاصله‌ی ستارگان اندازه‌گیری می‌شود؟",
    answerOne: "کیلومتر",
    answerTwo: "مایل",
    answerThree: "سال نوری",
    answerFour: "متر",
    correctAnswer: "سال نوری",
    category: "نجوم",
    publish: true,
  },
  {
    question: "آندرومدا چیست؟",
    answerOne: "ستاره",
    answerTwo: "سیاره",
    answerThree: "قمر",
    answerFour: "کهکشان",
    correctAnswer: "کهکشان",
    category: "نجوم",
    publish: true,
  },
  {
    question: "چند سیاره در منظومه شمسی وجود دارد؟",
    answerOne: "۷",
    answerTwo: "۸",
    answerThree: "۹",
    answerFour: "۱۰",
    correctAnswer: "۸",
    category: "نجوم",
    publish: true,
  },
  {
    question: "انقلاب مشروطه در چه سالی رخ داد؟",
    answerOne: "۱۲۸۵ هجری شمسی",
    answerTwo: "۱۳۰۰ هجری شمسی",
    answerThree: "۱۳۵۷ هجری شمسی",
    answerFour: "۱۲۹۹ هجری شمسی",
    correctAnswer: "۱۲۸۵ هجری شمسی",
    category: "تاریخ",
    publish: true,
  },
  {
    question: "جنگ جهانی دوم در چه سالی آغاز شد؟",
    answerOne: "۱۹۱۴",
    answerTwo: "۱۹۳۹",
    answerThree: "۱۹۴۵",
    answerFour: "۱۹۵۰",
    correctAnswer: "۱۹۳۹",
    category: "تاریخ",
    publish: true,
  },
  {
    question: "کوروش کبیر بنیان‌گذار کدام سلسله بود؟",
    answerOne: "اشکانیان",
    answerTwo: "ساسانیان",
    answerThree: "هخامنشیان",
    answerFour: "صفویان",
    correctAnswer: "هخامنشیان",
    category: "تاریخ",
    publish: true,
  },
  {
    question: "اولین رئیس‌جمهور آمریکا چه کسی بود؟",
    answerOne: "لینکلن",
    answerTwo: "واشنگتن",
    answerThree: "اوباما",
    answerFour: "کلینتون",
    correctAnswer: "واشنگتن",
    category: "تاریخ",
    publish: true,
  },
  {
    question: "تمدن مصر باستان در کنار کدام رود شکل گرفت؟",
    answerOne: "دجله",
    answerTwo: "فرات",
    answerThree: "نیل",
    answerFour: "گنگ",
    correctAnswer: "نیل",
    category: "تاریخ",
    publish: true,
  },
  {
    question: "قلعه الموت متعلق به کدام فرقه بود؟",
    answerOne: "اسماعیلیه",
    answerTwo: "زرتشتیان",
    answerThree: "یهودیان",
    answerFour: "مسیحیان",
    correctAnswer: "اسماعیلیه",
    category: "تاریخ",
    publish: true,
  },
  {
    question: "ناپلئون اهل کدام کشور بود؟",
    answerOne: "آلمان",
    answerTwo: "اسپانیا",
    answerThree: "فرانسه",
    answerFour: "ایتالیا",
    correctAnswer: "فرانسه",
    category: "تاریخ",
    publish: true,
  },
  {
    question: "جنگ ایران و عراق در چه سالی شروع شد؟",
    answerOne: "۱۳۵۷",
    answerTwo: "۱۳۵۹",
    answerThree: "۱۳۶۵",
    answerFour: "۱۳۷۰",
    correctAnswer: "۱۳۵۹",
    category: "تاریخ",
    publish: true,
  },
  {
    question: "هیتلر رهبر کدام حزب بود؟",
    answerOne: "کمونیست",
    answerTwo: "سوسیالیست",
    answerThree: "نازی",
    answerFour: "محافظه‌کار",
    correctAnswer: "نازی",
    category: "تاریخ",
    publish: true,
  },
  {
    question: "چاپ اولین قرآن در ایران در چه دوره‌ای بود؟",
    answerOne: "قاجار",
    answerTwo: "صفویه",
    answerThree: "پهلوی",
    answerFour: "تیموریان",
    correctAnswer: "قاجار",
    category: "تاریخ",
    publish: true,
  },
];

export default questions;
