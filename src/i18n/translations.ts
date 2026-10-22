import type { Language } from "../data/siteConfig";

export type SectionId = "home" | "about" | "services" | "approach" | "partners" | "contact";

/** Sections shown in the primary navigation, in order. */
export const navSections: SectionId[] = ["home", "about", "services", "partners", "contact"];

export interface Pillar {
  title: string;
  text: string;
}

export interface ApproachStep {
  title: string;
  text: string;
}

export interface Translation {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  a11y: {
    skipToContent: string;
    primaryNav: string;
    footerNav: string;
    openMenu: string;
    closeMenu: string;
    languageGroup: string;
    switchLanguageTo: Record<Language, string>;
    themeLabel: (current: string, next: string) => string;
    homeLink: string;
    opensInNewTab: string;
    heroVisual: string;
  };
  nav: Record<SectionId, string>;
  theme: { light: string; dark: string; system: string };
  hero: {
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    pillars: Pillar[];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    featuredLabel: string;
    capabilitiesLabel: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: ApproachStep[];
  };
  projects: {
    eyebrow: string;
    title: string;
    viewProject: string;
  };
  partners: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    emailCta: string;
    linkedinCta: string;
    emailLabel: string;
    linkedinLabel: string;
  };
  footer: {
    rights: string;
    backToTop: string;
  };
}

