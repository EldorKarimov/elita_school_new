from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = ('username', 'get_full_name_with_patronymic', 'email', 'is_staff', 'is_active')
    list_editable = ('is_active',)
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('username', 'first_name', 'last_name', 'patronymic', 'email')

    ordering = ('username',)

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Shaxsiy ma\'lumotlar'), {'fields': ('first_name', 'last_name', 'patronymic', 'email')}),
        (_('Huquqlar'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Muhim sanalar'), {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name', 'patronymic', 'email'),
        }),
    )

    @admin.display(description=_("To'liq ism (Sharifi bilan)"))
    def get_full_name_with_patronymic(self, obj):
        """Admin ro'yxatida to'liq ismni sharifi bilan ko'rsatish"""
        full_name = f"{obj.last_name} {obj.first_name}"
        if obj.patronymic:
            full_name += f" {obj.patronymic}"
        return full_name.strip()