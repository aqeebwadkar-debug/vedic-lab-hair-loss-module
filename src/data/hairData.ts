import { Question, Product, RoutineTask, ProgressMilestone, EducationalArticle, ChatMessage } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 'hair_concern',
    text: 'What is your primary hair concern?',
    description: 'We will personalize the treatment plan based on your current thinning or hair loss type.',
    type: 'single',
    options: [
      { value: 'thinning', label: 'General hair thinning', sublabel: 'Overall reduction in hair volume and density' },
      { value: 'receding', label: 'Receding hairline', sublabel: 'Thinning around the temples and frontal zone' },
      { value: 'crown', label: 'Crown / vertex thinning', sublabel: 'Developing a noticeble sparse spot at the top' },
      { value: 'shedding', label: 'Excessive shedding / telogen effluvium', sublabel: 'Losing massive clumps in the shower or brush' },
      { value: 'dryness', label: 'Brittle strands & breakage', sublabel: 'Hair snaps easily and feels lifelessly dry' }
    ]
  },
  {
    id: 'loss_duration',
    text: 'How long have you been noticing this concern?',
    description: 'Acute vs chronic hair loss helps us determine your core Dosha imbalance.',
    type: 'single',
    options: [
      { value: 'recent', label: 'Less than 3 months', sublabel: 'Likely temporary or stress-reactive' },
      { value: 'midterm', label: '3 to 12 months', sublabel: 'Subtle, gradual decrease over several seasons' },
      { value: 'longterm', label: '1 to 3 years', sublabel: 'Established pattern with noticeable cosmetic change' },
      { value: 'chronic', label: 'More than 3 years', sublabel: 'Longstanding, requiring deeper systemic therapy' }
    ]
  },
  {
    id: 'family_history',
    text: 'Do any immediate family members experience hair thinning?',
    description: 'Enables our trichology engine to identify genetic/androgenetic patterns (Pitta-Vata dominance) versus stress-driven shedding.',
    type: 'single',
    options: [
      { value: 'maternal', label: 'Yes, on my Mother’s side', sublabel: 'Strong maternal genetic predisposition' },
      { value: 'paternal', label: 'Yes, on my Father’s side', sublabel: 'Paternal hereditary thinning indicators' },
      { value: 'both', label: 'Yes, on both sides', sublabel: 'High hereditary likelihood of genetic alopecia' },
      { value: 'none', label: 'No history', sublabel: 'Likely environmental, stress, or diet reactive' }
    ]
  },
  {
    id: 'scalp_status',
    text: 'How does your scalp feel most of the time?',
    description: 'In Ayurveda, scalp health directly reflects your internal element balance (Vata/Pitta/Kapha).',
    type: 'single',
    options: [
      { value: 'vata', label: 'Dry, tight, and itchy', sublabel: 'Prone to fine, dry dandruff (Vata imbalance)' },
      { value: 'pitta', label: 'Oily, sensitive, or inflamed', sublabel: 'Prone to redness, warmth, or small pimples (Pitta imbalance)' },
      { value: 'kapha', label: 'Heavy, greasy, and dense', sublabel: 'Requires daily washing, sticky thick dandruff (Kapha imbalance)' },
      { value: 'normal', label: 'Balanced and normal', sublabel: 'No excessive dryness, oiliness, or high sensitivity' }
    ]
  },
  {
    id: 'absorption_agni',
    text: 'How is your digestion and bowel consistency?',
    description: 'According to Charaka Samhita, weak metabolic fire (Mandagni) leads to "Ama" toxins that starve follicle roots.',
    type: 'single',
    options: [
      { value: 'sluggish', label: 'Bloated, gassy, or constipated', sublabel: 'Vata-type digestion; blocks micronutrient absorption' },
      { value: 'excessive_acid', label: 'Hyperacidity, frequent loose stools', sublabel: 'Pitta-type hot digestion; overheats hair roots' },
      { value: 'sluggish_greasy', label: 'Heavy, slow, and sleepy after meals', sublabel: 'Kapha-type heavy digestion; leads to scalp sebum deposits' },
      { value: 'healthy', label: 'Regular, clean digestion', sublabel: 'Balanced Agni fire; optimal nutrient absorption' }
    ]
  },
  {
    id: 'stress_level',
    text: 'Rate your daily stress and anxiety level.',
    description: 'High levels of cortisol shock hair follicles into the shedding (Telogen) phase.',
    type: 'rating',
    options: [
      { value: 'low', label: 'Low & Manageable', sublabel: 'Calm, relaxed, and sleeping very well' },
      { value: 'medium', label: 'Moderate Stress', sublabel: 'Occasional spikes, slightly restless mind' },
      { value: 'high', label: 'High Daily Stress', sublabel: 'Frenetic lifestyle, tight deadlines, fitful sleep' },
      { value: 'extreme', label: 'Extreme Chronic Burnout', sublabel: 'Constantly exhausted, anxious, sleeping < 6 hours' }
    ]
  },
  {
    id: 'diet_pattern',
    text: 'What best describes your current dietary pattern?',
    description: 'Ayurvedic nutrition (Ahara) is the primary fuel for secondary tissues (Asthi/Dhatu), which feed hair root follicles.',
    type: 'single',
    options: [
      { value: 'pitta_aggravating', label: 'Spicy, acidic, fried, or high caffeine', sublabel: 'Aggravates high internal heat (Pitta) and dry hair roots' },
      { value: 'clean_balanced', label: 'Nutrient-rich, home-cooked whole foods', sublabel: 'Balanced intake of healthy fats, proteins, and greens' },
      { value: 'vegetarian_vegan', label: 'Strictly plant-based / vegetarian', sublabel: 'High grains and legumes, might need specific iron/B12 support' },
      { value: 'processed', label: 'Frequent ready-meals and processed food', sublabel: 'Low vital energy (Prana) and limited micronutrients' }
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'kit_pro',
    title: 'Keshya Hair Growth & Density Kit',
    subtitle: '3-Step System (Oil, Cleanser, Vitalizer)',
    price: 89.00,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop',
    category: 'Kit',
    description: 'A premium, clinical-grade three-piece kit developed by Ayurvedic doctors in Switzerland. Specifically balanced to soothe Pitta-driven root inflammation and stimulate follicle activity.',
    ingredients: ['Bringharaj Extract (Eclipta Alba)', 'Amla Berry (Emblica Officinalis)', 'Rosemary Essential Oil', 'Brahmi (Bacopa Monnieri)', 'Cold-pressed Sesame Oil'],
    benefits: [
      'Reduces excessive daily shedding by up to 72% in 12 weeks',
      'Neutralizes scalp redness and controls dry or greasy dandruff',
      'Provides pure Ayurvedic micronutrients directly to follicle roots'
    ]
  },
  {
    id: 'oil_keshya',
    title: 'Keshya Premium Hair Oil',
    subtitle: 'Overnight Root Revitalizer',
    price: 34.00,
    rating: 4.8,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    category: 'Oil',
    description: 'Traditional slow-cooked herbal oil utilizing the ancient Kshirpak technique (herbs infused into heavy organic milk and cold-pressed oils for 72 hours). Enhances scalp circulation and deep root grip.',
    ingredients: ['Maha Bhringraj Oil', 'Virgin Coconut Oil', 'Black Seed (Kalonji) Oil', 'Karanja Oil'],
    benefits: [
      'Strengthens hair roots and anchors weaker follicles',
      'Improves overnight relaxation and sleep quality when massaged',
      'Intensively conditions dry, split, or damaged hair cuticles'
    ]
  },
  {
    id: 'shampoo_bhringraj',
    title: 'Bhringraj Scalp Densifying Shampoo',
    subtitle: 'Sulfate-Free Cleanser with Amla & Neem',
    price: 24.00,
    rating: 4.7,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop',
    category: 'Shampoo',
    description: 'Mild botanical cleanser that purges excess sebum and chemical residues without drying out the delicate scalp skin. Infused with fresh amla vitamin C and clarifying neem.',
    ingredients: ['Organic Soapnut (Aritha)', 'Fresh Amla Juice', 'Shikakai Bark Extract', 'Neem Leaf Infusion'],
    benefits: [
      'Gentle sebum control to prevent follicle suffocation',
      'Imparts natural bounce, high shine, and thick appearance',
      'Completely free from SLS, parabens, and synthetic silicones'
    ]
  },
  {
    id: 'capsules_keshya',
    title: 'Keshya Hair Vitality Capsules',
    subtitle: 'Daily Micro-Mineral Food Supplement',
    price: 39.00,
    rating: 4.9,
    reviewsCount: 224,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop',
    category: 'Supplement',
    description: 'Ayurvedic Rasayana (rejuvenator) pills engineered to supply optimal sulfur, iron, and silica to the bloodstream to nourish your hair roots from within.',
    ingredients: ['Amalaki (Phyllanthus Emblica)', 'Yestimadhu (Licorice Root)', 'Asphaltum (Shilajit Purified)', 'Shatavari (Asparagus Racemosus)'],
    benefits: [
      'Enhances natural keratin synthesis from the inside out',
      'Calms aggravated constitutional heat (excessive Pitta fire)',
      'Rich in clinical Ayurvedic minerals supporting dense growth'
    ]
  }
];

