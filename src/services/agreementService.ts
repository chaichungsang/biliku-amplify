/**
 * Agreement Service for AWS Amplify GraphQL
 * 
 * This service handles rental agreement operations using AWS AppSync GraphQL API.
 * It maintains the same interface as the Vue Supabase agreement service.
 */

import { generateClient, type GraphQLResult } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';

import type {
  RentalAgreement,
  CreateRentalAgreementData,
  SignAgreementData,
  AgreementResponse,
  AgreementServiceInterface,
  PolicyTexts
} from '../types/agreement';

// GraphQL queries and mutations
const CREATE_RENTAL_AGREEMENT = /* GraphQL */ `
  mutation CreateRentalAgreement($input: CreateRentalAgreementInput!) {
    createRentalAgreement(input: $input) {
      id
      agreementId
      listingId
      landlordId
      tenantId
      propertyDetails
      rentalTerms
      tenancyPeriod
      termsConditions
      additionalClauses
      status
      landlordSignature
      tenantSignature
      landlordSignedAt
      tenantSignedAt
      fullySignedAt
      generatedAt
      updatedAt
      documentHtml
      documentPdfUrl
    }
  }
`;

const GET_AGREEMENT = /* GraphQL */ `
  query GetAgreement($id: ID!) {
    getAgreement(id: $id) {
      id
      agreementId
      listingId
      landlordId
      tenantId
      propertyDetails
      rentalTerms
      tenancyPeriod
      termsConditions
      additionalClauses
      status
      landlordSignature
      tenantSignature
      landlordSignedAt
      tenantSignedAt
      fullySignedAt
      generatedAt
      updatedAt
      documentHtml
      documentPdfUrl
    }
  }
`;

const LIST_USER_AGREEMENTS = /* GraphQL */ `
  query ListUserAgreements($filter: ModelAgreementFilterInput, $limit: Int, $nextToken: String) {
    listAgreements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        agreementId
        listingId
        landlordId
        tenantId
        propertyDetails
        rentalTerms
        tenancyPeriod
        termsConditions
        additionalClauses
        status
        landlordSignature
        tenantSignature
        landlordSignedAt
        tenantSignedAt
        fullySignedAt
        generatedAt
        updatedAt
        documentHtml
        documentPdfUrl
      }
      nextToken
    }
  }
`;

const UPDATE_AGREEMENT = /* GraphQL */ `
  mutation UpdateAgreement($input: UpdateRentalAgreementInput!) {
    updateRentalAgreement(input: $input) {
      id
      agreementId
      listingId
      landlordId
      tenantId
      propertyDetails
      rentalTerms
      tenancyPeriod
      termsConditions
      additionalClauses
      status
      landlordSignature
      tenantSignature
      landlordSignedAt
      tenantSignedAt
      fullySignedAt
      generatedAt
      updatedAt
      documentHtml
      documentPdfUrl
    }
  }
`;

const SIGN_AGREEMENT = /* GraphQL */ `
  mutation SignAgreement($agreementId: ID!, $signature: String!, $userId: ID!) {
    signAgreement(agreementId: $agreementId, signature: $signature, userId: $userId) {
      id
      agreementId
      status
      landlordSignature
      tenantSignature
      landlordSignedAt
      tenantSignedAt
      fullySignedAt
    }
  }
`;

/**
 * Agreement Service Class
 */
export class AgreementService implements AgreementServiceInterface {
  private client = generateClient();
  
