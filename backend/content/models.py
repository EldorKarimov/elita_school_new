from django.db import models
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field

from core.models import BaseModel

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
    image = models.ImageField(upload_to='gallery/', verbose_name=_("Rasm"))
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
    main_image = models.ImageField(upload_to='news/main/', verbose_name=_("Asosiy rasm"))
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
    image = models.ImageField(upload_to='news/extra/', verbose_name=_("Rasm"))

    class Meta:
        verbose_name = _("Yangilik rasmi")
        verbose_name_plural = _("Yangilik rasmlari")

# --- BLOG ---
class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True, verbose_name=_("Tag nomi"))
    slug = models.SlugField(unique=True, verbose_name=_("Slug"))

    def __str__(self):
        return self.name

class Blog(BaseModel):
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    slug = models.SlugField(unique=True, verbose_name=_("Slug"))
    content = CKEditor5Field(verbose_name=_("Blog matni"), config_name='extends')
    image = models.ImageField(upload_to='blog/', verbose_name=_("Rasm"))
    author = models.CharField(max_length=100, verbose_name=_("Muallif"), default="Elita School")
    tags = models.ManyToManyField(Tag, blank=True, related_name='blogs')

    class Meta:
        verbose_name = _("Blog posti")
        verbose_name_plural = _("Bloglar")

    def __str__(self):
        return self.title