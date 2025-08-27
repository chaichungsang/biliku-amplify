/**
 * TypeScript interfaces for Add Listing wizard
 */

export interface AddListingFormData {
  // Step 1: Basic Information
  title: string;
  description: string;
  price: number | string;
  roomType: string;
  propertyType: string;

  // Step 2: Location Details
  address: string;
  city: string;
  neighborhood: string;
  landmarks: string;

  // Step 3: Property Specifications
  furnished: string; // 'fully', 'partially', 'unfurnished'
  bedrooms: number | string;
  bathrooms: number | string;
  squareFeet: number | string;
  floorLevel: string;

  // Step 4: Amenities & Features
  amenities: string[];
  hasAircon: boolean;
  hasWifi: boolean;
  hasSecurity: boolean;
  hasParking: boolean;
  hasKitchen: boolean;

  // Step 5: Rental Terms
  availableFrom: string;
  immediateAvailability: boolean;
  minimumLeaseDuration: number;
  maximumLeaseDuration?: number;
  securityDeposit: number;
  advanceRentalPayment: number;
  utilityDeposits: {
    electricity: number;
    water: number;
    internet: number;
  };
  utilityResponsibility: string;
  genderPreference: string;
  agePreference: string;
  occupationPreference: string;
  nationalityPreference: string;
  smokingPolicy: string;
  petPolicy: string;
  guestVisitorPolicy: string;
  partyNoisePolicy: string;
  curfewQuietHours: string;
  earlyTerminationPolicy: string;
  renewalOptions: string;
  noticePeriod: number;
  specialConditions: string;

  // Step 6: Photo Upload
  photos: File[];
  mainPhotoIndex: number;
  photoDescriptions: string[];

  // Step 7: Contact & Availability
  contactMethod: string[];
  viewingTimes: string[];
  responseTime: string;
  whatsappNumber: string;
  phoneNumber: string;
  emailContact: boolean;

  // Step 8: Review & Publish
  termsAccepted: boolean;
  privacyAccepted: boolean;
  publishImmediately: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface StepValidation {
  isValid: boolean;
  errors: ValidationErrors;
}

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isValid: boolean;
}

export interface AutoSaveData {
  formData: Partial<AddListingFormData>;
  lastSaved: string;
  stepCompleted: number;
}

export interface PhotoUpload {
  file: File;
  preview: string;
  description: string;
  isMain: boolean;
}

