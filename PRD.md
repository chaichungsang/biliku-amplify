# Product Requirements Document (PRD)
# Biliku - Sarawak Room Rental Platform

**Document Version:** 1.0  
**Last Updated:** August 27, 2025  
**Product Manager:** Biliku Team  
**Status:** Active Development

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Overview](#product-overview)
3. [Market Analysis](#market-analysis)
4. [User Personas](#user-personas)
5. [Feature Requirements](#feature-requirements)
6. [User Stories & Acceptance Criteria](#user-stories--acceptance-criteria)
7. [Technical Requirements](#technical-requirements)
8. [Success Metrics](#success-metrics)
9. [Development Roadmap](#development-roadmap)
10. [Risk Assessment](#risk-assessment)

---

## 🎯 Executive Summary

### Product Vision
Biliku is Sarawak's premier room rental platform, connecting landlords and tenants with secure, verified accommodation listings across East Malaysia. Built by Sarawakians for Sarawakians, we understand local market dynamics, cultural preferences, and community needs.

### Business Goals
- **Primary**: Become the #1 room rental platform in Sarawak within 12 months
- **Secondary**: Achieve 10,000+ active listings and 50,000+ registered users
- **Tertiary**: Establish sustainable revenue model through premium services

### Key Success Metrics
- **User Acquisition**: 1,000 new users per month
- **Listing Growth**: 500 new listings per month  
- **Engagement**: 70% monthly active user rate
- **Quality**: 95% listing approval rate
- **Retention**: 80% landlord retention after first listing

---

## 🏠 Product Overview

### Core Value Proposition
"The trusted platform where Sarawakians find and list quality room rentals with zero fees, local understanding, and community-first approach."

### Platform Type
Two-sided marketplace connecting:
- **Supply Side**: Property owners, landlords, agents
- **Demand Side**: Students, working professionals, families seeking rentals

### Geographic Focus
**Primary Markets:**
- Kuching (35% of listings target)
- Sibu (20% of listings target)
- Miri (20% of listings target)
- Bintulu (15% of listings target)

**Secondary Markets:**
- Sarikei, Limbang, Sri Aman, Kapit, and other Sarawak towns (10% combined)

### Business Model
- **Phase 1 (Current)**: 100% Free platform to build network effects
- **Phase 2 (Future)**: Premium services (featured listings, analytics, tenant screening)
- **Revenue Streams**: Premium subscriptions, advertising, value-added services

---

## 📊 Market Analysis

### Market Size
- **Total Addressable Market**: 2.8M population in Sarawak
- **Serviceable Addressable Market**: 800K urban population
- **Serviceable Obtainable Market**: 80K potential users (10% penetration)

### Competitive Landscape
**Direct Competitors:**
- Mudah.my (general classifieds, poor UX for rentals)
- Facebook Groups (unstructured, no verification)
- PropertyGuru (premium segment, not Sarawak-focused)

**Competitive Advantages:**
- 100% free service
- Sarawak-specific understanding
- Mobile-first design
- Verified listings
- Local community focus

### Market Opportunity
- **Gap**: No dedicated room rental platform for Sarawak market
- **Demand**: High student/professional migration to urban areas
- **Supply**: Fragmented landlord market with poor digital presence
- **Cultural Fit**: Local language, cultural preferences, location understanding

---

## 👥 User Personas

### Primary Persona 1: Sarah the Student
**Demographics:**
- Age: 19-24
- Education: University student
- Location: From rural Sarawak, studying in Kuching/Miri
- Income: RM500-800/month (family support + part-time)

**Goals:**
- Find affordable room near campus
- Safe, clean accommodation
- Easy communication with landlords
- Flexible rental terms

**Pain Points:**
- Limited budget
- Unfamiliar with urban areas
- Language barriers
- Lack of references

**Usage Patterns:**
- Mobile-first browsing
- Price-sensitive searches
- Prefers WhatsApp communication
- Searches during semester breaks

### Primary Persona 2: David the Working Professional
**Demographics:**
- Age: 25-35
- Occupation: Office worker, government employee
- Location: Relocated for work
- Income: RM2,500-4,500/month

**Goals:**
- Quality accommodation near workplace
- Professional environment
- Reliable utilities and WiFi
- Parking availability

**Pain Points:**
- Work schedule limits viewing times
- Quality vs. price balance
- Commute considerations
- Professional image concerns

**Usage Patterns:**
- Evening/weekend browsing
- Desktop and mobile usage
- Values detailed listings
- Prefers direct landlord contact

### Primary Persona 3: Linda the Landlord
**Demographics:**
- Age: 35-55
- Occupation: Business owner, retiree, investor
- Location: Urban Sarawak
- Properties: 1-5 rental units

**Goals:**
- Find reliable, long-term tenants
- Minimize vacancy periods
- Screen potential tenants
- Manage multiple listings efficiently

**Pain Points:**
- Time-consuming tenant screening
- No-shows for viewings
- Payment delays/defaults
- Property maintenance coordination

**Usage Patterns:**
- Mobile-heavy usage
- Weekend listing management
- Values inquirer quality over quantity
- Prefers phone/WhatsApp communication

### Secondary Persona: Ahmad the Property Agent
**Demographics:**
- Age: 30-45
- Occupation: Real estate agent
- Portfolio: 20-50 managed properties
- Commission-based income

**Goals:**
- Efficient listing management
- Lead generation
- Professional portfolio presentation
- Client relationship management

---

## 🎨 Feature Requirements

### 1. CRITICAL: Add Property/Listing Feature
**Priority:** P0 (Blocking launch)  
**Status:** Missing - Must implement immediately

#### Feature Overview
Multi-step wizard allowing landlords to create comprehensive property listings with photos, details, and availability information.

#### Functional Requirements
**Step 1: Basic Information**
- Property title (required, 10-100 characters)
- Property description (required, 50-2000 characters)
- Monthly rent amount (required, RM format)
- Room type selection (Single room, Master room, Studio, Apartment)
- Property type (Landed house, Condominium, Apartment, Shophouse)

**Step 2: Location Details**
- Full address (required, validated against Sarawak locations)
- City/District (dropdown: Kuching, Sibu, Miri, Bintulu, etc.)
- Neighborhood/Area (text input with suggestions)
- Nearby landmarks (optional, multi-select)
- GPS coordinates (auto-generated from address)

**Step 3: Property Specifications**
- Furnishing status (Fully furnished, Partially furnished, Unfurnished)
- Number of bedrooms (0-10)
- Number of bathrooms (1-10)
- Floor size in sq ft (optional, 50-5000)
- Floor level (Ground, 1-50+)
- Building year (dropdown 1950-2025)

**Step 4: Amenities & Features**
- Basic amenities (Air conditioning, WiFi, Washing machine, etc.)
- Security features (CCTV, Security guard, Gated community)
- Parking (None, Motorcycle only, 1 car, Multiple cars)
- Kitchen facilities (Shared, Private, Gas stove, Electric stove)
- Additional facilities (Pool, Gym, Playground, Shops nearby)

**Step 5: Rental Terms & Preferences**
- Availability date (date picker, not earlier than today)
- Minimum lease duration (1-24 months)
- Security deposit (0-6 months rent)
- Advance rental payment (0-6 months)
- Utility deposits (Electricity, Water, Internet)
- Gender preference (No preference, Male only, Female only)
- Smoking policy (Allowed, Not allowed)
- Pet policy (Allowed, Not allowed, Small pets only)

**Step 6: Photo Upload**
- Main photo (required, first image becomes cover)
- Additional photos (up to 10 images)
- Image requirements: Max 5MB per image, JPG/PNG format
- Auto-compression and resizing
- Drag & drop interface with mobile camera support
- Photo reordering capability

**Step 7: Contact & Availability**
- Contact method preferences (Phone, WhatsApp, Email, In-app messaging)
- Viewing availability (specific days/times)
- Response time commitment (Within hours)
- Additional notes for tenants (optional)

**Step 8: Review & Publish**
- Preview of complete listing
- Edit any section option
- Terms and conditions acceptance
- Listing approval process notice
- Publish button

#### Non-Functional Requirements
- **Performance**: Form loads within 2 seconds
- **Mobile**: Fully responsive on screens 320px+
- **Accessibility**: WCAG 2.1 AA compliant
- **Validation**: Real-time client-side validation
- **Storage**: Auto-save draft every 30 seconds
- **Images**: Upload progress indicators
- **SEO**: Generated meta descriptions for listings

#### User Experience Requirements
- **Progress Indicator**: Clear step progression (1/8, 2/8, etc.)
- **Navigation**: Previous/Next buttons, direct step jumping
- **Validation**: Inline error messages, field-level validation
- **Help**: Contextual help tooltips and examples
- **Mobile UX**: Touch-friendly, minimal typing required
- **Save Draft**: Resume editing later functionality

### 2. USER MANAGEMENT & AUTHENTICATION
**Status:** Implemented ✅

#### Current Features
- AWS Cognito authentication
- Email/password registration
- Google social login
- Profile management
- Email verification
- Password reset functionality

#### Profile Enhancement Requirements
- **Profile Completion Score**: Encourage complete profiles
- **Verification Badges**: Phone, email, ID verification
- **Rating System**: User ratings and reviews
- **Activity History**: Track user actions and engagement

### 3. LISTING DISCOVERY & SEARCH
**Status:** Partially Implemented 🔄

#### Current Features
- Basic listings grid display
- Room details pages
- Simple navigation

#### Enhancement Requirements
**Advanced Search Filters:**
- Price range (RM 100 - RM 5000+)
- Location (City, District, Neighborhood)
- Room type and property type
- Amenities (multi-select checkboxes)
- Available date range
- Gender preferences
- Furnishing level

**Search Experience:**
- Map view with markers
- List view with photos
- Saved searches with alerts
- Recent searches history
- Sort options (Price, Date, Distance)

**Discovery Features:**
- Recommended listings based on search history
- "Similar properties" suggestions
- Popular neighborhoods
- Recently added listings
- Featured/promoted listings (future revenue)

### 4. COMMUNICATION SYSTEM
**Status:** Basic Implementation 🔄

#### Current Features
- Contact information display
- External communication (WhatsApp, phone)

#### Enhancement Requirements
**In-App Messaging:**
- Secure messaging between users
- Message history and threads
- Read receipts and typing indicators
- Photo sharing in messages
- Contact sharing (phone/WhatsApp after initial contact)

**Inquiry Management:**
- Standardized inquiry templates
- Inquiry status tracking
- Viewing appointment scheduling
- Automated reminders
- Inquiry analytics for landlords

### 5. LISTING MANAGEMENT
**Status:** Partially Implemented 🔄

#### Current Features
- My Listings page (basic display)
- User profile with listing stats

#### Enhancement Requirements
**Landlord Dashboard:**
- Listing performance analytics (views, inquiries)
- Quick edit functionality
- Listing status management (Active, Rented, Maintenance)
- Duplicate listing detection
- Bulk operations (activate/deactivate multiple)

**Listing Optimization:**
- SEO-friendly URLs
- Social media sharing
- Print-friendly versions
- QR codes for physical advertising
- Listing expiration and renewal system

### 6. QUALITY ASSURANCE & SAFETY
**Status:** Basic Framework 🔄

#### Current Features
- Manual listing review process
- User reporting system

#### Enhancement Requirements
**Listing Verification:**
- Photo verification (no stock images)
- Address verification
- Price reasonableness checks
- Duplicate detection
- Spam filtering

**User Safety:**
- Identity verification options
- User review and rating system
- Report abuse functionality
- Safe communication guidelines
- Emergency contact system

---

## 📝 User Stories & Acceptance Criteria

### Epic 1: Add Property Listing

#### Story 1.1: Property Owner Creates First Listing
**As a** property owner  
**I want to** create a comprehensive listing for my rental property  
**So that** I can attract quality tenants and minimize vacancy

**Acceptance Criteria:**
- ✅ User must be authenticated to access add listing page
- ✅ Form validates required fields before allowing progression
- ✅ User can upload minimum 1 photo, maximum 10 photos
- ✅ Address validation ensures Sarawak locations only
- ✅ Price validation ensures reasonable rental amounts (RM 100-10,000)
- ✅ Draft auto-saves every 30 seconds
- ✅ User receives confirmation upon successful submission
- ✅ Listing enters review queue for approval
- ✅ User receives email notification when listing is approved/rejected

#### Story 1.2: Property Owner Edits Existing Listing
**As a** property owner  
**I want to** update my listing details and photos  
**So that** I can keep information current and accurate

**Acceptance Criteria:**
- ✅ Edit preserves existing data while allowing modifications
- ✅ Photo reordering and replacement functionality
- ✅ Changes trigger re-review if significant modifications
- ✅ Version history maintained for administrative purposes

#### Story 1.3: Property Owner Manages Multiple Listings
**As a** property owner with multiple properties  
**I want to** efficiently manage all my listings from one dashboard  
**So that** I can save time and maintain consistency

**Acceptance Criteria:**
- ✅ Dashboard shows all listings with key metrics
- ✅ Bulk actions available (activate/deactivate/delete)
- ✅ Quick edit for common changes (price, availability)
- ✅ Performance analytics for each listing

### Epic 2: Tenant Property Discovery

#### Story 2.1: Tenant Searches for Accommodation
**As a** student/professional looking for accommodation  
**I want to** search and filter properties based on my needs  
**So that** I can find suitable options quickly

**Acceptance Criteria:**
- ✅ Search filters work accurately and update results immediately
- ✅ Results display key information (price, location, photos)
- ✅ Map view shows property locations
- ✅ Saved searches remember preferences
- ✅ Mobile experience is smooth and fast

#### Story 2.2: Tenant Views Property Details
**As a** potential tenant  
**I want to** view comprehensive property information  
**So that** I can make an informed decision

**Acceptance Criteria:**
- ✅ All property details display correctly
- ✅ Photo gallery with zoom functionality
- ✅ Contact information readily accessible
- ✅ Similar properties suggested
- ✅ Sharing functionality available

#### Story 2.3: Tenant Contacts Property Owner
**As a** interested tenant  
**I want to** easily contact the property owner  
**So that** I can arrange viewing and ask questions

**Acceptance Criteria:**
- ✅ Multiple contact methods available
- ✅ Pre-filled inquiry templates
- ✅ Contact tracking and history
- ✅ Response time expectations clear

---

## 🛠 Technical Requirements

### Architecture Overview
**Frontend:** React 18 + TypeScript + Material-UI v5  
**Backend:** AWS Amplify + AppSync GraphQL  
**Database:** DynamoDB  
**Storage:** AWS S3  
**Authentication:** AWS Cognito  
**Hosting:** AWS Amplify Hosting

### Data Models (GraphQL Schema)
```graphql
type RoomListing @model @auth(rules: [
  { allow: owner, ownerField: "ownerId" },
  { allow: public, operations: [read] }
]) {
  id: ID!
  title: String! @index(name: "byTitle", queryField: "listingsByTitle")
  description: String!
  price: Float!
  roomType: RoomType!
  propertyType: PropertyType!
  
  # Location
  address: String!
  city: String! @index(name: "byCity", queryField: "listingsByCity")
  neighborhood: String
  latitude: Float
  longitude: Float
  
  # Specifications
  bedrooms: Int!
  bathrooms: Int!
  squareFeet: Int
  furnished: FurnishingLevel!
  floorLevel: String
  
  # Media
  images: [String!]!
  mainImage: String!
  
  # Availability
  availableFrom: AWSDate!
  minimumStay: Int!
  
  # Terms
  deposit: Float!
  advancePayment: Int!
  genderPreference: GenderPreference
  smokingAllowed: Boolean!
  petsAllowed: Boolean!
  
  # Metadata
  status: ListingStatus!
  ownerId: ID! @index(name: "byOwner", queryField: "listingsByOwner")
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  
  # Relations
  owner: UserProfile @belongsTo(fields: ["ownerId"])
  inquiries: [Inquiry] @hasMany(indexName: "byListing", fields: ["id"])
  favorites: [Favorite] @hasMany(indexName: "byListing", fields: ["id"])
  reviews: [Review] @hasMany(indexName: "byListing", fields: ["id"])
}

enum RoomType {
  SINGLE_ROOM
  MASTER_ROOM
  STUDIO
  APARTMENT
  WHOLE_UNIT
}

enum PropertyType {
  LANDED_HOUSE
  CONDOMINIUM
  APARTMENT
  SHOPHOUSE
  TOWNHOUSE
}

enum FurnishingLevel {
  FULLY_FURNISHED
  PARTIALLY_FURNISHED
  UNFURNISHED
}

enum GenderPreference {
  NO_PREFERENCE
  MALE_ONLY
  FEMALE_ONLY
}

enum ListingStatus {
  DRAFT
  PENDING_REVIEW
  ACTIVE
  RENTED
  INACTIVE
  REJECTED
}
```

### API Endpoints
**GraphQL Mutations:**
- `createListing(input: CreateListingInput!): RoomListing`
- `updateListing(input: UpdateListingInput!): RoomListing`
- `deleteListing(input: DeleteListingInput!): RoomListing`

**GraphQL Queries:**
- `getListing(id: ID!): RoomListing`
- `listListings(filter: ModelListingFilterInput): ModelListingConnection`
- `listingsByCity(city: String!): ModelListingConnection`
- `listingsByOwner(ownerId: ID!): ModelListingConnection`

### Performance Requirements
- **Page Load Time**: < 3 seconds on 3G connection
- **Image Upload**: Progress indicator, max 5MB per image
- **Search Response**: < 500ms for filtered results
- **Database**: Handle 10,000+ concurrent users
- **CDN**: Global content delivery for images

### Security Requirements
- **Authentication**: Multi-factor authentication option
- **Data Protection**: PDPA 2010 compliance
- **Input Validation**: Server-side validation for all inputs
- **Image Upload**: Virus scanning and content moderation
- **Rate Limiting**: API protection against abuse

### Browser Support
- **Modern Browsers**: Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- **Mobile**: iOS Safari 12+, Chrome Mobile 70+
- **Progressive Web App**: Offline capability, push notifications

### Third-Party Integrations
- **Maps**: Google Maps API for location services
- **Communication**: WhatsApp Business API integration
- **Analytics**: Google Analytics 4, AWS CloudWatch
- **Monitoring**: Sentry for error tracking
- **CDN**: AWS CloudFront for global content delivery

---

## 📈 Success Metrics

### Business Metrics
**Growth Metrics:**
- Monthly Active Users (MAU)
- New User Registrations
- Listing Growth Rate
- Geographic Expansion

**Engagement Metrics:**
- User Session Duration
- Pages per Session
- Return User Rate
- Feature Adoption Rate

**Quality Metrics:**
- Listing Approval Rate
- User Satisfaction Score
- Support Ticket Volume
- Platform Uptime

### Product Metrics
**Conversion Funnel:**
- Visitor → Registration: Target 5%
- Registration → Profile Completion: Target 70%
- Profile → First Listing (Landlord): Target 60%
- Profile → First Inquiry (Tenant): Target 40%

**Feature Metrics:**
- Listing Creation Completion Rate: Target 85%
- Photo Upload Success Rate: Target 95%
- Search-to-Contact Rate: Target 15%
- Mobile vs Desktop Usage: Target 70% mobile

### Revenue Metrics (Future)
- Revenue per Active User
- Premium Subscription Rate
- Advertising Click-through Rate
- Average Revenue per Listing

---

## 🗓 Development Roadmap

### Phase 1: MVP Launch (Current - Month 3)
**Priority Features:**
- ✅ Complete Add Property/Listing feature
- ✅ Enhanced search and filtering
- ✅ Improved mobile experience
- ✅ Basic admin panel for listing moderation

**Success Criteria:**
- 500 active listings
- 2,000 registered users
- 70% listing completion rate
- < 3 second page load times

### Phase 2: Community Growth (Month 4-6)
**Features:**
- In-app messaging system
- User reviews and ratings
- Advanced search filters
- Property comparison tool
- Email notification system

**Success Criteria:**
- 2,000 active listings
- 10,000 registered users
- 50% monthly active user rate
- Geographic expansion to all major Sarawak cities

### Phase 3: Monetization (Month 7-9)
**Features:**
- Premium listing features
- Property management dashboard
- Analytics and insights
- Tenant screening tools
- Featured listing advertising

**Success Criteria:**
- 5,000 active listings
- 25,000 registered users
- First revenue generation
- Positive unit economics

### Phase 4: Scale & Expansion (Month 10-12)
**Features:**
- Mobile application (iOS/Android)
- AI-powered recommendations
- Virtual property tours
- Lease management tools
- API for property agents

**Success Criteria:**
- Market leadership in Sarawak
- Expansion to neighboring states
- Sustainable revenue model
- Strategic partnerships

---

## ⚠️ Risk Assessment

### Technical Risks
**High Priority:**
- **AWS Service Outages**: Mitigation through multi-AZ deployment
- **Database Performance**: Implement caching and optimization
- **Security Breaches**: Regular security audits and monitoring

**Medium Priority:**
- **Third-party Dependencies**: Maintain fallback options
- **Scalability Issues**: Monitor and scale proactively
- **Mobile Performance**: Continuous testing and optimization

### Business Risks
**High Priority:**
- **Competition**: Differentiate through local focus and free model
- **User Acquisition**: Multi-channel marketing strategy
- **Quality Control**: Automated and manual content moderation

**Medium Priority:**
- **Regulatory Changes**: Monitor and adapt to new regulations
- **Economic Downturns**: Recession-proof value proposition
- **User Trust**: Transparency and security measures

### Market Risks
**Medium Priority:**
- **Adoption Rate**: Education and onboarding programs
- **Cultural Resistance**: Community engagement and local partnerships
- **Seasonal Variations**: Plan for academic calendar impact

---

## 🎯 Next Steps & Implementation Priority

### Immediate Actions (Week 1-2)
1. **CRITICAL**: Implement Add Property/Listing feature
2. Update routing to include `/add-listing` page
3. Create comprehensive form validation
4. Set up S3 image upload functionality
5. Implement listing approval workflow

### Short Term (Month 1)
1. Enhanced mobile experience optimization
2. Advanced search and filtering
3. Improved listing management dashboard
4. Basic analytics implementation
5. User feedback collection system

### Medium Term (Month 2-3)
1. In-app messaging system
2. User verification and rating system
3. Geographic expansion marketing
4. Performance optimization
5. Community building initiatives

---

**Document Prepared By:** Biliku Development Team  
**Review Cycle:** Monthly  
**Next Review Date:** September 27, 2025

---

*This PRD serves as the single source of truth for Biliku platform development. All team members should refer to this document for feature specifications, user requirements, and business objectives.*