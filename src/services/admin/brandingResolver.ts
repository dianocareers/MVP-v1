import { Organization, TenantBranding } from '@/types/database';

/**
 * Service to resolve tenant branding and terminology.
 */
export class BrandingResolver {
  /**
   * Fetches branding configuration for a given organization.
   * In production, this would fetch from Supabase 'organizations' table.
   */
  public async getBranding(orgId: string): Promise<TenantBranding> {
    // Mock branding for Diano Careers B2B demonstration
    return {
      primaryColor: '#3b82f6', // Corporate Blue
      secondaryColor: '#1e293b', // Slate
      logoUrl: '/logos/default-tenant.png',
      terminologyOverrides: {
        'assessment': 'Career Diagnostic',
        'coach': 'Mentor',
        'growth-plan': 'Development Roadmap'
      }
    };
  }

  /**
   * Generates CSS variables for dynamic theming based on branding config.
   */
  public generateCssVariables(branding: TenantBranding): string {
    return `
      :root {
        --tenant-primary: ${branding.primaryColor};
        --tenant-secondary: ${branding.secondaryColor};
        --tenant-logo: url('${branding.logoUrl}');
      }
    `;
  }
}

export const brandingResolver = new BrandingResolver();
