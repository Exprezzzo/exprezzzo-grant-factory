# Exprezzzo Grant Factory

**AI-Powered Grant Application Automation for Vegas Hospitality Technology**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![System Health](https://img.shields.io/badge/System%20Health-91%25-brightgreen)](./validation-report.md)

> Transforming grant application creation through intelligent templates, automated variable resolution, and Vegas hospitality industry expertise.

---

## 🎯 Overview

Exprezzzo Grant Factory automates the creation of professional grant applications for hospitality technology startups. Built specifically for companies leveraging Vegas market advantages, it combines proven templates with AI enhancement to generate compelling funding applications.

### Key Features

- **🤖 AI-Enhanced Generation** - Groq-powered content creation with 150x cost advantage
- **📋 Professional Templates** - Y Combinator, Techstars, AngelNV, and SBIR applications
- **🔧 Smart Variables** - Handlebars integration with company profile automation
- **📊 Application Tracking** - SQLite database with deadline monitoring
- **📄 PDF Export** - Professional formatting for submission-ready documents
- **🧩 Modular Content** - Reusable sections for founder background, network advantages, and technology benefits

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **pnpm** (recommended) or npm
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/Exprezzzo/exprezzzo-grant-factory.git
cd exprezzzo-grant-factory

# Install dependencies
pnpm install

# Initialize database
pnpm run init:db

# Set up environment variables
cp .env.example .env
# Add your GROQ_API_KEY to .env
```

### Basic Usage

```bash
# Generate a grant application
pnpm run build "Y Combinator Application" --template=y-combinator-w26 --amount=250000

# Export to PDF
pnpm run export:pdf your-application.md

# Check application status
pnpm run status

# Monitor deadlines
pnpm run deadlines
```

---

## 📚 Available Templates

### 🏆 Accelerator Programs

#### **Y Combinator W26**
- **File:** `templates/y-combinator-w26.md`
- **Sections:** 10 core questions including company description, market opportunity, and founder background
- **Focus:** Scalable technology with network effects
- **Target Amount:** $500K+ follow-on potential

#### **Techstars Anywhere**
- **File:** `templates/techstars-anywhere.md`
- **Sections:** 9 comprehensive sections emphasizing remote-first operations
- **Focus:** Distributed team advantages and founder resilience
- **Target Amount:** $120K + mentorship access

### 🏛️ Government & Regional Funding

#### **AngelNV 6**
- **File:** `templates/angelnv-6.md`
- **Sections:** 11 detailed sections with Nevada economic impact focus
- **Focus:** Vegas network competitive advantage + SSBCI matching
- **Target Amount:** $200K (becomes $400K with SSBCI match)

#### **NSF SBIR Phase I**
- **File:** `templates/nsf-sbir.md`
- **Sections:** Technical innovation and commercialization potential
- **Focus:** Research-based technology development
- **Target Amount:** $275K - $300K

### 🎰 Vegas-Specific Programs

#### **Nevada Innovation**
- **File:** `templates/nevada-innovation.md`
- **Focus:** Local economic development and job creation
- **Target Amount:** $50K - $100K

---

## 🧩 Modular Content System

### Founder Modules
- **`modules/founder/kidney-transplant-strength.md`** - Resilience and constraint-driven efficiency narrative
- Health challenges as competitive advantages
- 2-hour work block productivity optimization
- Accessibility-first design philosophy

### Network Modules
- **`modules/network/vegas-decision-makers.md`** - 40+ casino executives and hotel owners
- **`modules/network/linkedin-professionals.md`** - 200+ hospitality professionals for validation
- **`modules/network/vendor-database.md`** - 500+ verified businesses for customer acquisition

### Technology Modules
- **`modules/technology/cost-advantage.md`** - 150x cost reduction through Groq AI integration
- Edge computing optimization
- Enterprise features at SMB pricing

---

## ⚙️ Configuration

### Company Profile

Edit `company-profile.json` to customize applications:

```json
{
  "company": {
    "legal_name": "EXPREZZZO",
    "brand_name": "EXPREZZZO (3 Z's)",
    "founded": 2022
  },
  "founder": {
    "name": "Jay",
    "age": 53,
    "health": "Kidney transplant 2022, full recovery, 2-hour work blocks",
    "experience": "23 years Vegas hospitality operations"
  },
  "network": {
    "tier1_decision_makers": "40+",
    "tier2_linkedin": "200+",
    "tier3_vendor_database": "500+",
    "competitive_advantage": "Built-in customer acquisition no competitor can replicate"
  }
}
```

### Environment Variables

```bash
# .env file
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=production
```

---

## 📊 System Architecture

### Core Components

```
exprezzzo-grant-factory/
├── 📁 templates/          # Grant application templates
├── 📁 modules/            # Reusable content modules
├── 📁 scripts/            # Build and utility scripts
├── 📁 applications/       # Generated applications
├── 📁 lib/               # AI router and utilities
├── 📄 company-profile.json # Company data source
├── 📄 grants.db          # SQLite application tracking
└── 📄 package.json       # Dependencies and scripts
```

### Technology Stack

- **Runtime:** Node.js + TypeScript
- **Database:** SQLite with better-sqlite3
- **Templates:** Handlebars.js for variable resolution
- **AI:** Groq API for content enhancement
- **PDF:** Puppeteer for professional document export
- **Scheduling:** node-schedule for deadline monitoring

---

## 🔧 Available Scripts

| Command | Description | Example |
|---------|-------------|---------|
| `pnpm run build` | Generate grant application | `pnpm run build "SBIR Phase 1" --template=nsf-sbir --amount=275000` |
| `pnpm run export:pdf` | Convert markdown to PDF | `pnpm run export:pdf application.md` |
| `pnpm run status` | View all applications | Shows ID, status, amount, deadline |
| `pnpm run deadlines` | Monitor upcoming deadlines | Color-coded urgency indicators |
| `pnpm run init:db` | Initialize database | Sets up SQLite schema |

### Advanced Usage

```bash
# Generate with custom data
pnpm run build "Custom Grant" --template=techstars-anywhere --amount=120000 --deadline=2025-06-01

# Batch PDF export
for file in applications/*.md; do
  pnpm run export:pdf "$file"
done

# Database management
sqlite3 grants.db "SELECT * FROM applications WHERE status = 'draft';"
```

---

## 🎯 Vegas Hospitality Competitive Advantages

### Unique Value Propositions

1. **🎰 Casino Executive Network**
   - 40+ direct decision-makers with purchasing authority
   - Personal assistant experience with casino mogul (2007-2018)
   - Immediate pilot program access within weeks, not months

2. **💰 Cost Innovation**
   - $0.001 per AI request vs. BigTech $0.15 (150x advantage)
   - Edge computing + Groq AI integration
   - Enterprise features accessible to mid-market venues

3. **🏨 Market Validation**
   - 23 years Vegas hospitality operations experience
   - 500+ verified vendor relationships in database
   - 200+ LinkedIn professionals for market intelligence

4. **♿ Founder Resilience**
   - Kidney transplant recovery demonstrates crisis management
   - 2-hour work blocks create forced efficiency advantages
   - Medical constraints drive accessibility-first design

---

## 📈 Success Metrics

### System Performance
- **Template Generation:** 0.6-0.9 seconds
- **PDF Export:** <1 second
- **Database Queries:** <0.1 seconds
- **Variable Resolution:** 100% success rate
- **Overall System Health:** 91% (Excellent)

### Application Results
- **Cost per Application:** $0.0002 (Groq AI processing)
- **Time to Complete:** 5-10 minutes vs. 20+ hours manual
- **Professional Quality:** Submission-ready formatting
- **Customization:** 100+ Handlebars variables

---

## 🔍 Validation Report

The system underwent comprehensive testing with the following results:

| Component | Status | Score | Notes |
|-----------|---------|-------|-------|
| Template Generation | ⚠️ Partial | 6/10 | AI override issue identified |
| PDF Export | ✅ Pass | 10/10 | Professional formatting |
| Database Tracking | ✅ Pass | 9/10 | Full CRUD operations |
| Variable Resolution | ✅ Pass | 10/10 | All Handlebars variables work |
| Deadline Monitoring | ✅ Pass | 10/10 | Accurate tracking |
| Module System | ✅ Pass | 10/10 | Reusable components |

**Detailed Report:** [validation-report.md](./validation-report.md)

---

## 🚧 Known Issues & Roadmap

### Current Issues
1. **Template Override:** AI enhancement overrides template content (fix in progress)
2. **Command Parsing:** Database shows "--template" instead of actual names
3. **Legacy Templates:** 3 templates need variable structure updates

### Upcoming Features
- [ ] Template versioning system
- [ ] Automated testing suite
- [ ] Web-based template editor
- [ ] Multi-language support
- [ ] Integration with DocuSign for submissions
- [ ] Analytics dashboard

---

## 🤝 Contributing

### Development Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/exprezzzo-grant-factory.git
cd exprezzzo-grant-factory

# Install dependencies
pnpm install

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
pnpm run build test-grant --template=y-combinator-w26
pnpm run export:pdf applications/test-grant-*.md

# Commit and push
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

### Template Development

1. Create new template in `templates/`
2. Use Handlebars variables from `company-profile.json`
3. Test with `pnpm run build`
4. Validate PDF export
5. Update README with template details

### Module Development

1. Create module in appropriate `modules/` subdirectory
2. Include comprehensive Handlebars variables
3. Target 200-300 words for consistency
4. Test integration across multiple templates

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Groq AI** for lightning-fast, cost-effective AI processing
- **Vegas Hospitality Community** for 23 years of network building
- **Handlebars.js** for elegant template variable resolution
- **SQLite** for reliable, embedded database functionality

---

## 📞 Contact & Support

**Founder:** Jay
**Industry:** Vegas Hospitality Technology
**Experience:** 23 years operations, 2 years post-kidney transplant innovation

**Repository:** [github.com/Exprezzzo/exprezzzo-grant-factory](https://github.com/Exprezzzo/exprezzzo-grant-factory)
**Issues:** [GitHub Issues](https://github.com/Exprezzzo/exprezzzo-grant-factory/issues)

---

> *"Transforming medical constraints into competitive advantages, Vegas networks into customer acquisition engines, and grant applications into funding success stories."*

**Built with constraint-driven efficiency. Powered by Vegas hospitality expertise. Enhanced by AI innovation.**