import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    first_name = models.CharField(max_length=50, verbose_name=_("ism"))
    last_name = models.CharField(max_length=50, verbose_name=_("familiya"))
    patronymic = models.CharField(max_length=50, null=True, blank=True, verbose_name=_("otasining ismi"))

    username = models.CharField(max_length=50, unique=True, verbose_name=_("foydalanuvchi nomi"))

    REQUIRED_FIELDS = ['first_name', 'last_name']
    USERNAME_FIELD = "username"

    class Meta:
        verbose_name = _("Foydalanuvchi")
        verbose_name_plural = _("Foydalanuvchilar")

    def __str__(self):
        full_name = f"{self.first_name} {self.last_name}".strip()
        return full_name if full_name else self.username