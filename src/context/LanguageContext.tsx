import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'ja' | 'ko' | 'vi';

const translations: Record<Language, Record<string, string>> = {
  zh: {
    today: '今日',
    convert: '转换',
    settings: '设置',
    title: '长安岁',
    about: '关于长安岁',
    language: '语言设置',
    cancel: '取消',
    confirm: '确定',
    selectDate: '选择日期',
    year: '年',
    month: '月',
    day: '日',
    solarToLunar: '公历转农历',
    lunarToSolar: '农历转公历',
    waiting: '等待转换...',
    aboutContent: '长安岁是由 M015 lab 开发的一款农历/公历转换程序。我们致力于将传统历法的智慧与现代极简设计相结合，为您提供精准、优雅的时间转换体验。无论是查询传统节日，还是规划日常生活，长安岁都能助您在时空交错中找到平衡。',
  },
  ja: {
    today: '今日',
    convert: '変換',
    settings: '設定',
    title: '長安歳',
    about: '長安歳について',
    language: '言語設定',
    cancel: 'キャンセル',
    confirm: '確定',
    selectDate: '日付を選択',
    year: '年',
    month: '月',
    day: '日',
    solarToLunar: '公暦から農暦へ',
    lunarToSolar: '農暦から公暦へ',
    waiting: '変換待ち...',
    aboutContent: '長安歳は、M015 labによって開発された農暦/公暦変換プログラムです。伝統的な暦の知恵と現代的なミニマリズムデザインを融合させ、正確でエレガントな時間変換体験を提供することを目指しています。伝統的な祭りの確認や日常生活の計画において、長安歳は時空の交差点でバランスを見つけるお手伝いをします。',
  },
  ko: {
    today: '오늘',
    convert: '변환',
    settings: '설정',
    title: '장안세',
    about: '장안세 정보',
    language: '언어 설정',
    cancel: '취소',
    confirm: '확인',
    selectDate: '날짜 선택',
    year: '년',
    month: '월',
    day: '일',
    solarToLunar: '양력에서 음력으로',
    lunarToSolar: '음력에서 양력으로',
    waiting: '변환 대기 중...',
    aboutContent: '장안세는 M015 lab에서 개발한 음력/양력 변환 프로그램입니다. 전통 역법의 지혜와 현대적인 미니멀리즘 디자인을 결합하여 정확하고 우아한 시간 변환 경험을 제공하고자 합니다. 전통 명절 확인이나 일상 계획 수립 시, 장안세는 시공간의 교차점에서 균형을 찾도록 도와드립니다.',
  },
  vi: {
    today: 'Hôm nay',
    convert: 'Chuyển đổi',
    settings: 'Cài đặt',
    title: 'Trường An Tuế',
    about: 'Về Trường An Tuế',
    language: 'Cài đặt ngôn ngữ',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    selectDate: 'Chọn ngày',
    year: 'Năm',
    month: 'Tháng',
    day: 'Ngày',
    solarToLunar: 'Dương lịch sang Âm lịch',
    lunarToSolar: 'Âm lịch sang Dương lịch',
    waiting: 'Đang chờ chuyển đổi...',
    aboutContent: 'Trường An Tuế là chương trình chuyển đổi Âm lịch/Dương lịch được phát triển bởi M015 lab. Chúng tôi nỗ lực kết hợp trí tuệ của lịch pháp truyền thống với thiết kế tối giản hiện đại, mang đến cho bạn trải nghiệm chuyển đổi thời gian chính xác và thanh lịch. Dù là tra cứu lễ hội truyền thống hay lập kế hoạch cho cuộc sống hàng ngày, Trường An Tuế sẽ giúp bạn tìm thấy sự cân bằng trong sự giao thoa của thời không.',
  },
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}>({
  language: 'zh',
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');
  const t = (key: string) => translations[language][key] || key;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
