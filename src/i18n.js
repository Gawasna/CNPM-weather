import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend'; // <-- Đảm bảo đã import HttpBackend

i18n
  // load translations via http (hoặc bất kỳ giao thức nào HttpBackend hỗ trợ)
  // xem thêm: https://github.com/i18next/i18next-http-backend
  .use(HttpBackend) // <-- Đảm bảo đã sử dụng plugin này
  // detect user language
  // xem thêm: https://github.com/i18next/i18next-browser-languagedetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true, // Giữ là true trong khi debug để thấy i18next đang làm gì
    fallbackLng: 'en', // ngôn ngữ dự phòng là tiếng Anh
    detection: {
      // Thứ tự phát hiện ngôn ngữ. Bỏ bớt 'path', 'subdomain' nếu không dùng.
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'], // cache ngôn ngữ người dùng trên localStorage và cookie
    },
    // load: 'currentOnly', // Bạn có thể bỏ dòng này, HttpBackend sẽ tự quản lý việc chỉ load ngôn ngữ cần thiết
    interpolation: {
      escapeValue: false // react đã an toàn khỏi xss
    },
    // Cấu hình để HttpBackend load file dịch từ public/locales
    backend: {
       loadPath: '/locales/{{lng}}/translation.json', // Đường dẫn tương đối từ thư mục public
       // proxy: false // Thêm dòng này nếu gặp vấn đề với proxy
    },
    // react-i18next options
    react: {
      useSuspense: false // Đặt false nếu không dùng React.Suspense để tránh lỗi
    }
  });

export default i18n;