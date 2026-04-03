from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TabbedTranslationAdmin
from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        (_("Umumiy"), {
            'fields': (
                'name_uz', 'name_ru', 'name_en', 
                'slogan_uz', 'slogan_ru', 'slogan_en',
                'logo', 'hero_video'
            )
        }),
        (_("Aloqa"), {
            'fields': (
                'address_uz', 'address_ru', 'address_en', 'main_phone', 'other_phone', 'email',
                'reception_uz', 'reception_ru', 'reception_en'
            )
        }),
        (_("Ijtimoiy tarmoqlar"), {
            'fields': ('telegram', 'instagram', 'youtube', 'facebook')
        }),
    )

    def has_add_permission(self, request):
        # Faqat bitta SiteSettings yozuvi bo'lishi kerak
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