  // Policy text mappings
  private policyTexts: PolicyTexts = {
    petPolicy: {
      'not_allowed': 'Pets are strictly not allowed on the premises.',
      'cats_only': 'Only cats are allowed with prior written consent from the landlord.',
      'small_pets': 'Small pets (cats, small dogs) are allowed with prior written consent and additional deposit.',
      'allowed': 'Pets are allowed with prior written consent from the landlord.'
    },
    smokingPolicy: {
      'not_allowed': 'Smoking is strictly prohibited inside the premises.',
      'designated_area': 'Smoking is only allowed in designated outdoor areas.',
      'allowed': 'Smoking is permitted in the premises.'
    },
    guestPolicy: {
      'not_allowed': 'Overnight guests are not permitted.',
      'limited': 'Overnight guests are allowed for a maximum of 3 nights per month with prior notice.',
      'approval_required': 'Overnight guests require prior written approval from the landlord.',
      'allowed': 'Guests are allowed with reasonable notice to the landlord.'
    },
    maintenancePolicy: {
      'tenant_all': 'Tenant is responsible for all maintenance and repairs.',
      'tenant_minor_landlord_major': 'Tenant is responsible for minor maintenance; landlord handles major repairs.',
      'landlord_all': 'Landlord is responsible for all maintenance and repairs.',
      'shared': 'Maintenance responsibilities are shared between tenant and landlord as per individual items.'
    }
  };

  /**
   * Get current authenticated user ID
   */
  private async getCurrentUserId(): Promise<string> {
    try {
      const user = await getCurrentUser();
      return user.userId;
    } catch (error) {
      throw new Error('User must be authenticated');
    }
  }

  /**
   * Generate unique agreement ID
   */
  private generateAgreementId(): string {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = Date.now().toString().slice(-4);
    return `AGR-${dateStr}-${timeStr}`;
  }

