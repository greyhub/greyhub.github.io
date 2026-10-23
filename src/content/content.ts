// Central content + configuration, following docs/kich-ban.md (bản chốt 3).
// Every user-facing string lives here in both languages. English is the default.
// Rule for editors: only add facts that are verified. Optional sections (Work, Writing)
// render only when their lists are non-empty; journey roles render only when filled in.

export type Lang = 'en' | 'vi'
export type L = Record<Lang, string>

export const profile = {
  name: { en: 'Luong Nguyen Van', vi: 'Nguyễn Văn Lương' } as L,
  nickname: 'Grey',
  initials: 'NVL',
  role: { en: 'CEO & Founder, DGNA', vi: 'CEO & Nhà sáng lập DGNA' } as L,
  email: 'luongnv.grey@gmail.com',
  linkedin: 'https://www.linkedin.com/in/greyng/',
  linkedinLabel: 'linkedin.com/in/greyng',
  github: 'https://github.com/greyhub',
  githubLabel: 'github.com/greyhub',
  // [CẦN XÁC NHẬN] city; leave empty to hide the row
  basedIn: { en: '', vi: '' } as L,
  // [CẦN XÁC NHẬN] DGNA website; leave empty to hide the link
  dgnaUrl: '',
}

// Work and Writing appear in the nav only when they have content.
export const nav: { id: string; label: L; when?: () => boolean }[] = [
  { id: 'about', label: { en: 'About', vi: 'Giới thiệu' } },
  { id: 'approach', label: { en: 'Approach', vi: 'Cách tiếp cận' } },
  { id: 'services', label: { en: 'Services', vi: 'Dịch vụ' } },
  { id: 'journey', label: { en: 'Journey', vi: 'Hành trình' } },
  { id: 'work', label: { en: 'Work', vi: 'Dấu ấn' }, when: () => work.items.length > 0 },
  { id: 'writing', label: { en: 'Writing', vi: 'Chia sẻ' }, when: () => writing.items.length > 0 },
  { id: 'contact', label: { en: 'Connect', vi: 'Kết nối' } },
]

export const hero = {
  headline: {
    en: 'Building the Future of Enterprise Data & AI.',
    vi: 'Kiến tạo tương lai dữ liệu và AI cho doanh nghiệp.',
  } as L,
  // The phrase rendered in gold inside the headline.
  highlight: { en: 'Enterprise Data & AI.', vi: 'dữ liệu và AI' } as L,
  supporting: {
    en: 'I build products, shape data capabilities, and connect technology with real business outcomes.',
    vi: 'Tôi phát triển sản phẩm, xây dựng năng lực dữ liệu và kết nối công nghệ với những giá trị kinh doanh thực tiễn.',
  } as L,
  roles: [
    { en: 'CEO & Founder, DGNA', vi: 'CEO & Nhà sáng lập DGNA' },
    { en: 'Data Consultant', vi: 'Tư vấn dữ liệu' },
    { en: 'Trainer', vi: 'Đào tạo' },
  ] as L[],
  primary: { en: "Let's connect", vi: 'Kết nối với tôi' } as L,
  secondary: { en: 'Services', vi: 'Dịch vụ' } as L,
  scroll: { en: 'Scroll', vi: 'Cuộn xuống' } as L,
  loading: { en: 'Rendering the city', vi: 'Đang dựng thành phố' } as L,
  fallback: {
    en: '3D view unavailable on this device. Showing the static skyline.',
    vi: 'Thiết bị không hỗ trợ chế độ 3D. Đang hiển thị ảnh tĩnh.',
  } as L,
}

