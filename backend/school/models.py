from django.db import models
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field
from core.models import BaseModel

# --- FANLAR (SCIENCES) ---
class Science(BaseModel):
    name = models.CharField(max_length=100, verbose_name=_("Fan nomi"))

    class Meta:
        verbose_name = _("Fan")
        verbose_name_plural = _("Fanlar")

    def __str__(self):
        return self.name

# --- O'QITUVCHILAR (TEACHERS) ---
class Teacher(BaseModel):
    class TeacherType(models.TextChoices):
        MANAGEMENT = 'management', _("Rahbariyat")
        TEACHER = 'teacher', _("O'qituvchi")

    class DegreeType(models.TextChoices):
        BACHELOR = 'bachelor', _("Bakalavr")
        MASTER = 'master', _("Magistr")
        PHD = 'phd', _("Fan nomzodi (PhD)")
        DOCTOR = 'doctor', _("Fan doktori (DSc)")
        NONE = 'none', _("Mavjud emas")

    type = models.CharField(
        max_length=20, 
        choices=TeacherType.choices, 
        default=TeacherType.TEACHER,
        verbose_name=_("Xodim turi")
    )

    degree = models.CharField(
        max_length=20, 
        choices=DegreeType.choices, 
        default=DegreeType.BACHELOR,
        verbose_name=_("Ilmiy darajasi")
    )
    
    full_name = models.CharField(max_length=255, verbose_name=_("To'liq ism"))
    image = models.ImageField(
        upload_to='school/teachers/',
        verbose_name=_("Rasm"),
        help_text=_("Tavsiya etilgan o'lcham: 600×800 px. Nisbat: 3:4 (portret). Fayl: JPG yoki PNG, max 2 MB.")
    )
    experience = models.CharField(max_length=100, verbose_name=_("Tajriba"))
    phone = models.CharField(max_length=20, verbose_name=_("Telefon"), blank=True)
    sciences = models.ManyToManyField(
        Science,
        related_name='teachers',
        null=True,
        blank=True,
        verbose_name=_("Dars beradigan fanlari")
    )
    about = CKEditor5Field(verbose_name=_("O'qituvchi haqida"), config_name='extends')
    order = models.PositiveIntegerField(default=0, verbose_name=_("Tartib raqami"))
    position = models.CharField(max_length=150, verbose_name=_("Lavozimi"), blank=True)
    

    class Meta:
        verbose_name = _("Xodim")
        verbose_name_plural = _("Xodimlar")
        ordering = ['order']

    def __str__(self):
        return self.full_name

# --- DARS NAMUNALARI (LESSON EXAMPLES) ---
class LessonExample(BaseModel):
    title = models.CharField(max_length=255, verbose_name=_("Mavzu nomi"))
    youtube_link = models.URLField(verbose_name=_("YouTube havola"))
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='lessons', verbose_name=_("O'qituvchi"))

    class Meta:
        verbose_name = _("Dars namunasi")
        verbose_name_plural = _("Dars namunalari")

# --- DARS JADVALI (SCHEDULE) ---
class Schedule(BaseModel):
    class WeekDay(models.TextChoices):
        MONDAY = 'mon', _("Dushanba")
        TUESDAY = 'tue', _("Seshanba")
        WEDNESDAY = 'wed', _("Chorshanba")
        THURSDAY = 'thu', _("Payshanba")
        FRIDAY = 'fri', _("Juma")
        SATURDAY = 'sat', _("Shanba")
        SUNDAY = 'sun', _("Yakshanba")

    weekday = models.CharField(max_length=3, choices=WeekDay.choices, verbose_name=_("Hafta kuni"))
    start_time = models.TimeField(verbose_name=_("Boshlanish vaqti"))
    end_time = models.TimeField(verbose_name=_("Tugash vaqti"))
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='schedules', verbose_name=_("O'qituvchi"))


    class Meta:
        verbose_name = _("Ish vaqti")
        verbose_name_plural = _("Ish vaqtlari")

# --- MAKTAB HAQIDA (ABOUT) ---
class About(BaseModel):
    content = CKEditor5Field(verbose_name=_("Maktab haqida matn"), config_name='extends')
    photo1 = models.ImageField(
        upload_to='school/about/',
        verbose_name=_("Rasm 1"),
        help_text=_("Tavsiya etilgan o'lcham: 800×600 px. Nisbat: 4:3 (gorizontal). Fayl: JPG yoki PNG, max 2 MB.")
    )
    photo2 = models.ImageField(
        upload_to='school/about/',
        blank=True, null=True,
        verbose_name=_("Rasm 2"),
        help_text=_("Tavsiya etilgan o'lcham: 800×600 px. Nisbat: 4:3 (gorizontal). Fayl: JPG yoki PNG, max 2 MB.")
    )
    photo3 = models.ImageField(
        upload_to='school/about/',
        blank=True, null=True,
        verbose_name=_("Rasm 3"),
        help_text=_("Tavsiya etilgan o'lcham: 800×600 px. Nisbat: 4:3 (gorizontal). Fayl: JPG yoki PNG, max 2 MB.")
    )

    class Meta:
        verbose_name = _("Maktab haqida")
        verbose_name_plural = _("Maktab haqida")

# --- STATISTIKA (STATISTICS) ---
class Statistic(BaseModel):
    label = models.CharField(
        max_length=100,
        help_text=_("Masalan: O'quvchilar soni"),
        verbose_name=_("Nomi")
    )
    value = models.PositiveIntegerField(verbose_name=_("Qiymati (Soni)"))

    class Meta:
        verbose_name = _("Statistika")
        verbose_name_plural = _("Statistikalar")

# --- KONTAKTLAR (CONTACT) ---
class Contact(BaseModel):
    full_name = models.CharField(max_length=255, verbose_name=_("Foydalanuvchi ismi"))
    phone = models.CharField(max_length=20, verbose_name=_("Telefon raqami"))
    subject = models.CharField(max_length=255, verbose_name=_("Mavzu"), blank=True)
    message = models.TextField(verbose_name=_("Xabar"))

    class Meta:
        verbose_name = _("Aloqa xabari")
        verbose_name_plural = _("Aloqa xabarlari")