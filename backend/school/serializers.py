from rest_framework import serializers
from .models import Science, Teacher, LessonExample, Schedule, About, Statistic, Contact, Founder


class ScienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Science
        fields = ('uuid', 'name')


class LessonExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonExample
        fields = ('uuid', 'title', 'youtube_link')


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('uuid', 'weekday', 'start_time', 'end_time')


class TeacherListSerializer(serializers.ModelSerializer):
    sciences = ScienceSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = (
            'uuid', 'full_name', 'image', 'position',
            'experience', 'about', 'type', 'degree', 'sciences', 'order'
        )


class TeacherDetailSerializer(serializers.ModelSerializer):
    sciences = ScienceSerializer(many=True, read_only=True)
    lessons = LessonExampleSerializer(many=True, read_only=True)
    schedules = ScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = (
            'uuid', 'full_name', 'image', 'position', 'experience',
            'about', 'type', 'degree', 'phone',
            'sciences', 'lessons', 'schedules', 'order'
        )


class FounderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Founder
        fields = ('uuid', 'full_name', 'photo', 'about_founder', 'work_status', 'founder_message')


class AboutSerializer(serializers.ModelSerializer):
    founder = FounderSerializer(read_only=True)

    class Meta:
        model = About
        fields = ('uuid', 'content', 'founder')


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ('uuid', 'label', 'value')


class ContactCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('full_name', 'phone', 'subject', 'message')