export type PanelIcon = 'shield' | 'tags' | 'cpu' | 'lightbulb' | 'hexagon'
export const panels: { id: string; num?: string; icon: PanelIcon; title: L; text: L; target: string }[] = [
  {
    id: 'governance', num: '01', icon: 'shield', target: 'step-1',
    title: { en: 'Data Governance', vi: 'Quản trị dữ liệu' },
    text: { en: 'Trusted data. Clear accountability.', vi: 'Dữ liệu tin cậy. Trách nhiệm rõ ràng.' },
  },
  {
    id: 'metadata', num: '02', icon: 'tags', target: 'step-2',
    title: { en: 'Metadata', vi: 'Metadata' },
    text: { en: 'Making enterprise data understandable.', vi: 'Giúp dữ liệu doanh nghiệp trở nên dễ hiểu.' },
  },
  {
    id: 'ai', num: '03', icon: 'cpu', target: 'step-3',
    title: { en: 'Data & AI', vi: 'Dữ liệu & AI' },
    text: { en: 'Turning data into business capabilities.', vi: 'Biến dữ liệu thành năng lực kinh doanh.' },
  },
  {
    id: 'product', num: '04', icon: 'lightbulb', target: 'step-4',
    title: { en: 'Product Innovation', vi: 'Đổi mới sản phẩm' },
    text: { en: 'Building around real problems.', vi: 'Xây dựng từ những vấn đề thực tế.' },
  },
  {
    id: 'dgna', icon: 'hexagon', target: 'dgna',
    title: { en: 'DGNA', vi: 'DGNA' },
    text: { en: 'Where I work today: enterprise data & AI.', vi: 'Nơi tôi đang làm việc: dữ liệu & AI cho doanh nghiệp.' },
  },
]

export const about = {
  eyebrow: { en: 'About', vi: 'Giới thiệu' } as L,
  title: { en: "Hi, I'm Grey.", vi: 'Xin chào, tôi là Grey.' } as L,
  body: [
    {
      en: 'I work where technology, product and business meet, with a focus on data and AI.',
      vi: 'Tôi làm việc ở nơi công nghệ, sản phẩm và kinh doanh gặp nhau, với trọng tâm là dữ liệu và AI.',
    },
    {
      en: 'What I care about is whether people make better decisions with data, not the tools for their own sake.',
      vi: 'Điều tôi quan tâm là người dùng dữ liệu có ra quyết định tốt hơn hay không, chứ không phải công cụ tự thân.',
    },
    {
      en: 'Today I lead DGNA as CEO and founder. I also work directly with individuals and businesses on data consulting, data training and creative landing pages.',
      vi: 'Hiện tôi là CEO và nhà sáng lập DGNA. Tôi cũng trực tiếp làm việc với cá nhân và doanh nghiệp qua tư vấn dữ liệu, đào tạo dữ liệu và thiết kế landing page sáng tạo.',
    },
  ] as L[],
  facts: {
    role: { en: 'Role', vi: 'Vai trò' } as L,
    focus: { en: 'Focus', vi: 'Lĩnh vực' } as L,
    focusValue: { en: 'Data & AI', vi: 'Dữ liệu & AI' } as L,
    based: { en: 'Based in', vi: 'Nơi làm việc' } as L,
  },
}

export const pov = {
  eyebrow: { en: 'Point of view', vi: 'Quan điểm' } as L,
  title: { en: 'What I see in organizations', vi: 'Điều tôi thấy ở các tổ chức' } as L,
  observations: [
    { en: 'The same metric, a different number in every department.', vi: 'Cùng một chỉ số, mỗi phòng ban báo một con số.' },
    { en: 'The data exists, but nobody knows where it lives or what it means.', vi: 'Dữ liệu có đó, nhưng không ai biết nó nằm ở đâu, nghĩa là gì.' },
    { en: 'AI pilots look promising, then stall before reaching operations.', vi: 'Dự án AI chạy thử thì ổn, đưa vào vận hành thì dừng lại.' },
  ] as L[],
  beliefLabel: { en: 'What I believe', vi: 'Điều tôi tin' } as L,
  belief: {
    en: "AI is only as good as an organization's trust in its own data. So I start with trust, and only then with AI.",
    vi: 'AI chỉ tốt bằng mức độ tổ chức tin vào dữ liệu của mình. Vì vậy tôi luôn bắt đầu từ niềm tin, rồi mới đến AI.',
  } as L,
}

