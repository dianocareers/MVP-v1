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
      primary_color: '#3b82f6', // Corporate Blue
      secondary_color: '#1e293b', // Slate
      logo_url: '/logos/default-tenant.png',
      terminology_overrides: {
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
        --tenant-primary: ${branding.primary_color};
        --tenant-secondary: ${branding.secondary_color};
        --tenant-logo: url('${branding.logo_url}');
      }
    `;
  }
}

export const brandingResolver = new BrandingResolver();