  /**
   * Create rental agreement
   */
  async createRentalAgreement(agreementData: CreateRentalAgreementData): Promise<AgreementResponse<RentalAgreement>> {
    try {
      const agreementId = this.generateAgreementId();
      
      // Prepare input for GraphQL
      const input = {
        agreementId,
        listingId: agreementData.listingId,
        landlordId: agreementData.landlordId,
        tenantId: agreementData.tenantId,
        propertyDetails: JSON.stringify(agreementData.propertyDetails),
        rentalTerms: JSON.stringify(agreementData.rentalTerms),
        tenancyPeriod: JSON.stringify(agreementData.tenancyPeriod),
        termsConditions: JSON.stringify(agreementData.termsConditions),
        additionalClauses: agreementData.additionalClauses || [],
        status: 'draft',
        generatedAt: new Date().toISOString()
      };

      // Generate HTML document
      const documentHtml = await this.generateAgreementHTML({
        ...input,
        id: '', // Will be set after creation
        propertyDetails: agreementData.propertyDetails,
        rentalTerms: agreementData.rentalTerms,
        tenancyPeriod: agreementData.tenancyPeriod,
        termsConditions: agreementData.termsConditions,
        documentHtml: '', // Will be updated
        generatedAt: new Date().toISOString()
      } as RentalAgreement);

      (input as any).documentHtml = documentHtml;

      const result: GraphQLResult<any> = await this.client.graphql({
        query: CREATE_RENTAL_AGREEMENT,
        variables: { input }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to create rental agreement');
      }

      const agreement = this.mapAgreementFromGraphQL(result.data?.createRentalAgreement);
      
      return {
        success: true,
        data: agreement
      };
    } catch (error: any) {
      console.error('Error creating rental agreement:', error);
      throw new Error(error.message || 'Failed to create rental agreement');
    }
  }

  /**
   * Get agreement by ID
   */
  async getAgreement(agreementId: string): Promise<RentalAgreement> {
    try {
      const result: GraphQLResult<any> = await this.client.graphql({
        query: GET_AGREEMENT,
        variables: { id: agreementId }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to fetch agreement');
      }

      const agreement = result.data?.getAgreement;
      if (!agreement) {
        throw new Error('Agreement not found');
      }

      return this.mapAgreementFromGraphQL(agreement);
    } catch (error: any) {
      console.error('Error fetching agreement:', error);
      throw new Error(error.message || 'Failed to fetch agreement');
    }
  }

  /**
   * Get user's agreements (as landlord or tenant)
   */
  async getUserAgreements(userId: string): Promise<RentalAgreement[]> {
    try {
      // Get agreements where user is either landlord or tenant
      const landlordFilter = {
        filter: {
          landlordId: { eq: userId }
        },
        limit: 100
      };

      const tenantFilter = {
        filter: {
          tenantId: { eq: userId }
        },
        limit: 100
      };

      const [landlordResult, tenantResult] = await Promise.all([
        this.client.graphql({
          query: LIST_USER_AGREEMENTS,
          variables: landlordFilter
        }),
        this.client.graphql({
          query: LIST_USER_AGREEMENTS,
          variables: tenantFilter
        })
      ]);

      const landlordAgreements = (landlordResult as any).data?.listAgreements?.items || [];
      const tenantAgreements = (tenantResult as any).data?.listAgreements?.items || [];

      // Combine and deduplicate
      const allAgreements = [...landlordAgreements, ...tenantAgreements];
      const uniqueAgreements = allAgreements.filter((agreement, index, self) => 
        index === self.findIndex(a => a.id === agreement.id)
      );

      return uniqueAgreements
        .map(agreement => this.mapAgreementFromGraphQL(agreement))
        .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());
    } catch (error: any) {
      console.error('Error fetching user agreements:', error);
      throw new Error(error.message || 'Failed to fetch user agreements');
    }
  }

  /**
   * Sign agreement
   */
  async signAgreement(agreementId: string, userId: string, signatureData: SignAgreementData): Promise<AgreementResponse<RentalAgreement>> {
    try {
      const result: GraphQLResult<any> = await this.client.graphql({
        query: SIGN_AGREEMENT,
        variables: {
          agreementId,
          signature: signatureData.signature,
          userId
        }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to sign agreement');
      }

      const signedAgreement = result.data?.signAgreement;
      const fullyExecuted = !!signedAgreement.fullySignedAt;

      return {
        success: true,
        data: this.mapAgreementFromGraphQL(signedAgreement),
        fullyExecuted
      };
    } catch (error: any) {
      console.error('Error signing agreement:', error);
      throw new Error(error.message || 'Failed to sign agreement');
    }
  }

  /**
   * Update agreement status
   */
  async updateAgreementStatus(agreementId: string, status: RentalAgreement['status'], userId: string): Promise<RentalAgreement> {
    try {
      const result: GraphQLResult<any> = await this.client.graphql({
        query: UPDATE_AGREEMENT,
        variables: {
          input: {
            id: agreementId,
            status,
            updatedAt: new Date().toISOString()
          }
        }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to update agreement status');
      }

      return this.mapAgreementFromGraphQL(result.data?.updateRentalAgreement);
    } catch (error: any) {
      console.error('Error updating agreement status:', error);
      throw new Error(error.message || 'Failed to update agreement status');
    }
  }

  /**
   * Generate Malaysian-compliant rental agreement HTML
   */
  async generateAgreementHTML(agreementData: RentalAgreement): Promise<string> {
    const template = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Rental Agreement - ${agreementData.agreementId}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .title { font-size: 18px; font-weight: bold; text-decoration: underline; }
            .section { margin: 20px 0; }
            .section-title { font-weight: bold; margin: 15px 0 10px 0; }
            .clause { margin: 10px 0; }
            .signature-section { margin-top: 60px; display: flex; justify-content: space-between; }
            .signature-block { width: 45%; }
            .signature-line { border-top: 1px solid #000; margin-top: 40px; padding-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            td { padding: 8px; border: 1px solid #ddd; }
            .amount { font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="title">RESIDENTIAL TENANCY AGREEMENT</div>
            <div>Agreement No: ${agreementData.agreementId}</div>
            <div>State of Sarawak, Malaysia</div>
        </div>

        <div class="section">
            <div class="section-title">PARTIES TO THE AGREEMENT</div>
            <div class="clause">
                This agreement is made between:
                <br><br>
                <strong>LANDLORD/OWNER:</strong> [Landlord Name]<br>
                NRIC: [Landlord NRIC]<br>
                Address: [Landlord Address]<br>
                Phone: [Landlord Phone]<br>
                Email: [Landlord Email]<br>
                <br>
                <strong>TENANT:</strong> [Tenant Name]<br>
                NRIC: [Tenant NRIC]<br>
                Phone: [Tenant Phone]<br>
                Email: [Tenant Email]<br>
            </div>
        </div>

        <div class="section">
            <div class="section-title">PROPERTY DETAILS</div>
            <div class="clause">
                <strong>Property:</strong> ${agreementData.propertyDetails.title}<br>
                <strong>Address:</strong> ${agreementData.propertyDetails.address}<br>
                <strong>Type:</strong> ${agreementData.propertyDetails.type}<br>
                ${agreementData.propertyDetails.size ? `<strong>Size:</strong> ${agreementData.propertyDetails.size}<br>` : ''}
            </div>
        </div>

        <div class="section">
            <div class="section-title">RENTAL TERMS</div>
            <table>
                <tr>
                    <td><strong>Monthly Rental</strong></td>
                    <td class="amount">RM ${agreementData.rentalTerms.monthlyRent.toFixed(2)}</td>
                </tr>
                <tr>
                    <td><strong>Security Deposit</strong></td>
                    <td class="amount">RM ${agreementData.rentalTerms.securityDeposit.toFixed(2)}</td>
                </tr>
                ${agreementData.rentalTerms.utilitiesDeposit && agreementData.rentalTerms.utilitiesDeposit > 0 ? `
                <tr>
                    <td><strong>Utilities Deposit</strong></td>
                    <td class="amount">RM ${agreementData.rentalTerms.utilitiesDeposit.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                    <td><strong>Advance Payment</strong></td>
                    <td>${agreementData.rentalTerms.advancePayment} month(s)</td>
                </tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">TENANCY PERIOD</div>
            <div class="clause">
                <strong>Commencement:</strong> ${new Date(agreementData.tenancyPeriod.startDate).toLocaleDateString()}<br>
                <strong>Expiry:</strong> ${new Date(agreementData.tenancyPeriod.endDate).toLocaleDateString()}<br>
                <strong>Duration:</strong> ${agreementData.tenancyPeriod.durationMonths} month(s)<br>
                <strong>Notice Period:</strong> ${agreementData.tenancyPeriod.noticePeriodDays} days
            </div>
        </div>

        <div class="section">
            <div class="section-title">TERMS AND CONDITIONS</div>
            
            <div class="clause">
                <strong>1. RENTAL PAYMENT:</strong> The monthly rental shall be paid in advance on or before the 1st day of each month.
            </div>

            <div class="clause">
                <strong>2. UTILITIES:</strong> 
                ${agreementData.termsConditions.utilitiesIncluded.length > 0 
                  ? `The following utilities are included in the rent: ${agreementData.termsConditions.utilitiesIncluded.join(', ')}.`
                  : 'All utilities are to be paid separately by the tenant.'}
            </div>

            <div class="clause">
                <strong>3. PETS:</strong> ${this.getPetPolicyText(agreementData.termsConditions.petPolicy)}
            </div>

            <div class="clause">
                <strong>4. SMOKING:</strong> ${this.getSmokingPolicyText(agreementData.termsConditions.smokingPolicy)}
            </div>

            <div class="clause">
                <strong>5. GUESTS:</strong> ${this.getGuestPolicyText(agreementData.termsConditions.guestPolicy)}
            </div>

            <div class="clause">
                <strong>6. MAINTENANCE:</strong> ${this.getMaintenancePolicyText(agreementData.termsConditions.maintenanceResponsibility)}
            </div>

            <div class="clause">
                <strong>7. TERMINATION:</strong> Either party may terminate this agreement by giving ${agreementData.tenancyPeriod.noticePeriodDays} days written notice.
            </div>

            ${agreementData.additionalClauses.map((clause, index) => `
                <div class="clause">
                    <strong>${index + 8}. ADDITIONAL CLAUSE:</strong> ${clause}
                </div>
            `).join('')}
        </div>

        <div class="section">
            <div class="section-title">GOVERNING LAW</div>
            <div class="clause">
                This agreement shall be governed by the laws of Malaysia and the State of Sarawak. Any disputes arising from this agreement shall be subject to the jurisdiction of the courts of Malaysia.
            </div>
        </div>

        <div class="signature-section">
            <div class="signature-block">
                <div><strong>LANDLORD</strong></div>
                <div class="signature-line" id="landlord-signature">
                    ${agreementData.landlordSignature ? '[Digitally Signed]' : '[Signature Required]'}
                </div>
                <div>Name: [Landlord Name]</div>
                <div>Date: ${agreementData.landlordSignedAt ? new Date(agreementData.landlordSignedAt).toLocaleDateString() : '_____________'}</div>
            </div>
            
            <div class="signature-block">
                <div><strong>TENANT</strong></div>
                <div class="signature-line" id="tenant-signature">
                    ${agreementData.tenantSignature ? '[Digitally Signed]' : '[Signature Required]'}
                </div>
                <div>Name: [Tenant Name]</div>
                <div>Date: ${agreementData.tenantSignedAt ? new Date(agreementData.tenantSignedAt).toLocaleDateString() : '_____________'}</div>
            </div>
        </div>

        <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
            <div>Generated by Biliku Platform on ${new Date().toLocaleDateString()}</div>
            <div>Agreement ID: ${agreementData.agreementId}</div>
        </div>
    </body>
    </html>
    `;
    
    return template;
  }

  /**
   * Get policy text for pet policy
   */
  private getPetPolicyText(policy: string): string {
    return this.policyTexts.petPolicy[policy as keyof typeof this.policyTexts.petPolicy] || 
           this.policyTexts.petPolicy.not_allowed;
  }

  /**
   * Get policy text for smoking policy
   */
  private getSmokingPolicyText(policy: string): string {
    return this.policyTexts.smokingPolicy[policy as keyof typeof this.policyTexts.smokingPolicy] || 
           this.policyTexts.smokingPolicy.not_allowed;
  }

  /**
   * Get policy text for guest policy
   */
  private getGuestPolicyText(policy: string): string {
    return this.policyTexts.guestPolicy[policy as keyof typeof this.policyTexts.guestPolicy] || 
           this.policyTexts.guestPolicy.limited;
  }

  /**
   * Get policy text for maintenance policy
   */
  private getMaintenancePolicyText(policy: string): string {
    return this.policyTexts.maintenancePolicy[policy as keyof typeof this.policyTexts.maintenancePolicy] || 
           this.policyTexts.maintenancePolicy.tenant_minor_landlord_major;
  }

  /**
   * Map GraphQL agreement data to RentalAgreement interface
   */
  private mapAgreementFromGraphQL(agreement: any): RentalAgreement {
    return {
      id: agreement.id,
      agreementId: agreement.agreementId,
      listingId: agreement.listingId,
      landlordId: agreement.landlordId,
      tenantId: agreement.tenantId,
      propertyDetails: typeof agreement.propertyDetails === 'string' 
        ? JSON.parse(agreement.propertyDetails) 
        : agreement.propertyDetails,
      rentalTerms: typeof agreement.rentalTerms === 'string' 
        ? JSON.parse(agreement.rentalTerms) 
        : agreement.rentalTerms,
      tenancyPeriod: typeof agreement.tenancyPeriod === 'string' 
        ? JSON.parse(agreement.tenancyPeriod) 
        : agreement.tenancyPeriod,
      termsConditions: typeof agreement.termsConditions === 'string' 
        ? JSON.parse(agreement.termsConditions) 
        : agreement.termsConditions,
      additionalClauses: agreement.additionalClauses || [],
      status: agreement.status,
      landlordSignature: agreement.landlordSignature,
      tenantSignature: agreement.tenantSignature,
      landlordSignedAt: agreement.landlordSignedAt,
      tenantSignedAt: agreement.tenantSignedAt,
      fullySignedAt: agreement.fullySignedAt,
      generatedAt: agreement.generatedAt,
      updatedAt: agreement.updatedAt,
      documentHtml: agreement.documentHtml,
      documentPdfUrl: agreement.documentPdfUrl
    };
  }
}

// Create singleton instance
export const agreementService = new AgreementService();
export default agreementService;