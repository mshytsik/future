import image from '../assets/img/images/article-1.jpg';

const articleBlocks = [
  {
    type: 'text',
    value:
      'As a designer, there’s a unique thrill in opening Figma and getting ready to turn your creative vision into reality. However, the design execution can sometimes be really time-consuming and daunting, particularly when faced with tight deadlines and high expectations. To expedite the process, you need a combination of effective time management, expectation control, and a versatile set of standardized yet customizable design components.',
  },
  {
    type: 'text',
    value:
      'After revamping our Figma component library with auto-layout and component properties last year, my team and I boosted the total insertion of Figma components across our department by over 200% in the second half of 2022. There’s a 48% increase in users saying in the survey that this component library makes their work “much faster”. I’d like to share some insights on building components that may prove beneficial to fellow Figma enthusiasts and your teams.',
  },
  {
    type: 'text',
    value:
      'This article will mainly focus on my thinking process rather than technical details. If you’d like to learn more, please feel free to contact me via mingzhic.design@gmail.com.',
  },
  {
    type: 'heading',
    size: 'h2',
    value: 'Familiarize yourself with your tools',
  },
  {
    type: 'text',
    value:
      'Developing the ideal design system and component library (yep, they are two distinct concepts) can feel like a never-ending task, but embracing the challenge is part of the fun. To me, it’s always important to stay informed about the latest feature update of the tools you are using and keep learning from other designers’ innovative practices in the community.',
  },
  {
    type: 'quote',
    value:
      'Maximizing a tool’s potential requires understanding its inner workings. As tools constantly evolve to improve user experience, maintaining a growth mindset and frequently updating your skills and work will prevent an overwhelming backlog of tasks.',
  },
  {
    type: 'text',
    value:
      'For instance, if you are using Figma, it’s important to understand the difference between the 3 common grouping structures: group, frame, and auto-layout, their interchangeability, and when to use each of them. This is particularly useful when building something responsive. Combining these grouping types can also be necessary to achieve the desired effect.',
  },
  { type: 'heading', size: 'h2', value: 'Resources' },
  {
    type: 'text',
    value:
      'Here’s a selection of articles that offer detailed insights and clear examples to help you grasp various concepts and proficiently use the tool.',
  },
  {
    type: 'list',
    ordered: true,
    items: [
      'Figma: Setting up responsive design with auto layout, constraints & grids — Christine Vallaure',
      'Understand Constrain and Auto-layout in Figma. — Hai Thang',
      'Absolute positioning in Figma — Anna Rzepka',
      'Groups vs. Frames in Figma — Joey Banks',
    ],
  },
  { type: 'heading', size: 'h3', value: 'Consider your target users' },
  {
    type: 'text',
    value:
      'When designing components, we are playing the roles of both designer and user, which offers an excellent opportunity for us to practice the iterative design process. From a user’s perspective, components should be robust and adaptable to various use cases.',
  },
  {
    type: 'link',
    href: 'https://medium.com/muzli-design-inspiration/mobile-menu-inspiration-efce45316646',
    title: 'Mobile menu inspiration',
    subtitle: 'via Muzli design inspiration',
    favicon:
      'https://miro.medium.com/v2/resize:fill:256:256/1*s4WR99AygKl-pz-aaQ31gw.png',
    image:
      'https://miro.medium.com/v2/resize:fit:1200/1*k1ZYFcVPVI9yAZ5wSHjJ2Q.png',
  },
  {
    type: 'text',
    value:
      'That means striking a balance between generalization and customization is critical. If it’s too generic, designers may need extra time for adjustments; if it’s too advanced, they’ll have to scale back and remove features.',
  },
  {
    type: 'text',
    value:
      'Including as many common patterns as possible while making advanced settings accessible and toggleable is recommended. Also, don’t forget to ask your design colleagues for feedback and continuously iterate.',
  },
  {
    type: 'video',
    value: 'https://www.youtube.com/embed/VrhfVoUtLYo',
  },
  { type: 'heading', size: 'h2', value: 'The “detach” moment' },
  {
    type: 'text',
    value:
      'While using the Figma component, there’s a critical and inevitable moment called “detach”. It’s essential to consider specific scenarios and needs for the pre- and post-detach moments, which will help you better structure the configurability of a certain component.',
  },
  {
    type: 'code',
    value:
      'const animals = [\'pigs\', \'goats\', \'sheep\'];\n\nconst count = animals.push(\'cows\');\nconsole.log(count);\n// Expected output: 4\n console.log(animals);\n// Expected output: Array ["pigs", "goats", "sheep", "cows"]\n\nanimals.push(\'chickens\', \'cats\', \'dogs\');\nconsole.log(animals);\n// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]',
  },
  {
    type: 'text',
    value:
      'For example, the table component I crafted offers multiple nesting layers of configuration that users can make:',
  },
  {
    type: 'text',
    value:
      'People tend to detach an outer layer more often than an inner layer. If there are choices you prefer users to make before detaching, you can put them in the outer layer. For instance, I extracted high-level attributes like theme, row number, and pattern to the table component (which is the outer layer compared with the column component), as users usually know their preferences and make the configuration upfront. After detaching the outer component, users can still maintain the table structure and column configuration, while having even more flexibility in reordering the columns. This, in fact, proves the “detach” moment is what you can leverage, not something you necessarily have to avoid.',
  },
  { type: 'image', image: image, label: 'Available column types' },
];

export default articleBlocks;