export const translations: Record<Language, Translation> = {
  vi: {
    meta: {
      title: "Luong Nguyen Van (Grey) | CEO & Founder of DGNA",
      description:
        "Portfolio của Luong Nguyen Van (Grey), CEO & Founder of DGNA — làm việc trong các lĩnh vực Quản trị dữ liệu, Metadata, Phân tích dữ liệu, sản phẩm số và triển khai công nghệ.",
      ogLocale: "vi_VN",
    },
    a11y: {
      skipToContent: "Chuyển đến nội dung chính",
      primaryNav: "Điều hướng chính",
      footerNav: "Điều hướng chân trang",
      openMenu: "Mở menu",
      closeMenu: "Đóng menu",
      languageGroup: "Chọn ngôn ngữ",
      switchLanguageTo: { vi: "Tiếng Việt", en: "English" },
      themeLabel: (current, next) => `Giao diện: ${current}. Chuyển sang ${next}`,
      homeLink: "Về đầu trang",
      opensInNewTab: "(mở trong thẻ mới)",
      heroVisual: "Hình minh họa trừu tượng",
    },
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      services: "Chuyên môn",
      approach: "Phương pháp",
      partners: "Đối tác & Hệ sinh thái",
      contact: "Liên hệ",
    },
    theme: { light: "Sáng", dark: "Tối", system: "Theo hệ thống" },
    hero: {
      primaryCta: "Khám phá chuyên môn",
      secondaryCta: "Liên hệ",
      scrollHint: "Cuộn xuống",
    },
    about: {
      eyebrow: "Giới thiệu",
      title: "Nơi giao thoa giữa kinh doanh, dữ liệu và công nghệ.",
      lead:
        "Tôi là Luong Nguyen Van — Grey — CEO & Founder of DGNA.",
      body:
        "Công việc của tôi tập trung vào điểm giao giữa mục tiêu kinh doanh, dữ liệu và công nghệ: từ định hình chiến lược và quản trị dữ liệu, đến xây dựng sản phẩm số và điều phối để ý tưởng được triển khai thành hiện thực.",
      pillars: [
        {
          title: "Hiểu bài toán kinh doanh",
          text: "Bắt đầu từ mục tiêu, bối cảnh và các bên liên quan trước khi lựa chọn giải pháp.",
        },
        {
          title: "Dữ liệu & Quản trị",
          text: "Dữ liệu được định nghĩa rõ ràng, có người chịu trách nhiệm và đáng tin cậy để sử dụng.",
        },
        {
          title: "Công nghệ & Tư duy sản phẩm",
          text: "Sản phẩm số được thiết kế xoay quanh quy trình vận hành và người dùng thực tế.",
        },
        {
          title: "Điều phối & Triển khai",
          text: "Kết nối kế hoạch, con người và tiến độ để đưa mục tiêu vào thực tế.",
        },
      ],
    },
    services: {
      eyebrow: "Chuyên môn / Dịch vụ",
      title: "Bốn lĩnh vực trọng tâm.",
      intro:
        "Các năng lực có thể kết hợp linh hoạt — từ tư vấn chiến lược đến thiết kế giải pháp và triển khai.",
      featuredLabel: "Trọng tâm",
      capabilitiesLabel: "Phạm vi",
    },
    approach: {
      eyebrow: "Phương pháp làm việc",
      title: "Thực tế, rõ ràng và linh hoạt.",
      intro:
        "Một cách tiếp cận có thể điều chỉnh theo quy mô và bối cảnh của từng bài toán.",
      steps: [
        {
          title: "Hiểu bài toán kinh doanh",
          text: "Làm rõ bối cảnh, vấn đề cốt lõi và giá trị cần đạt được.",
        },
        {
          title: "Xác định mục tiêu & yêu cầu",
          text: "Thống nhất mục tiêu, các bên liên quan và yêu cầu cụ thể.",
        },
        {
          title: "Thiết kế giải pháp",
          text: "Thiết kế hướng tiếp cận về dữ liệu, sản phẩm hoặc triển khai phù hợp.",
        },
        {
          title: "Điều phối triển khai",
          text: "Phối hợp đội ngũ, theo dõi tiến độ và xử lý rủi ro trong quá trình thực hiện.",
        },
        {
          title: "Đánh giá & cải tiến",
          text: "Đánh giá kết quả và cải tiến liên tục dựa trên phản hồi thực tế.",
        },
      ],
    },
    projects: {
      eyebrow: "Dự án",
      title: "Dự án tiêu biểu",
      viewProject: "Xem chi tiết",
    },
    partners: {
      eyebrow: "Hệ sinh thái",
      title: "Đối tác & Hệ sinh thái",
      intro: "Các tổ chức trong mạng lưới chuyên môn và hệ sinh thái làm việc của tôi.",
    },
    contact: {
      eyebrow: "Liên hệ",
      title: "Cùng trao đổi.",
      text:
        "Bạn đang cân nhắc một dự án về dữ liệu, quản trị dữ liệu hay sản phẩm số? Hãy gửi email hoặc kết nối với tôi trên LinkedIn.",
      emailCta: "Thảo luận dự án",
      linkedinCta: "Kết nối trên LinkedIn",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
    },
    footer: {
      rights: "Bảo lưu mọi quyền.",
      backToTop: "Lên đầu trang",
    },
  },
  en: {
    meta: {
      title: "Luong Nguyen Van (Grey) | CEO & Founder of DGNA",
      description:
        "Portfolio of Luong Nguyen Van (Grey), CEO & Founder of DGNA, working across Data Governance, Metadata, Analytics, digital products, and technology delivery.",
      ogLocale: "en_US",
    },
    a11y: {
      skipToContent: "Skip to main content",
      primaryNav: "Primary navigation",
      footerNav: "Footer navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      languageGroup: "Choose language",
      switchLanguageTo: { vi: "Tiếng Việt", en: "English" },
      themeLabel: (current, next) => `Theme: ${current}. Switch to ${next}`,
      homeLink: "Back to top",
      opensInNewTab: "(opens in a new tab)",
      heroVisual: "Abstract illustration",
    },
    nav: {
      home: "Home",
      about: "About",
      services: "Expertise",
      approach: "Approach",
      partners: "Partners & Ecosystem",
      contact: "Contact",
    },
    theme: { light: "Light", dark: "Dark", system: "System" },
    hero: {
      primaryCta: "Explore My Expertise",
      secondaryCta: "Contact Me",
      scrollHint: "Scroll",
    },
    about: {
      eyebrow: "About",
      title: "Where business, data, and technology meet.",
      lead: "I'm Luong Nguyen Van — Grey — CEO & Founder of DGNA.",
      body:
        "My work focuses on the point where business objectives, data, and technology intersect: from shaping data strategy and governance to building digital products and coordinating the delivery that turns ideas into reality.",
      pillars: [
        {
          title: "Business understanding",
          text: "Start from objectives, context, and stakeholders before choosing a solution.",
        },
        {
          title: "Data & governance",
          text: "Data that is clearly defined, owned, and trustworthy enough to act on.",
        },
        {
          title: "Technology & product thinking",
          text: "Digital products designed around real workflows and real users.",
        },
        {
          title: "Coordination & execution",
          text: "Connecting plans, people, and timelines to move objectives into practice.",
        },
      ],
    },
    services: {
      eyebrow: "Expertise / Services",
      title: "Four focus areas.",
      intro:
        "Capabilities that combine flexibly — from strategic advisory to solution design and delivery.",
      featuredLabel: "Core focus",
      capabilitiesLabel: "Scope",
    },
    approach: {
      eyebrow: "Working approach",
      title: "Practical, clear, and adaptable.",
      intro: "An approach that adjusts to the scale and context of each problem.",
      steps: [
        {
          title: "Understand the business problem",
          text: "Clarify the context, the core problem, and the value to be created.",
        },
        {
          title: "Define objectives & requirements",
          text: "Align on objectives, stakeholders, and concrete requirements.",
        },
        {
          title: "Design the approach",
          text: "Design a fitting data, product, or delivery approach.",
        },
        {
          title: "Coordinate implementation",
          text: "Coordinate teams, track progress, and manage risks along the way.",
        },
        {
          title: "Evaluate & improve",
          text: "Evaluate outcomes and improve continuously based on real feedback.",
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      viewProject: "View details",
    },
    partners: {
      eyebrow: "Ecosystem",
      title: "Partners & Ecosystem",
      intro: "Organizations within my professional network and working ecosystem.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s talk.",
      text:
        "Considering a data, governance, or digital product initiative? Send an email or connect with me on LinkedIn.",
      emailCta: "Discuss a Project",
      linkedinCta: "Connect on LinkedIn",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
    },
    footer: {
      rights: "All rights reserved.",
      backToTop: "Back to top",
    },
  },
};