export type StepIcon = 'shield' | 'tags' | 'cpu' | 'lightbulb'
export const approach = {
  eyebrow: { en: 'Approach', vi: 'Cách tiếp cận' } as L,
  title: { en: 'Four steps from data to value', vi: 'Bốn bậc từ dữ liệu đến giá trị' } as L,
  intro: {
    en: "I see an organization's data journey as four steps. Each one is the foundation for the next. Skip one and the rest won't hold.",
    vi: 'Tôi nhìn hành trình dữ liệu của một tổ chức như bốn bậc thang. Mỗi bậc là nền móng cho bậc tiếp theo. Bỏ qua một bậc, những bậc sau sẽ không đứng vững.',
  } as L,
  labels: {
    problem: { en: 'Problem', vi: 'Vấn đề' } as L,
    change: { en: 'What changes', vi: 'Điều thay đổi' } as L,
    shows: { en: 'Shows up as', vi: 'Thể hiện bằng' } as L,
  },
  steps: [
    {
      icon: 'shield',
      name: { en: 'Data Governance', vi: 'Quản trị dữ liệu' },
      goal: { en: 'Data you can trust', vi: 'Tin được dữ liệu' },
      problem: { en: 'No one clearly owns the data, and no one measures its quality.', vi: 'Không rõ ai chịu trách nhiệm cho dữ liệu. Chất lượng không ai đo.' },
      change: { en: 'Every data domain has an owner, and business and IT agree on the quality rules.', vi: 'Mỗi miền dữ liệu có người chịu trách nhiệm. Quy tắc chất lượng được nghiệp vụ và CNTT cùng thống nhất.' },
      shows: [
        { en: 'Governance framework', vi: 'Khung quản trị' },
        { en: 'Owner and steward roles', vi: 'Vai trò data owner và data steward' },
        { en: 'Quality rules', vi: 'Quy tắc chất lượng' },
      ],
    },
    {
      icon: 'tags',
      name: { en: 'Metadata', vi: 'Metadata' },
      goal: { en: 'Data you can understand', vi: 'Hiểu được dữ liệu' },
      problem: { en: 'Finding a dataset takes days, and the same term means different things to different teams.', vi: 'Tìm một bộ dữ liệu mất nhiều ngày. Cùng một thuật ngữ, mỗi nơi hiểu một kiểu.' },
      change: { en: 'The organization shares one vocabulary and one map of its data.', vi: 'Cả tổ chức có chung một ngôn ngữ và một bản đồ dữ liệu.' },
      shows: [
        { en: 'Business glossary', vi: 'Từ điển nghiệp vụ' },
        { en: 'Data catalog', vi: 'Data catalog' },
        { en: 'Lineage', vi: 'Lineage' },
      ],
    },
    {
      icon: 'cpu',
      name: { en: 'Data & AI', vi: 'Dữ liệu & AI' },
      goal: { en: 'Data you can use', vi: 'Dùng được dữ liệu' },
      problem: { en: 'AI use cases are chosen by trend, not by the data that exists.', vi: 'Bài toán AI được chọn theo xu hướng, không theo dữ liệu đang có.' },
      change: { en: 'Pick use cases the data can support and the business case justifies, then take them into real operation.', vi: 'Chỉ chọn bài toán mà dữ liệu đáp ứng được và lợi ích kinh doanh rõ ràng, rồi đưa vào vận hành thật.' },
      shows: [
        { en: 'Prioritized use cases', vi: 'Danh sách bài toán ưu tiên' },
        { en: 'Models in operation', vi: 'Mô hình đưa vào vận hành' },
        { en: 'A way to measure impact', vi: 'Cách đo hiệu quả' },
      ],
    },
    {
      icon: 'lightbulb',
      name: { en: 'Product Innovation', vi: 'Đổi mới sản phẩm' },
      goal: { en: 'Data that creates value', vi: 'Tạo ra giá trị' },
      problem: { en: 'Recurring problems are solved by hand, differently each time.', vi: 'Những vướng mắc lặp lại được xử lý thủ công, mỗi lần một kiểu.' },
      change: { en: 'Recurring problems become shared products.', vi: 'Vướng mắc lặp lại trở thành sản phẩm dùng chung.' },
      shows: [{ en: 'Data products and tools teams use every day', vi: 'Sản phẩm và công cụ dữ liệu mà các nhóm dùng hằng ngày' }],
    },
  ] as { icon: StepIcon; name: L; goal: L; problem: L; change: L; shows: L[] }[],
  threadsLabel: { en: 'Across all four steps', vi: 'Xuyên suốt bốn bậc' } as L,
  threads: [
    {
      name: { en: 'Enterprise data strategy', vi: 'Chiến lược dữ liệu doanh nghiệp' },
      text: { en: 'Tie every step to business priorities, with a roadmap leadership can own.', vi: 'Gắn mỗi bước với ưu tiên kinh doanh, bằng một lộ trình mà ban lãnh đạo làm chủ được.' },
    },
    {
      name: { en: 'Leadership', vi: 'Lãnh đạo' },
      text: { en: 'People at every step know what they are accountable for.', vi: 'Người ở mỗi bậc biết mình chịu trách nhiệm gì.' },
    },
  ] as { name: L; text: L }[],
  bridge: { en: 'Here is how you can work with me.', vi: 'Đây là những cách bạn có thể làm việc cùng tôi.' } as L,
}

