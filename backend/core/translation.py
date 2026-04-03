from modeltranslation.translator import register, TranslationOptions
from .models import SiteSettings


@register(SiteSettings)
class SiteSettingsTranslationOptions(TranslationOptions):
    fields = ('name', 'slogan', 'address', 'reception')
    required_languages = ('uz',)
