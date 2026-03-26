from django.utils.translation import gettext_lazy as _

LANGUAGE_CODE = 'uz'

TIME_ZONE = 'Asia/Tashkent'

USE_I18N = True
USE_TZ = True

# Sayt qaysi tillarda ishlashi
LANGUAGES = (
    ('uz', _('Uzbek')),
    ('ru', _('Russian')),
    ('en', _('English')),
)

# Modeltranslation uchun default til
MODELTRANSLATION_DEFAULT_LANGUAGE = 'uz'

# Tarjima qilinadigan tillar ro'yxati (bu modeltranslation kutubxonasini optimallashtiradi)
MODELTRANSLATION_LANGUAGES = ('uz', 'ru', 'en')
MODELTRANSLATION_CUSTOM_FIELDS = ('CKEditor5Field',)