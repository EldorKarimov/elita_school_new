from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin
from .models import GalleryCategory, Gallery, NewsCategory, News, NewsImage, Tag, Blog

# --- REUSABLE MIXIN ---
class BaseContentAdmin(TranslationAdmin):
    """
    Tablarsiz, barcha tillarni bir vaqtda ko'rsatuvchi admin.
    """
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
class NewsImageInline(admin.TabularInline):
    model = NewsImage
    extra = 1
    fields = ('image', 'is_active')

# --- ADMIN CLASSES ---

@admin.register(GalleryCategory)
class GalleryCategoryAdmin(BaseContentAdmin):
    list_display = ('name_uz', 'is_active', 'uuid')
    # fieldsets orqali har bir tilni alohida chiqaramiz
    fieldsets = (
        (None, {
            'fields': ('name_uz', 'name_ru', 'name_en')
        }),
        (_('Holat'), {
            'fields': ('is_active', 'uuid'),
            'classes': ('collapse',),
        }),
    )

@admin.register(Gallery)
class GalleryAdmin(BaseContentAdmin):
    list_display = ('get_image', 'title_uz', 'category', 'is_active')
    fieldsets = (
        (_('Kategoriya'), {'fields': ('category',)}),
        (_('Sarlavha (Tillar bo\'yicha)'), {
            'fields': ('title_uz', 'title_ru', 'title_en')
        }),
        (_('Media'), {'fields': ('image',)}),
        (_('Holat'), {'fields': ('is_active', 'uuid')}),
    )

    def get_image(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="60" style="border-radius:5px;"/>')
        return "-"

@admin.register(NewsCategory)
class NewsCategoryAdmin(BaseContentAdmin):
    list_display = ('name_uz', 'slug', 'is_active')
    prepopulated_fields = {"slug": ("name_uz",)}
    fieldsets = (
        (_('Nomi'), {'fields': ('name_uz', 'name_ru', 'name_en')}),
        (_('SEO'), {'fields': ('slug',)}),
        (_('Holat'), {'fields': ('is_active', 'uuid')}),
    )

@admin.register(News)
class NewsAdmin(BaseContentAdmin):
    list_display = ('get_image', 'title_uz', 'category', 'views_count', 'is_active')
    prepopulated_fields = {"slug": ("title_uz",)}
    inlines = [NewsImageInline]
    
    fieldsets = (
        (_('Sarlavhalar'), {
            'fields': ('category', 'title_uz', 'title_ru', 'title_en', 'slug'),
        }),
        (_('Asosiy rasm'), {'fields': ('main_image',)}),
        (_('O\'zbekcha matn'), {'fields': ('content_uz',)}),
        (_('Ruscha matn'), {'fields': ('content_ru',), 'classes': ('collapse',)}),
        (_('Inglizcha matn'), {'fields': ('content_en',), 'classes': ('collapse',)}),
        (_('Statistika va Holat'), {
            'fields': ('views_count', 'is_active', 'uuid'),
        }),
    )

    def get_image(self, obj):
        if obj.main_image:
            return mark_safe(f'<img src="{obj.main_image.url}" width="60"/>')
        return "-"

@admin.register(Tag)
class TagAdmin(BaseContentAdmin):
    list_display = ('name_uz', 'slug', 'is_active')
    prepopulated_fields = {"slug": ("name_uz",)}
    fieldsets = (
        (_('Nomi'), {'fields': ('name_uz', 'name_ru', 'name_en', 'slug')}),
        (_('Holat'), {'fields': ('is_active', 'uuid')}),
    )

@admin.register(Blog)
class BlogAdmin(BaseContentAdmin):
    list_display = ('title_uz', 'author', 'is_active')
    filter_horizontal = ('tags',)
    prepopulated_fields = {"slug": ("title_uz",)}
    
    fieldsets = (
        (_('Asosiy ma\'lumotlar'), {
            'fields': ('author', 'tags', 'image', 'slug'),
        }),
        (_('Sarlavhalar'), {
            'fields': ('title_uz', 'title_ru', 'title_en'),
        }),
        (_('Maqola matni (UZ)'), {'fields': ('content_uz',)}),
        (_('Maqola matni (RU)'), {'fields': ('content_ru',), 'classes': ('collapse',)}),
        (_('Maqola matni (EN)'), {'fields': ('content_en',), 'classes': ('collapse',)}),
        (_('Qo\'shimcha'), {'fields': ('is_active', 'uuid')}),
    )