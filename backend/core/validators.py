from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_video_size(value):
    
    filesize = value.size

    if filesize > 10 * (1024 ** 2):
        raise ValidationError(
            _("Video hajmi 10 MB dan oshmasligi kerak")
        )