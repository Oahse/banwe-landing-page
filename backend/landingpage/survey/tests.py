from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import SurveyItem
# Create your tests here.


class SurveyItemAPITest(APITestCase):
    def setUp(self):
        # Create a sample SurveyItem
        self.survey_item = SurveyItem.objects.create(
            email='test@example.com',
            residence_country='USA',
            origin_country='Canada',
            age_group='25_34',
            how_connected='Online',
            sourcing_from_home=True,
            sourcing_from_home_freq='Often',
            shoppingmethod='Online',
            shoppingmethod_description='',
            shoppingchallenges='None',
            shoppingchallenges_description='',
        )
        self.list_url = reverse('surveyitem-list')

    def test_list_survey_items(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['email'], 'test@example.com')

    def test_create_survey_item(self):
        data = {
            'email': 'new@example.com',
            'residence_country': 'UK',
            'origin_country': 'France',
            'age_group': '18_24',
            'how_connected': 'Phone',
            'sourcing_from_home': False,
            'sourcing_from_home_freq': '',
            'shoppingmethod': 'In-store',
            'shoppingmethod_description': '',
            'shoppingchallenges': 'Other',
            'shoppingchallenges_description': 'Hard to find products',
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SurveyItem.objects.count(), 2)
        self.assertEqual(SurveyItem.objects.get(email='new@example.com').origin_country, 'France')

    def test_retrieve_survey_item(self):
        url = reverse('surveyitem-detail', args=[self.survey_item.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@example.com')

    def test_update_survey_item(self):
        url = reverse('surveyitem-detail', args=[self.survey_item.id])
        data = {
            'email': 'updated@example.com',
            'residence_country': 'USA',
            'origin_country': 'Canada',
            'age_group': '25_34',
            'how_connected': 'Online',
            'sourcing_from_home': True,
            'sourcing_from_home_freq': 'Rarely',
            'shoppingmethod': 'Online',
            'shoppingmethod_description': '',
            'shoppingchallenges': 'None',
            'shoppingchallenges_description': '',
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.survey_item.refresh_from_db()
        self.assertEqual(self.survey_item.email, 'updated@example.com')
        self.assertEqual(self.survey_item.sourcing_from_home_freq, 'Rarely')

    def test_delete_survey_item(self):
        url = reverse('surveyitem-detail', args=[self.survey_item.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(SurveyItem.objects.count(), 0)