export interface ContactPreference {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export interface ViewingTimeSlot {
  id: string;
  label: string;
  description: string;
}

export interface FurnishedLevel {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export interface PropertyType {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export interface LeaseDuration {
  id: string;
  label: string;
  monthsMin: number;
  monthsMax?: number;
}

// Constants for form options
export const PROPERTY_TYPES: PropertyType[] = [
  { id: 'apartment', label: 'Apartment', description: 'Multi-story residential building', icon: null },
  { id: 'condo', label: 'Condominium', description: 'Private residential complex with facilities', icon: null },
  { id: 'house', label: 'Landed House', description: 'Independent house with land', icon: null },
  { id: 'townhouse', label: 'Townhouse', description: 'Multi-level attached housing', icon: null },
  { id: 'room_rental', label: 'Room Rental', description: 'Single room in shared property', icon: null },
  { id: 'studio', label: 'Studio', description: 'Open-plan single room unit', icon: null }
];

export const FURNISHED_LEVELS: FurnishedLevel[] = [
  { id: 'fully', label: 'Fully Furnished', description: 'All furniture and appliances included', icon: null },
  { id: 'partially', label: 'Partially Furnished', description: 'Basic furniture provided', icon: null },
  { id: 'unfurnished', label: 'Unfurnished', description: 'No furniture provided', icon: null }
];

export const LEASE_DURATIONS: LeaseDuration[] = [
  { id: 'flexible', label: 'Flexible (Month-to-month)', monthsMin: 1 },
  { id: 'short', label: 'Short Term (1-6 months)', monthsMin: 1, monthsMax: 6 },
  { id: 'medium', label: 'Medium Term (6-12 months)', monthsMin: 6, monthsMax: 12 },
  { id: 'long', label: 'Long Term (12+ months)', monthsMin: 12 },
  { id: 'student', label: 'Student Semester (4-5 months)', monthsMin: 4, monthsMax: 5 }
];

export const CONTACT_PREFERENCES: ContactPreference[] = [
  { id: 'whatsapp', label: 'WhatsApp', description: 'Instant messaging preferred', icon: null },
  { id: 'phone', label: 'Phone Call', description: 'Voice calls preferred', icon: null },
  { id: 'email', label: 'Email', description: 'Email communication preferred', icon: null },
  { id: 'platform', label: 'Biliku Platform', description: 'Contact through platform messaging', icon: null }
];

export const VIEWING_TIME_SLOTS: ViewingTimeSlot[] = [
  { id: 'weekday_morning', label: 'Weekday Mornings (9am-12pm)', description: 'Monday to Friday, 9am-12pm' },
  { id: 'weekday_afternoon', label: 'Weekday Afternoons (1pm-5pm)', description: 'Monday to Friday, 1pm-5pm' },
  { id: 'weekday_evening', label: 'Weekday Evenings (6pm-8pm)', description: 'Monday to Friday, 6pm-8pm' },
  { id: 'weekend_morning', label: 'Weekend Mornings (9am-12pm)', description: 'Saturday & Sunday, 9am-12pm' },
  { id: 'weekend_afternoon', label: 'Weekend Afternoons (1pm-5pm)', description: 'Saturday & Sunday, 1pm-5pm' },
  { id: 'weekend_evening', label: 'Weekend Evenings (6pm-8pm)', description: 'Saturday & Sunday, 6pm-8pm' },
  { id: 'flexible', label: 'Flexible Schedule', description: 'Available by appointment anytime' }
];

// Default form data
export const DEFAULT_FORM_DATA: AddListingFormData = {
  // Step 1
  title: '',
  description: '',
  price: '',
  roomType: '',
  propertyType: '',

  // Step 2
  address: '',
  city: '',
  neighborhood: '',
  landmarks: '',

  // Step 3
  furnished: '',
  bedrooms: '',
  bathrooms: '',
  squareFeet: '',
  floorLevel: '',

  // Step 4
  amenities: [],
  hasAircon: false,
  hasWifi: false,
  hasSecurity: false,
  hasParking: false,
  hasKitchen: false,

  // Step 5
  availableFrom: '',
  immediateAvailability: false,
  minimumLeaseDuration: 6,
  maximumLeaseDuration: undefined,
  securityDeposit: 2,
  advanceRentalPayment: 1,
  utilityDeposits: {
    electricity: 0,
    water: 0,
    internet: 0,
  },
  utilityResponsibility: 'tenant',
  genderPreference: 'any',
  agePreference: 'any',
  occupationPreference: 'any',
  nationalityPreference: 'any',
  smokingPolicy: 'not-allowed',
  petPolicy: 'not-allowed',
  guestVisitorPolicy: 'allowed',
  partyNoisePolicy: 'not-allowed',
  curfewQuietHours: 'none',
  earlyTerminationPolicy: 'notice-required',
  renewalOptions: 'negotiable',
  noticePeriod: 30,
  specialConditions: '',

  // Step 6
  photos: [],
  mainPhotoIndex: 0,
  photoDescriptions: [],

  // Step 7
  contactMethod: [],
  viewingTimes: [],
  responseTime: '',
  whatsappNumber: '',
  phoneNumber: '',
  emailContact: false,

  // Step 8
  termsAccepted: false,
  privacyAccepted: false,
  publishImmediately: true
};

// Wizard steps configuration
export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    title: 'Basic Information',
    description: 'Tell us about your property',
    isCompleted: false,
    isValid: false
  },
  {
    id: 2,
    title: 'Location Details',
    description: 'Where is your property located?',
    isCompleted: false,
    isValid: false
  },
  {
    id: 3,
    title: 'Property Specifications',
    description: 'Property details and specifications',
    isCompleted: false,
    isValid: false
  },
  {
    id: 4,
    title: 'Amenities & Features',
    description: 'What amenities does your property have?',
    isCompleted: false,
    isValid: false
  },
  {
    id: 5,
    title: 'Rental Terms',
    description: 'Set your rental terms and preferences',
    isCompleted: false,
    isValid: false
  },
  {
    id: 6,
    title: 'Photo Upload',
    description: 'Upload photos of your property',
    isCompleted: false,
    isValid: false
  },
  {
    id: 7,
    title: 'Contact & Availability',
    description: 'How can tenants reach you?',
    isCompleted: false,
    isValid: false
  },
  {
    id: 8,
    title: 'Review & Publish',
    description: 'Review and publish your listing',
    isCompleted: false,
    isValid: false
  }
];