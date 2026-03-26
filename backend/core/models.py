from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid

class BaseModel(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("yaratilgan vaqt"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("yangilangan vaqt"))
    is_active = models.BooleanField(default=True, verbose_name=_("aktivmi"))

    class Meta:
        abstract = True