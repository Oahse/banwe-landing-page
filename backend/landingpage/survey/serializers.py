from rest_framework import serializers
from .models import SurveyItem

class SurveyItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyItem
        fields = '__all__'
