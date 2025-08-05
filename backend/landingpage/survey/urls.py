from django.urls import path
from .views import SurveyItemListCreate, SurveyItemDetail, home

urlpatterns = [
    path('', home),  # root url
    path('survey-items/', SurveyItemListCreate.as_view(), name='surveyitem-list'),
    path('survey-items/<int:pk>/', SurveyItemDetail.as_view(), name='surveyitem-detail'),
]