export type ServiceId = 'consulting' | 'training' | 'landing'
export const services = {
  eyebrow: { en: 'Services', vi: 'Dịch vụ' } as L,
  title: { en: 'Work with me', vi: 'Làm việc cùng tôi' } as L,
  intro: {
    en: 'For individuals and businesses. Every engagement starts with a conversation about what you actually need.',
    vi: 'Dành cho cá nhân và doanh nghiệp. Mọi hợp tác đều bắt đầu bằng một cuộc trao đổi về điều bạn thực sự cần.',
  } as L,
  audience: {
    businesses: { en: 'Businesses', vi: 'Doanh nghiệp' } as L,
    individuals: { en: 'Individuals', vi: 'Cá nhân' } as L,
    teams: { en: 'Teams', vi: 'Đội ngũ' } as L,
  },
  consulting: {
    name: { en: 'Data Consulting', vi: 'Tư vấn dữ liệu' } as L,
    text: {
      en: 'I help you see where your data stands today and what to do next, from governance and metadata to choosing AI use cases your data can actually support.',
      vi: 'Tôi giúp bạn nhìn rõ dữ liệu của mình đang ở đâu và nên làm gì tiếp theo, từ quản trị dữ liệu, metadata đến chọn bài toán AI mà dữ liệu thực sự đáp ứng được.',
    } as L,
    lines: [
      {
        label: { en: 'For businesses', vi: 'Với doanh nghiệp' },
        text: { en: 'Assessing your current data state and building a roadmap along the four steps.', vi: 'Đánh giá hiện trạng dữ liệu và xây dựng lộ trình theo bốn bậc.' },
      },
      {
        label: { en: 'For individuals', vi: 'Với cá nhân' },
        text: { en: 'Advice on your own data questions, projects and career direction in data.', vi: 'Tư vấn cho câu hỏi, dự án dữ liệu của riêng bạn và định hướng nghề nghiệp trong lĩnh vực dữ liệu.' },
      },
    ] as { label: L; text: L }[],
    cta: { en: 'Discuss consulting', vi: 'Trao đổi về tư vấn' } as L,
  },
  training: {
    name: { en: 'Data Training', vi: 'Đào tạo dữ liệu' } as L,
    text: {
      en: 'Practical courses for people who want to work with data and for teams that need a shared foundation.',
      vi: 'Các khóa học thực tế cho người muốn làm việc với dữ liệu và cho đội ngũ cần một nền tảng chung.',
    } as L,
    topics: [
      {
        name: { en: 'Data Analytics', vi: 'Phân tích dữ liệu' },
        text: { en: 'Turning raw data into answers you can act on.', vi: 'Biến dữ liệu thô thành câu trả lời dùng được để ra quyết định.' },
      },
      {
        name: { en: 'Data Governance', vi: 'Quản trị dữ liệu' },
        text: { en: 'Ownership, quality and rules that make data trustworthy.', vi: 'Quyền sở hữu, chất lượng và quy tắc giúp dữ liệu đáng tin cậy.' },
      },
    ] as { name: L; text: L }[],
    formats: [
      { en: 'Courses', vi: 'Khóa học' },
      { en: 'Online', vi: 'Online' },
      { en: 'Offline', vi: 'Offline' },
    ] as L[],
    cta: { en: 'Ask about training', vi: 'Hỏi về đào tạo' } as L,
  },
  landing: {
    name: { en: 'Creative Landing Pages', vi: 'Landing page sáng tạo' } as L,
    text: {
      en: 'Landing pages that tell a clear story, for a person, a product or an event, with considered design and, where it helps, interactive 3D.',
      vi: 'Landing page kể một câu chuyện rõ ràng, cho cá nhân, sản phẩm hoặc sự kiện, với thiết kế chỉn chu và hiệu ứng 3D tương tác khi cần.',
    } as L,
    example: { en: "You're looking at one. This page is an example of the work.", vi: 'Trang bạn đang xem chính là một ví dụ.' } as L,
    exampleCta: { en: 'See the 3D scene again', vi: 'Xem lại cảnh 3D' } as L,
    cta: { en: 'Start a landing page', vi: 'Bắt đầu một landing page' } as L,
  },
}

