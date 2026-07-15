import { supabase } from '@/lib/supabase-client'
import type { SiteSettings } from '@/types/settings'

export const settingsService = {
  async getSettings(): Promise<SiteSettings | null> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single()

      if (error) {
        console.error('Error fetching settings:', error)
        return null
      }

      return mapSettingsFromDb(data)
    } catch (error) {
      console.error('Error in getSettings:', error)
      return null
    }
  },

  async upsertSettings(settings: Partial<SiteSettings>): Promise<SiteSettings | null> {
    try {
      const dbSettings = mapSettingsToDb(settings)

      const { data, error } = await supabase
        .from('site_settings')
        .upsert(dbSettings)
        .select()
        .single()

      if (error) {
        console.error('Error upserting settings:', error)
        return null
      }

      return mapSettingsFromDb(data)
    } catch (error) {
      console.error('Error in upsertSettings:', error)
      return null
    }
  },
}

function mapSettingsFromDb(data: any): SiteSettings {
  return {
    id: data.id,
    companyName: data.company_name,
    companyEmail: data.company_email,
    companyPhone: data.company_phone,
    companyAddress: data.company_address,
    companyCity: data.company_city,
    companyState: data.company_state,
    companyZipCode: data.company_zip_code,
    websiteUrl: data.website_url,
    logoUrl: data.logo_url,
    colorPrimary: data.color_primary,
    colorSecondary: data.color_secondary,
    termsOfService: data.terms_of_service,
    privacyPolicy: data.privacy_policy,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

function mapSettingsToDb(settings: Partial<SiteSettings>): any {
  return {
    company_name: settings.companyName,
    company_email: settings.companyEmail,
    company_phone: settings.companyPhone,
    company_address: settings.companyAddress,
    company_city: settings.companyCity,
    company_state: settings.companyState,
    company_zip_code: settings.companyZipCode,
    website_url: settings.websiteUrl,
    logo_url: settings.logoUrl,
    color_primary: settings.colorPrimary,
    color_secondary: settings.colorSecondary,
    terms_of_service: settings.termsOfService,
    privacy_policy: settings.privacyPolicy,
  }
}
