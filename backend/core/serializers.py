from rest_framework import serializers
from .models import SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()

    hero_video = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = (
            'uuid',
            'name',
            'slogan',
            'logo',
            'hero_video',
            'address',
            'email',
            'main_phone',
            'other_phone',
            'reception',
            'telegram',
            'instagram',
            'youtube',
            'facebook',
        )

    def get_logo(self, obj):
        request = self.context.get('request')
        if obj.logo and request:
            return request.build_absolute_uri(obj.logo.url)
        return None

    def get_hero_video(self, obj):
        request = self.context.get('request')
        if obj.hero_video and request:
            return request.build_absolute_uri(obj.hero_video.url)
        return None
