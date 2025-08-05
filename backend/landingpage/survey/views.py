from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SurveyItem
from .serializers import SurveyItemSerializer
from .utils import encrypt_data, ENCRYPTION_KEY


# Create your views here.

@api_view(['GET'])
def home(request):
    items = SurveyItem.objects.all()
    serializer = SurveyItemSerializer(items, many=True)
    return Response({
        "app": "Survey API",
        "total_survey_items": items.count(),
        "survey_items": serializer.data,
    })
class SurveyItemListCreate(generics.ListCreateAPIView):
    queryset = SurveyItem.objects.all()
    serializer_class = SurveyItemSerializer

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        encrypted = encrypt_data(response.data, ENCRYPTION_KEY)
        return Response({'data': encrypted})

class SurveyItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SurveyItem.objects.all()
    serializer_class = SurveyItemSerializer

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        encrypted = encrypt_data(response.data, ENCRYPTION_KEY)
        return Response({'data': encrypted})
