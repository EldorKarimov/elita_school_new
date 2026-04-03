from django.db import models
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field

from core.models import BaseModel
from school.models import Teacher

# --- GALLERY ---
class GalleryCategory(BaseModel):
    name = models.CharField(max_length=100, verbose_name=_("Kategoriya nomi"))

    class Meta:
        verbose_name = _("Galereya kategoriyasi")
        verbose_name_plural = _("Galereya kategoriyalari")

    def __str__(self):
        return self.name

class Gallery(BaseModel):
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"), blank=True)
    image = models.ImageField(
        upload_to='gallery/',
        verbose_name=_("Rasm"),
        help_text=_("Tavsiya etilgan o'lcham: 1200×800 px. Nisbat: 3:2. Fayl: JPG yoki PNG, max 3 MB.")
    )
    category = models.ForeignKey(GalleryCategory, on_delete=models.CASCADE, related_name='images')

    class Meta:
        verbose_name = _("Foto")
        verbose_name_plural = _("Galereya")

# --- NEWS ---
class NewsCategory(BaseModel):
    name = models.CharField(max_length=100, verbose_name=_("Kategoriya nomi"))
    slug = models.SlugField(unique=True, verbose_name=_("Slug"))

    class Meta:
        verbose_name = _("Yangilik kategoriyasi")
        verbose_name_plural = _("Yangilik kategoriyalari")

    def __str__(self):
        return self.name

class News(BaseModel):
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    slug = models.SlugField(unique=True, verbose_name=_("Slug"))
    content = CKEditor5Field(verbose_name=_("Maqola matni"), config_name='extends')
    main_image = models.ImageField(
        upload_to='news/main/',
        verbose_name=_("Asosiy rasm"),
        help_text=_("Tavsiya etilgan o'lcham: 1200×630 px. Nisbat: 16:9 (OG image). Fayl: JPG yoki PNG, max 2 MB.")
    )
    category = models.ForeignKey(NewsCategory, on_delete=models.SET_NULL, null=True, related_name='news')
    views_count = models.PositiveIntegerField(default=0, verbose_name=_("Ko'rishlar soni"))
    publish_date = models.DateField(_("Sana"))

    class Meta:
        verbose_name = _("Yangilik")
        verbose_name_plural = _("Yangiliklar")
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class NewsImage(BaseModel):
    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name='additional_images')
    image = models.ImageField(
        upload_to='news/extra/',
        verbose_name=_("Rasm"),
        help_text=_("Tavsiya etilgan o'lcham: 1200×800 px. Nisbat: 3:2. Fayl: JPG yoki PNG, max 2 MB.")
    )

    class Meta:
        verbose_name = _("Yangilik rasmi")
        verbose_name_plural = _("Yangilik rasmlari")

# --- BLOG ---
class BlogCategory(BaseModel):
    name = models.CharField(max_length=100, verbose_name=_("Kategoriya nomi"))
    slug = models.SlugField(unique=True, verbose_name=_("Slug"))

    class Meta:
        verbose_name = _("Blog kategoriyasi")
        verbose_name_plural = _("Blog kategoriyalari")

    def __str__(self):
        return self.name


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True, verbose_name=_("Tag nomi"))
    slug = models.SlugField(unique=True, verbose_name=_("Slug"))

    def __str__(self):
        return self.name

class Blog(BaseModel):
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    slug = models.SlugField(unique=True, verbose_name=_("Slug"))
    content = CKEditor5Field(verbose_name=_("Blog matni"), config_name='extends')
    image = models.ImageField(
        upload_to='blog/',
        verbose_name=_("Rasm"),
        help_text=_("Tavsiya etilgan o'lcham: 1200×630 px. Nisbat: 16:9. Fayl: JPG yoki PNG, max 2 MB.")
    )
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='blogs', verbose_name=_("Kategoriya"))
    author = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True, related_name='blogs', verbose_name=_("Muallif"))
    tags = models.ManyToManyField(Tag, blank=True, related_name='blogs')

    class Meta:
        verbose_name = _("Blog posti")
        verbose_name_plural = _("Bloglar")

    def __str__(self):
        return self.title


# --- SCHOOL HIGHLIGHTS ---
class SchoolHighlight(BaseModel):
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    youtube_link = models.URLField(verbose_name=_("YouTube havola"), help_text=_("YouTube Shorts yoki oddiy video havolasi"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Tartib"))

    class Meta:
        verbose_name = _("Maktab lavhasi")
        verbose_name_plural = _("Maktab lavhalari")
        ordering = ['order', 'created_at']

    def __str__(self):
        return self.title


# --- FAQ ---
class FAQ(BaseModel):
    question = models.CharField(max_length=500, verbose_name=_("Savol"))
    answer = models.TextField(verbose_name=_("Javob"))
    order = models.PositiveIntegerField(default=0, verbose_name=_("Tartib"))

    class Meta:
        verbose_name = _("Ko'p so'raladigan savol")
        verbose_name_plural = _("Ko'p so'raladigan savollar")
        ordering = ['order', 'created_at']

    def __str__(self):
        return self.question