export const principles = {
  eyebrow: { en: 'How I work', vi: 'Cách tôi làm việc' } as L,
  title: { en: 'Four principles I keep', vi: 'Bốn nguyên tắc tôi giữ' } as L,
  items: [
    {
      title: { en: 'Start with the real problem.', vi: 'Bắt đầu từ vấn đề thực.' },
      text: {
        en: 'Technology earns its place by solving something people already feel. Problem first, tool second.',
        vi: 'Công nghệ chỉ có giá trị khi giải quyết điều mà người dùng thực sự gặp phải. Vấn đề trước, công cụ sau.',
      },
    },
    {
      title: { en: 'Build for long-term value.', vi: 'Xây dựng cho giá trị dài hạn.' },
      text: {
        en: 'Data foundations compound. I prefer decisions that still look right in five years over ones that look good this quarter.',
        vi: 'Nền tảng dữ liệu có giá trị tích lũy. Tôi ưu tiên quyết định vẫn đúng sau năm năm hơn quyết định chỉ đẹp trong một quý.',
      },
    },
    {
      title: { en: 'Make accountability clear.', vi: 'Làm rõ trách nhiệm.' },
      text: {
        en: 'Every dataset, decision and deliverable needs an owner. Clear ownership is what makes trust possible.',
        vi: 'Mỗi tập dữ liệu, quyết định và sản phẩm bàn giao đều cần có người chịu trách nhiệm. Trách nhiệm rõ ràng là điều kiện để có niềm tin.',
      },
    },
    {
      title: { en: 'Execute, then refine.', vi: 'Hành động, rồi hoàn thiện.' },
      text: {
        en: 'A plan matters only when it ships. Deliver in small, visible steps and improve from what you learn.',
        vi: 'Kế hoạch chỉ có ý nghĩa khi được triển khai. Bàn giao từng bước nhỏ, rõ ràng và cải tiến từ những gì học được.',
      },
    },
  ] as { title: L; text: L }[],
}

// Journey: start years only. `role` / `note` stay empty until confirmed — the UI then
// shows just year + organisation and never invents a title.
export type Milestone = { year: string; org: string; role: L; note: L; current?: boolean }
const empty: L = { en: '', vi: '' }
export const journey = {
  eyebrow: { en: 'Journey', vi: 'Hành trình' } as L,
  title: { en: 'How I got here', vi: 'Con đường đến với dữ liệu' } as L,
  // [CẦN XÁC NHẬN] 3–5 sentences in Grey's words; empty hides the paragraph
  story: empty,
  milestones: [
    { year: '2019', org: 'MindX', role: empty, note: empty },
    { year: '2020', org: 'Vingroup', role: empty, note: empty },
    { year: '2022', org: 'Trek Fund', role: empty, note: empty },
    { year: '2023', org: 'VNPT', role: empty, note: empty },
    { year: '2026', org: 'DGNA', role: { en: 'CEO & Founder', vi: 'CEO & Nhà sáng lập' }, note: empty, current: true },
  ] as Milestone[],
  chapterLabel: { en: 'Current chapter', vi: 'Chương hiện tại' } as L,
  chapter: {
    en: 'I founded DGNA to bring this four-step approach into enterprises: make data governed, understandable and useful, then turn it into capabilities teams can use, including AI.',
    vi: 'Tôi thành lập DGNA để đưa cách tiếp cận bốn bậc vào doanh nghiệp: giúp dữ liệu được quản trị, dễ hiểu và hữu ích, rồi biến nó thành năng lực mà các đội ngũ dùng được, kể cả AI.',
  } as L,
  visit: { en: 'Visit DGNA', vi: 'Xem DGNA' } as L,
}