export const MOCK_ROUTINE: RoutineTask[] = [
  {
    id: 'm1',
    title: 'Warm Scalp Massage (Shiro Abhyanga)',
    description: 'Massage 5-10 drops of Warm Keshya Oil onto temple, crown, and hairline regions. Move in slow circles to increase local vascular circulation.',
    time: '08:00',
    duration: '10 min',
    completed: false,
    category: 'Morning',
    points: 15,
    icon: 'Droplet'
  },
  {
    id: 'm2',
    title: 'Keshya Vitality Capsules Intake',
    description: 'Take 1 capsule of Keshya Hair Vitality with warm water after a light breakfast. Supports internal blood purification (Rakta Sodhana).',
    time: '08:30',
    duration: '2 min',
    completed: false,
    category: 'Morning',
    points: 10,
    icon: 'Sparkles'
  },
  {
    id: 'a1',
    title: 'Rosewood Wood-Comb Brushing',
    description: 'Gently stroke your scalp using our rounded organic neem-wood comb. Touch the scalp skin slowly to trigger micro-prk blood circulation.',
    time: '14:30',
    duration: '5 min',
    completed: false,
    category: 'Afternoon',
    points: 10,
    icon: 'Sparkles'
  },
  {
    id: 'e1',
    title: 'Cooling Breath Pranayama (Sheetali)',
    description: 'Inhale through the curled tongue and exhale through your nose. Reduces high stress hormone levels that cause hair shedding.',
    time: '21:00',
    duration: '8 min',
    completed: false,
    category: 'Evening',
    points: 20,
    icon: 'Wind'
  },
  {
    id: 'e2',
    title: 'Scalp Revitalizing Spray',
    description: 'Spray Keshya botanical root peptide water directly over active thinning areas. Press gently. Do not rinse.',
    time: '22:00',
    duration: '3 min',
    completed: false,
    category: 'Evening',
    points: 15,
    icon: 'FlameKindling'
  }
];

