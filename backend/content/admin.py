from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin
from .models import GalleryCategory, Gallery, NewsCategory, News, NewsImage, Tag, BlogCategory, Blog, FAQ, SchoolHighlight

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
    readonly_fields = ('uuid', 'views_count')
    
    fieldsets = (
        (_('Sarlavhalar'), {
            'fields': ('category', 'title_uz', 'title_ru', 'title_en', 'slug'),
        }),
        (_('Asosiy rasm'), {'fields': ('main_image',)}),
        (_('O\'zbekcha matn'), {'fields': ('content_uz',)}),
        (_('Ruscha matn'), {'fields': ('content_ru',), 'classes': ('collapse',)}),
        (_('Inglizcha matn'), {'fields': ('content_en',), 'classes': ('collapse',)}),
        (_('Statistika va Holat'), {
            'fields': ('publish_date', 'views_count', 'is_active', 'uuid'),
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

@admin.register(BlogCategory)
class BlogCategoryAdmin(BaseContentAdmin):
    list_display = ('name_uz', 'slug', 'is_active')
    prepopulated_fields = {"slug": ("name_uz",)}
    fieldsets = (
        (_('Nomi'), {'fields': ('name_uz', 'name_ru', 'name_en')}),
        (_('SEO'), {'fields': ('slug',)}),
        (_('Holat'), {'fields': ('is_active', 'uuid')}),
    )


@admin.register(Blog)
class BlogAdmin(BaseContentAdmin):
    list_display = ('title_uz', 'category', 'author', 'is_active')
    list_filter = ('is_active', 'category', 'created_at')
    filter_horizontal = ('tags',)
    prepopulated_fields = {"slug": ("title_uz",)}

    fieldsets = (
        (_('Asosiy ma\'lumotlar'), {
            'fields': ('category', 'author', 'tags', 'image', 'slug'),
        }),
        (_('Sarlavhalar'), {
            'fields': ('title_uz', 'title_ru', 'title_en'),
        }),
        (_('Maqola matni (UZ)'), {'fields': ('content_uz',)}),
        (_('Maqola matni (RU)'), {'fields': ('content_ru',), 'classes': ('collapse',)}),
        (_('Maqola matni (EN)'), {'fields': ('content_en',), 'classes': ('collapse',)}),
        (_('Qo\'shimcha'), {'fields': ('is_active', 'uuid')}),
    )


@admin.register(SchoolHighlight)
class SchoolHighlightAdmin(BaseContentAdmin):
    list_display = ('get_preview', 'title_uz', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    ordering = ('order',)

    fieldsets = (
        (_('Sarlavha'), {'fields': ('title_uz', 'title_ru', 'title_en')}),
        (_('Video'), {'fields': ('youtube_link',)}),
        (_('Sozlamalar'), {'fields': ('order', 'is_active', 'uuid')}),
    )

    def get_preview(self, obj):
        import re
        m = re.search(r'(?:youtube\.com/(?:watch\?v=|shorts/)|youtu\.be/)([a-zA-Z0-9_-]{11})', obj.youtube_link or '')
        if m:
            vid = m.group(1)
            return mark_safe(f'<img src="https://img.youtube.com/vi/{vid}/default.jpg" width="80" style="border-radius:4px;"/>')
        return '-'
    get_preview.short_description = _("Preview")


@admin.register(FAQ)
class FAQAdmin(BaseContentAdmin):
    list_display = ('question_uz', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    ordering = ('order',)

    fieldsets = (
        (_('Savol va Javob (UZ)'), {'fields': ('question_uz', 'answer_uz')}),
        (_('Savol va Javob (RU)'), {'fields': ('question_ru', 'answer_ru'), 'classes': ('collapse',)}),
        (_('Savol va Javob (EN)'), {'fields': ('question_en', 'answer_en'), 'classes': ('collapse',)}),
        (_('Sozlamalar'), {'fields': ('order', 'is_active', 'uuid')}),
    )