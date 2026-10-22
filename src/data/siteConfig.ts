/**
 * Single source of truth for personal details and editable site content.
 *
 * - Personal / contact / deployment values are used exactly as supplied.
 * - Longer bilingual content (hero, services, partners) lives here as `Localized` values
 *   so it can be edited in one place. UI chrome (navigation, buttons, section titles,
 *   accessibility labels) lives in `src/i18n/translations.ts`.
 * - Only add verified information. Optional collections such as `biography` and
 *   `caseStudies` render nothing while empty.
 */

export const languages = ["vi", "en"] as const;
export type Language = (typeof languages)[number];

export const themePreferences = ["light", "dark", "system"] as const;
export type ThemePreference = (typeof themePreferences)[number];

/** A value provided in every supported language. */
export type Localized<T = string> = Record<Language, T>;

export type ServiceIcon = "web" | "delivery" | "analytics" | "governance";

export interface Service {
  id: string;
  icon: ServiceIcon;
  /** Featured services get extra visual prominence in the services grid. */
  featured?: boolean;
  title: Localized;
  description: Localized;
  capabilities: Localized<string[]>;
}

export interface Partner {
  name: string;
}

/** Shape for verified case studies added in the future. */
export interface CaseStudy {
  id: string;
  title: Localized;
  summary: Localized;
  tags?: string[];
  url?: string;
}

export interface SiteConfig {
  person: {
    displayName: string;
    shortName: string;
    monogram: string;
    title: string;
    organization: string;
  };
  contact: {
    email: string;
    linkedin: string;
  };
  github: {
    username: string;
    repository: string;
  };
  site: {
    productionUrl: string;
    defaultLanguage: Language;
    supportedLanguages: readonly Language[];
    defaultTheme: ThemePreference;
    themeOptions: readonly ThemePreference[];
    storageKeys: { language: string; theme: string };
  };
  deployment: {
    type: "user-site" | "project-site";
    basePath: string;
  };
  hero: {
    kicker: Localized;
    headline: Localized;
    /** Portion of the headline to emphasise visually; must appear verbatim in `headline`. */
    headlineEmphasis: Localized;
    description: Localized;
  };
  /** Verified biography paragraphs. Leave empty until real material is provided. */
  biography: Localized<string[]>;
  services: Service[];
  partners: Partner[];
  /** Verified case studies. The Projects section is hidden while this is empty. */
  caseStudies: CaseStudy[];
  contactCta: {
    emailSubject: Localized;
  };
}

