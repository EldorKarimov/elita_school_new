from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin
from .models import Science, Teacher, LessonExample, Schedule, About, Statistic, Contact

# --- REUSABLE MIXIN ---
class BaseSchoolAdmin(TranslationAdmin):
    list_filter = ('is_active', 'created_at')
    readonly_fields = ('uuid', 'created_at', 'updated_at')
    
    @admin.action(description=_("Tanlanganlarni aktivlashtirish"))
    def make_active(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description=_("Tanlanganlarni deaktivlashtirish"))
    def make_inactive(self, request, queryset):
        queryset.update(is_active=False)
    
    actions = [make_active, make_inactive]

# --- INLINES ---
class LessonExampleInline(admin.StackedInline):
    model = LessonExample
    extra = 1
    fields = ('title_uz', 'title_ru', 'title_en', 'youtube_link', 'is_active')


class ScheduleInline(admin.TabularInline):
    model = Schedule
    extra = 1


# --- ADMIN CLASSES ---

@admin.register(Science)
class ScienceAdmin(BaseSchoolAdmin):
    list_display = ('name_uz', 'is_active', 'uuid')
    search_fields = ('name_uz', 'name_ru', 'name_en')
    fieldsets = (
        (None, {'fields': ('name_uz', 'name_ru', 'name_en')}),
        (_('Holat'), {'fields': ('is_active', 'uuid')}),
    )

@admin.register(Teacher)
class TeacherAdmin(BaseSchoolAdmin):
    list_display = ('get_image', 'full_name', 'position_uz', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('full_name_uz', 'full_name_ru', 'full_name_en', 'phone')
    filter_horizontal = ('sciences',) # Fanlarni tanlash oson bo'lishi uchun
    inlines = [LessonExampleInline, ScheduleInline]
    
    fieldsets = (
        (_('Asosiy ma\'lumotlar'), {
            'fields': ('full_name', 'image', 'sciences', 'type', 'degree')
        }),
        (_('Kasbiy ma\'lumotlar'), {
            'fields': ('position_uz', 'position_ru', 'position_en', 'experience_uz', 'experience_ru', 'experience_en', 'order')
        }),
        (_('Aloqa va Batafsil'), {
            'fields': ('phone', 'about_uz', 'about_ru', 'about_en')
        }),
        (_('Tizim'), {'fields': ('is_active', 'uuid'), 'classes': ('collapse',)}),
    )

    def get_image(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="50" height="50" style="object-fit:cover; border-radius:50%;"/>')
        return "-"
    get_image.short_description = _("Rasm")



@admin.register(About)
class AboutAdmin(BaseSchoolAdmin):
    list_display = ('uuid', 'is_active', 'updated_at')
    fieldsets = (
        (_('Matnli kontent'), {'fields': ('content_uz', 'content_ru', 'content_en')}),
        (_('Media (Galereya)'), {'fields': ('photo1', 'photo2', 'photo3')}),
        (_('Holat'), {'fields': ('is_active', 'uuid')}),
    )

@admin.register(Statistic)
class StatisticAdmin(BaseSchoolAdmin):
    list_display = ('label_uz', 'value', 'is_active')
    fieldsets = (
        (None, {'fields': ('label_uz', 'label_ru', 'label_en', 'value')}),
        (_('Holat'), {'fields': ('is_active', 'uuid')}),
    )

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'subject', 'created_at', 'is_active')
    readonly_fields = ('full_name', 'phone', 'subject', 'message', 'uuid', 'created_at')
    search_fields = ('full_name', 'phone', 'subject')
    
    # Kontaktlarni admin o'zgartira olmasligi kerak, faqat ko'rishi va o'chirishi mumkin
    def has_add_permission(self, request): return False