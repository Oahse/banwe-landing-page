from django.db import models

AGE_GROUP_CHOICES = [
    ('under_18', 'Under 18'),
    ('18_24', '18-24'),
    ('25_34', '25-34'),
    ('35_44', '35-44'),
    ('45_54', '45-54'),
    ('55_above', '55 and above'),
]

class SurveyItem(models.Model):
    email = models.EmailField(max_length=100)
    residence_country = models.CharField(max_length=100)
    origin_country = models.CharField(max_length=100)
    age_group = models.CharField(max_length=20, choices=AGE_GROUP_CHOICES)
    how_connected = models.CharField(max_length=100)
    sourcing_from_home = models.BooleanField(default=False)
    sourcing_from_home_freq = models.CharField(max_length=100, blank=True, null=True)
    shoppingmethod = models.CharField(max_length=100)
    shoppinplatform_preference = models.CharField(max_length=100, blank=True, null=True)
    shoppingmethod_description = models.TextField(blank=True, null=True)
    shoppingchallenges = models.JSONField(null=True, blank=True)
    shoppingchallenges_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"SurveyItem({self.email})"

    def to_dict(self):
        return {
            'email': self.email,
            'residence_country': self.residence_country,
            'origin_country': self.origin_country,
            'age_group': self.age_group,
            'how_connected': self.how_connected,
            'sourcing_from_home': self.sourcing_from_home,
            'sourcing_from_home_freq': self.sourcing_from_home_freq,
            'shoppingmethod': self.shoppingmethod,
            'shoppingmethod_description': self.shoppingmethod_description,
            'shoppinplatform_preference':self.shoppinplatform_preference,
            'shoppingchallenges': self.shoppingchallenges,
            'shoppingchallenges_description': self.shoppingchallenges_description,
        }