export const siteConfig: SiteConfig = {
  person: {
    displayName: "Luong Nguyen Van (Grey)",
    shortName: "Grey",
    monogram: "NVL",
    title: "CEO & Founder of DGNA",
    organization: "DGNA",
  },
  contact: {
    email: "luongnv@dgna.vn",
    linkedin: "https://www.linkedin.com/greyng",
  },
  github: {
    username: "greyhub",
    repository: "greyhub.github.io",
  },
  site: {
    productionUrl: "https://greyhub.github.io/",
    defaultLanguage: "vi",
    supportedLanguages: languages,
    defaultTheme: "system",
    themeOptions: themePreferences,
    storageKeys: { language: "nvl.language", theme: "nvl.theme" },
  },
  deployment: {
    type: "user-site",
    basePath: "/",
  },
  hero: {
    kicker: {
      vi: "Kinh doanh × Dữ liệu × Công nghệ × Triển khai",
      en: "Business × Data × Technology × Execution",
    },
    headline: {
      vi: "Kết nối Kinh doanh, Dữ liệu & Công nghệ.",
      en: "Connecting Business, Data & Technology.",
    },
    headlineEmphasis: {
      vi: "Dữ liệu & Công nghệ.",
      en: "Data & Technology.",
    },
    description: {
      vi: "Từ chiến lược và quản trị dữ liệu đến phân tích, sản phẩm số và triển khai thực tế.",
      en: "From data strategy and governance to analytics, digital products, and delivery.",
    },
  },
  biography: {
    vi: [],
    en: [],
  },
  services: [
    {
      id: "data-governance",
      icon: "governance",
      featured: true,
      title: {
        vi: "Quản trị dữ liệu & Metadata",
        en: "Data Governance & Metadata",
      },
      description: {
        vi: "Tư vấn, thiết kế và triển khai các năng lực quản trị dữ liệu, metadata và quản lý dữ liệu doanh nghiệp.",
        en: "Consulting, design, and implementation of enterprise Data Governance and Metadata capabilities.",
      },
      capabilities: {
        vi: [
          "Khung quản trị dữ liệu và mô hình vận hành",
          "Quyền sở hữu và quản lý dữ liệu (ownership & stewardship)",
          "Từ điển thuật ngữ nghiệp vụ và quản lý metadata",
          "Khái niệm danh mục dữ liệu (data catalog) và dòng dữ liệu (lineage)",
          "Quản trị chất lượng dữ liệu",
          "Chính sách, tiêu chuẩn và quy trình quản trị",
          "Quy trình vận hành quản trị dữ liệu",
          "Đào tạo và phát triển năng lực quản trị dữ liệu",
        ],
        en: [
          "Data Governance frameworks and operating models",
          "Data ownership and stewardship",
          "Business glossary and metadata management",
          "Data catalog and lineage concepts",
          "Data quality governance",
          "Governance policies, standards, and workflows",
          "Governance operating processes",
          "Data Governance training and capability development",
        ],
      },
    },
    {
      id: "data-analytics",
      icon: "analytics",
      title: {
        vi: "Phân tích dữ liệu",
        en: "Data Analytics",
      },
      description: {
        vi: "Chuyển đổi dữ liệu thành thông tin hữu ích hỗ trợ phân tích, vận hành và ra quyết định.",
        en: "Turning data into actionable insights for analysis, operations, and decision-making.",
      },
      capabilities: {
        vi: [
          "Phân tích nghiệp vụ và dữ liệu",
          "Thiết kế báo cáo và dashboard",
          "Định nghĩa KPI và chỉ số",
          "Yêu cầu phân tích",
          "Đánh giá chất lượng dữ liệu",
          "Giải pháp hỗ trợ ra quyết định",
        ],
        en: [
          "Business and data analysis",
          "Reporting and dashboard design",
          "KPI and metric definition",
          "Analytical requirements",
          "Data quality assessment",
          "Decision-support solutions",
        ],
      },
    },
    {
      id: "web-applications",
      icon: "web",
      title: {
        vi: "Phát triển ứng dụng web",
        en: "Web Application Development",
      },
      description: {
        vi: "Phát triển ứng dụng web hiện đại, tùy biến theo nhu cầu và quy trình vận hành của doanh nghiệp.",
        en: "Modern web application development tailored to business needs and operational workflows.",
      },
      capabilities: {
        vi: [
          "Ứng dụng web tùy biến",
          "Công cụ nội bộ cho doanh nghiệp",
          "Số hóa quy trình làm việc",
          "Dashboard và giao diện tương tác",
          "Prototype và MVP sản phẩm",
          "Trải nghiệm ứng dụng hướng tích hợp",
        ],
        en: [
          "Custom web applications",
          "Internal business tools",
          "Workflow digitization",
          "Interactive dashboards and interfaces",
          "Product prototypes and MVPs",
          "Integration-oriented application experiences",
        ],
      },
    },
    {
      id: "project-delivery",
      icon: "delivery",
      title: {
        vi: "Quản lý dự án & Triển khai",
        en: "Project Management & Delivery",
      },
      description: {
        vi: "Quản lý dự án, điều phối đội ngũ và kết nối mục tiêu kinh doanh với triển khai thực tế.",
        en: "Project management and delivery coordination that connect business objectives with execution.",
      },
      capabilities: {
        vi: [
          "Lập kế hoạch và điều phối dự án",
          "Quản lý các bên liên quan",
          "Quản lý phạm vi, tiến độ và phụ thuộc",
          "Phối hợp liên chức năng",
          "Theo dõi và báo cáo tiến độ triển khai",
          "Quản lý rủi ro và vấn đề",
        ],
        en: [
          "Project planning and coordination",
          "Stakeholder management",
          "Scope, timeline, and dependency management",
          "Cross-functional collaboration",
          "Delivery tracking and reporting",
          "Risk and issue management",
        ],
      },
    },
  ],
  partners: [
    { name: "VNPT" },
    { name: "VTX" },
    { name: "Trek Fund" },
    { name: "Vingioco" },
    { name: "Alobase" },
  ],
  caseStudies: [],
  contactCta: {
    emailSubject: {
      vi: "Trao đổi hợp tác",
      en: "Collaboration enquiry",
    },
  },
};

export const mailtoHref = (subject?: string): string =>
  `mailto:${siteConfig.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
