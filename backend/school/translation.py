from modeltranslation.translator import register, TranslationOptions
from .models import Science, Teacher, LessonExample, About, Statistic

@register(Science)
class ScienceTranslationOptions(TranslationOptions):
    fields = ('name',)
    required_languages = ('uz', )

@register(Teacher)
class TeacherTranslationOptions(TranslationOptions):
    fields = ('experience', 'about', 'position')
    required_languages = ('uz', )

@register(LessonExample)
class LessonExampleTranslationOptions(TranslationOptions):
    fields = ('title',)
    required_languages = ('uz', )

@register(About)
class AboutTranslationOptions(TranslationOptions):
    fields = ('content',)
    required_languages = ('uz', )

@register(Statistic)
class StatisticTranslationOptions(TranslationOptions):
    fields = ('label',)
    required_languages = ('uz', )