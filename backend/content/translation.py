from modeltranslation.translator import register, TranslationOptions
from .models import GalleryCategory, Gallery, NewsCategory, News, Tag, Blog

@register(GalleryCategory)
class GalleryCategoryTranslationOptions(TranslationOptions):
    fields = ('name',)
    required_languages = ('uz',)

@register(Gallery)
class GalleryTranslationOptions(TranslationOptions):
    fields = ('title',)
    required_languages = ('uz',)


@register(NewsCategory)
class NewsCategoryTranslationOptions(TranslationOptions):
    fields = ('name',)
    required_languages = ('uz',)

@register(News)
class NewsTranslationOptions(TranslationOptions):
    fields = ('title', 'content')
    required_languages = ('uz',)

@register(Tag)
class TagTranslationOptions(TranslationOptions):
    fields = ('name',)
    required_languages = ('uz',)

@register(Blog)
class BlogTranslationOptions(TranslationOptions):
    fields = ('title', 'content')
    required_languages = ('uz',)