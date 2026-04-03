from rest_framework.views import APIView
from core.utils import api_response
from .models import SiteSettings
from .serializers import SiteSettingsSerializer


class SiteSettingsView(APIView):
    """GET /api/v1/site-settings/"""

    def get(self, request):
        obj = SiteSettings.objects.filter(is_active=True).first()
        if not obj:
            return api_response(data=None)
        serializer = SiteSettingsSerializer(obj, context={'request': request})
        return api_response(data=serializer.data)