// Optional proof sections. Add only confirmed, publishable items.
export type WorkItem = { title: L; context: L; service: ServiceId; role: L; result: L; link?: string }
export const work = {
  eyebrow: { en: 'Work', vi: 'Dấu ấn' } as L,
  title: { en: 'Selected work', vi: 'Việc đã làm' } as L,
  items: [] as WorkItem[],
}

export type WritingItem = { kind: L; title: L; where: string; date: string; link: string }
export const writing = {
  eyebrow: { en: 'Writing & talks', vi: 'Chia sẻ' } as L,
  title: { en: 'Where I share my thinking', vi: 'Nơi tôi chia sẻ góc nhìn' } as L,
  items: [] as WritingItem[],
}

export type IntentId = ServiceId | 'speaking' | 'other'
export const contact = {
  eyebrow: { en: 'Connect', vi: 'Kết nối' } as L,
  title: { en: "Let's talk", vi: 'Hãy cùng trò chuyện' } as L,
  text: {
    en: "Tell me what you're looking for, and I'll reply by email.",
    vi: 'Hãy cho tôi biết bạn đang cần gì, tôi sẽ phản hồi qua email.',
  } as L,
  intentLabel: { en: "I'm interested in", vi: 'Tôi quan tâm đến' } as L,
  intents: [
    { id: 'consulting', label: { en: 'Data consulting', vi: 'Tư vấn dữ liệu' } },
    { id: 'training', label: { en: 'Data training', vi: 'Đào tạo dữ liệu' } },
    { id: 'landing', label: { en: 'Landing page', vi: 'Landing page' } },
    { id: 'speaking', label: { en: 'Speaking & media', vi: 'Mời chia sẻ, báo chí' } },
    { id: 'other', label: { en: 'Something else', vi: 'Khác' } },
  ] as { id: IntentId; label: L }[],
  trainingTopicLabel: { en: 'Topic', vi: 'Chủ đề' } as L,
  trainingFormatLabel: { en: 'Format', vi: 'Hình thức' } as L,
  yourName: { en: 'your name', vi: 'tên bạn' } as L,
  bodyIntro: { en: 'Hi Grey,', vi: 'Chào Grey,' } as L,
  email: { en: 'Email', vi: 'Email' } as L,
  copy: { en: 'Copy', vi: 'Sao chép' } as L,
  copied: { en: 'Copied', vi: 'Đã sao chép' } as L,
  write: { en: 'Write an email', vi: 'Gửi email' } as L,
}

export const footer = {
  services: { en: 'Data Consulting · Data Training · Creative Landing Pages', vi: 'Tư vấn dữ liệu · Đào tạo dữ liệu · Landing page sáng tạo' } as L,
  rights: { en: 'All rights reserved.', vi: 'Bảo lưu mọi quyền.' } as L,
  top: { en: 'Back to top', vi: 'Lên đầu trang' } as L,
}

export const ui = {
  menu: { en: 'Menu', vi: 'Menu' } as L,
  close: { en: 'Close', vi: 'Đóng' } as L,
  langLabel: { en: 'Switch language', vi: 'Đổi ngôn ngữ' } as L,
  skip: { en: 'Skip to content', vi: 'Bỏ qua đến nội dung' } as L,
}