export const PROGRESS_MILESTONES: ProgressMilestone[] = [
  { id: 'w1', week: 2, title: 'Scalp Stabilization', description: 'Reduction in oiliness/dryness, itchiness goes away completely. Scalp skin feels healthy and prepped.', completed: true, active: false },
  { id: 'w2', week: 4, title: 'Reduction in Shedding', description: 'De-acceleration of hair fall. Shaving brush and shower drain collect less hair clumps (up to 30% reduction).', completed: true, active: false },
  { id: 'w3', week: 8, title: 'Anagen Phase Reactivation', description: 'Small baby hairs (velus hair) start showing up near the temples and crown line as follicles re-awaken.', completed: false, active: true },
  { id: 'w4', week: 12, title: 'Strand Thickening & Grip', description: 'Core hair shaft diameter increases by up to 22%. Increased volume and thickness throughout the scalp.', completed: false, active: false },
  { id: 'w5', week: 16, title: 'Full Cycle Consolidation', description: 'Optimal density restoration, strong healthy roots. Ongoing care switches to long-term preventative maintenance.', completed: false, active: false }
];

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'art1',
    title: 'Understanding "Khalitya" (Alopcia) in Ayurvedic Treatises',
    category: 'Ancient Wisdom',
    readTime: '6 min read',
    snippet: 'According to Charaka Samhita, high Pitta combined with Vata toxins scorched hair follicles. Here is how ancient sages reversed thinning.',
    content: `In ancient Ayurvedic textbooks, hair loss is referred to as **Khalitya**, classified primarily under the umbrella of Kshudra Rogas (minor ailments, although cosmetically highly impactful). 

The Ayurvedic texts explain that our physical physique is composed of seven tissues or **Dhatus**. Hair is known as an **Upadhatu** (by-product) of the bone tissue (**Asthi Dhatu**). 

When our primary digestive fire (**Agni**) goes down, toxins or **Ama** accumulate in the blood circulation system. When paired with high lifestyle stress or hot/acidic nutritional habits, our constitutional heat or **Pitta Dosha** surges. 

This toxic blood and heat head upward to the scalp. They literally scorch the tiny apertures which connect hair follicles to systemic nutrition. The hair lacks basic nutrition, causing premature graying and shedding. 

**Reversing Khalitya requires a 3-fold approach:**
1. **Shodhana (Cleansing):** Purifying the liver and blood.
2. **Pacifying Pitta:** Eliminating spicy, acidic foods and lowering hot temper or stress through cooling practices like Sheetali Pranayama.
3. **Keshya Actions (Re-nourishment):** Supplying botanical rejuvenators directly to the scalp via herbal massage like Shiro Abhyanga (warm oil massage) using herbs like Bhringraj—known as the 'King of Hair'.`,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    doshaTopic: 'Pitta-Vata'
  },
  {
    id: 'art2',
    title: 'The "King of Herbs": Why Bhringraj is Scientifically Proven for Dense Hair',
    category: 'Botanical Science',
    readTime: '4 min read',
    snippet: 'Unlocking the power of Wedelolactone—the secret chemical compound in Bhringraj that blocks DHT-like follicle shrinkers naturally.',
    content: `**Bhringraj** (scientific name: *Eclipta Alba*) is celebrated in standard Ayurvedic materia medica as the absolute premier botanical for hair density. 

Modern cosmetic science has recently begun isolating its active bio-compounds, and the findings are astonishing:
- **Wedelolactone:** A powerful phyto-nutrient that stimulates dermal papilla cells, prompting them to remain in the active growth (**Anagen**) phase for up to 40% longer.
- **Natural DHT Block:** Research indicates extract of Bhringraj works similarly to topical low-dose minoxidil, without the dry, chemical burning side effects, by calming local inflammatory enzymes.
- **Melanine Revitalization:** It feeds the pigment-producing cells in your hair bulb, slowing down graying.

**How to Use Bhringraj correctly:**
Never apply raw, uncooked Bhringraj juice directly to a cold scalp, as it is biologically highly cooling and can cause temporary congestion. 

Instead, look for Bhringraj slow-cooked into oil bases (Kshirpak technique) with sesame oil or light coconut oil. This unlocks the fat-soluble phytochemical ingredients, providing smooth, safe absorbability.`,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop',
    doshaTopic: 'Tridoshic'
  },
  {
    id: 'art3',
    title: 'How High Stress Cortisol Triggers Hair Follicle Hibernation',
    category: 'Lifestyle',
    readTime: '5 min read',
    snippet: 'Discover the bio-connection between high mental pressure, shallow breathing, and why hair sheds exactly 90 days after high stress.',
    content: `Have you ever gone through an incredibly stressful project or personal shock, only to find clumps of hair falling out three months later? 

This is not a coincidence—this is a classic symptom of **Telogen Effluvium**, which can be beautifully explained by both cellular biology and Ayurvedic science:

When your mind moves into a high-survival, high-stress state, your body secretes a hormone called cortisol. High cortisol signals to non-essential systems (skin, nails, and hair follicles) to stop wasting precious metabolic energy. 

Up to 30% of your actively growing hair follicles are prematurely shocked out of the growing phase (**Anagen**) and pushed straight into the resting phase (**Telogen**). 

The hair follicle rests or hibernates for exactly 8 to 12 weeks inside the scalp before it is physically pushed out and shed by the root. 

In Ayurveda, this mental overload is described as a rapid surge of **Prana Vata**—disturbing the calm wind of the nervous system and sucking out the natural moistness (**Ojas**) of our scalp tissues.

To combat stress-driven hair loss, regular scalp lubrication with herbal therapy paired with daily pranayama (such as Alternate Nostril Breathing) acts as an off-switch, restoring the vital current to your hair roots.`,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    doshaTopic: 'Vata'
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'c1',
    sender: 'coach',
    text: 'Namaste! Standard welcome to Vedic Lab Hair Wellness. I am Dr. Devendra, your dedicated Ayurvedic Hair Loss Specialist and Coach.',
    timestamp: '10:00 AM'
  },
  {
    id: 'c2',
    sender: 'coach',
    text: 'I have just reviewed your Hair Assessment Questionnaire and Scalp Analysis results. Since you have Vata-Pitta related thinning, we need to carefully soothe your scalp and hydrate your roots.',
    timestamp: '10:01 AM'
  },
  {
    id: 'c3',
    sender: 'coach',
    text: 'How is your current level of sleep, and do you feel excessive heat/warmth on your scalp?',
    timestamp: '10:02 AM'
  }
];
