// Rental Agreement types for legal document management

export interface PropertyDetails {
  title: string;
  address: string;
  type: string;
  size?: string;
}

export interface RentalTerms {
  monthlyRent: number;
  securityDeposit: number;
  utilitiesDeposit?: number;
  advancePayment: number; // Number of months paid in advance
}

export interface TenancyPeriod {
  startDate: string;
  endDate: string;
  durationMonths: number;
  noticePeriodDays: number;
}

export interface TermsConditions {
  utilitiesIncluded: string[];
  petPolicy: 'not_allowed' | 'cats_only' | 'small_pets' | 'allowed';
  smokingPolicy: 'not_allowed' | 'designated_area' | 'allowed';
  guestPolicy: 'not_allowed' | 'limited' | 'approval_required' | 'allowed';
  maintenanceResponsibility: 'tenant_all' | 'tenant_minor_landlord_major' | 'landlord_all' | 'shared';
}

export interface RentalAgreement {
  id: string;
  agreementId: string;
  listingId: string;
  landlordId: string;
  tenantId: string;
  propertyDetails: PropertyDetails;
  rentalTerms: RentalTerms;
  tenancyPeriod: TenancyPeriod;
  termsConditions: TermsConditions;
  additionalClauses: string[];
  status: 'draft' | 'pending_signatures' | 'active' | 'completed' | 'terminated';
  landlordSignature?: string;
  tenantSignature?: string;
  landlordSignedAt?: string;
  tenantSignedAt?: string;
  fullySignedAt?: string;
  generatedAt: string;
  updatedAt?: string;
  documentHtml: string;
  documentPdfUrl?: string;
}

export interface CreateRentalAgreementData {
  listingId: string;
  landlordId: string;
  tenantId: string;
  propertyDetails: PropertyDetails;
  rentalTerms: RentalTerms;
  tenancyPeriod: TenancyPeriod;
  termsConditions: TermsConditions;
  additionalClauses?: string[];
}

export interface SignAgreementData {
  signature: string;
  signedAt?: string;
}

export interface AgreementResponse<T = any> {
  success: boolean;
  data: T;
  fullyExecuted?: boolean;
}

export interface AgreementLog {
  id: string;
  agreementId: string;
  userId: string;
  action: string;
  message: string;
  createdAt: string;
}

// Policy text mappings for display
export interface PolicyTexts {
  petPolicy: {
    not_allowed: string;
    cats_only: string;
    small_pets: string;
    allowed: string;
  };
  smokingPolicy: {
    not_allowed: string;
    designated_area: string;
    allowed: string;
  };
  guestPolicy: {
    not_allowed: string;
    limited: string;
    approval_required: string;
    allowed: string;
  };
  maintenancePolicy: {
    tenant_all: string;
    tenant_minor_landlord_major: string;
    landlord_all: string;
    shared: string;
  };
}

// Service interface
export interface AgreementServiceInterface {
  createRentalAgreement: (data: CreateRentalAgreementData) => Promise<AgreementResponse<RentalAgreement>>;
  getAgreement: (agreementId: string) => Promise<RentalAgreement>;
  getUserAgreements: (userId: string) => Promise<RentalAgreement[]>;
  signAgreement: (agreementId: string, userId: string, signatureData: SignAgreementData) => Promise<AgreementResponse<RentalAgreement>>;
  updateAgreementStatus: (agreementId: string, status: RentalAgreement['status'], userId: string) => Promise<RentalAgreement>;
  generateAgreementHTML: (agreementData: RentalAgreement) => Promise<string>;
}