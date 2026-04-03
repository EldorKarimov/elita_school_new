from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid

from .validators import validate_video_size

class BaseModel(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("yaratilgan vaqt"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("yangilangan vaqt"))
    is_active = models.BooleanField(default=True, verbose_name=_("aktivmi"))

    class Meta:
        abstract = True


class SiteSettings(BaseModel):
    name = models.CharField(max_length=50, default=_("ELITA AKADEMIK"), verbose_name=_("Maktab nomi"))
    slogan = models.CharField(max_length=50, default=_("Ilmdan o'zga najot yo'q"), verbose_name=_("Maktab shiori"))
    logo = models.ImageField(
        upload_to="core/site-settings/logo",
        verbose_name=_("Logo")
    )
    instagram = models.URLField(null=True, blank=True)
    telegram = models.URLField(null=True, blank=True)
    youtube = models.URLField(null=True, blank=True)
    facebook = models.URLField(null=True, blank=True)

    address = models.CharField(max_length=255, verbose_name=_("Manzil"))
    email = models.EmailField(null=True, blank=True)
    main_phone = models.CharField(max_length=20, verbose_name=_("Asosiy telefon"))
    other_phone = models.CharField(max_length=20, verbose_name=_("Qo'shimcha telefon"))

    hero_video = models.FileField(
        upload_to="core/site-settings/files",
        validators=[validate_video_size],
        verbose_name=_("Video")
    )
    reception = models.CharField(max_length=50, default=_("Dushanba-Juma: 8:30 - 16:30"), verbose_name="Qabul vaqti")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Sayt sozlamasi")
        verbose_name_plural = _("Sayt sozlamalari")